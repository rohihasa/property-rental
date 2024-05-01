package com.app.propertyrental.main.service;

import com.app.propertyrental.common.models.User;
import com.app.propertyrental.common.repository.UserRepository;
import com.app.propertyrental.common.utils.CommonUtils;
import com.app.propertyrental.common.utils.EmailService;
import com.app.propertyrental.main.models.Notification;
//import com.app.propertyrental.main.repository.NotificationRepository;
import com.app.propertyrental.main.models.Notification;
import com.app.propertyrental.main.payload.request.EmailRequest;
import com.app.propertyrental.main.payload.request.MessageRequest;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;


@Service
public class NotificationServiceImpl implements NotificationService {

//    private UserRepository notificationRepository;

    private CommonUtils commonUtils;

    private EmailService emailService;

    private UserRepository userRepository;

    public NotificationServiceImpl(CommonUtils commonUtils, EmailService emailService, UserRepository userRepository) {
//        this.notificationRepository = notificationRepository;
        this.commonUtils = commonUtils;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    @Override
    public void sendNotification(Notification notification, Boolean emailTrigger,String sender) {
//        ObjectId temp= commonUtils.getUserId();
        User user = userRepository.findById(notification.getReceiverId().toString()).get();
        User senderUser = userRepository.findById(sender).get();
        notification.setId(new ObjectId().toString());
        if (emailTrigger) {


            HashMap<String, String> userMap = new HashMap<>();
            userMap.put(user.getEmail(), user.getUsername());
            EmailRequest emailRequest = new EmailRequest();
            emailRequest.setUserMap(userMap);
            emailRequest.setMessage(notification.getMessage());
            emailRequest.setSenderEmail(senderUser.getEmail());
            emailRequest.setSenderName(senderUser.getUsername());
            emailService.sendEmails(emailRequest);
        }
        if (user.getNotifications() == null) {
            user.setNotifications(Collections.singletonList(notification));
        } else {
            user.getNotifications().add(notification);
        }
//        notificationRepository.save(notification);
    }

    @Override
    public void markAsRead(String notificationId) {
        try {
            User user = userRepository.findById(commonUtils.getUserId().toString()).get();
            List<Notification> notifications = user.getNotifications();
            for (Notification notification : notifications) {
                if (notification.getId().equals(notificationId)) {
                    notification.setIsRead(true);
                    userRepository.save(user);
                    return;
                }
            }
        } catch (Exception e) {
            throw new RuntimeException("Error while marking notification as read");
        }

    }

    @Override
    public void deleteNotification(String notificationId) {

        try {
            User user = userRepository.findById(commonUtils.getUserId().toString()).get();
            List<Notification> notifications = user.getNotifications();
            notifications.removeIf(notification -> notification.getId().equals(notificationId));
            userRepository.save(user);
        } catch (Exception e) {
            throw new RuntimeException("Error while deleting notification");
        }

    }

    @Override
    public ResponseEntity<List<Notification>> getNotifications(String userId) {
        try {
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            List<Notification> notifications = user.getNotifications();
            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            throw new RuntimeException("Error while getting notifications");
        }
    }
}
