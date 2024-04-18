package com.app.propertyrental.main.service;

import com.app.propertyrental.common.models.User;
import com.app.propertyrental.common.repository.UserRepository;
import com.app.propertyrental.common.utils.CommonUtils;
import com.app.propertyrental.common.utils.EmailService;
import com.app.propertyrental.main.models.Notification;
import com.app.propertyrental.main.repository.NotificationRepository;
import com.app.propertyrental.main.models.Notification;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;


@Service
public class NotificationServiceImpl implements NotificationService{

    private NotificationRepository notificationRepository;

    private CommonUtils commonUtils;

    private EmailService emailService;

    private UserRepository userRepository;
    public NotificationServiceImpl(NotificationRepository notificationRepository,CommonUtils commonUtils, EmailService emailService,UserRepository userRepository) {
        this.notificationRepository = notificationRepository;
        this.commonUtils=commonUtils;
        this.userRepository=userRepository;
        this.emailService=emailService;
    }
    @Override
    public void sendNotification(Notification notification,Boolean emailTrigger){
//        ObjectId temp= commonUtils.getUserId();
        if(emailTrigger){
            User user=userRepository.findById(notification.getReceiverId().toString()).get();
            HashMap<String, String> userMap = new HashMap<>();
            userMap.put(user.getEmail(), user.getUsername());
            emailService.sendEmails(userMap,notification.getMessage());
        }

        notificationRepository.save(notification);
    }

    @Override
    public void markAsRead(String notificationId) {
        try {
            Notification notification = notificationRepository.findById(notificationId).get();
            notification.setIsRead(true);
            notificationRepository.save(notification);
        } catch (Exception e) {
            throw new RuntimeException("Error while marking notification as read");

        }

    }

    @Override
    public void deleteNotification(String notificationId) {

        try{
            notificationRepository.deleteById(notificationId);
        }catch (Exception e){
            throw new RuntimeException("Error while deleting notification");
        }

    }

    @Override
    public ResponseEntity<List<Notification>> getNotifications(String userId) {
       try {

           List<Notification> notifications = notificationRepository.findByReceiverId(new ObjectId(userId));

           if (notifications.isEmpty()) {
               return ResponseEntity.ok().body(Collections.emptyList());
           } else {
               return ResponseEntity.ok().body(notifications);
           }
       }catch (Exception e){
           throw new RuntimeException("Error while fetching notifications");
       }
    }
}
