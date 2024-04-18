package com.app.propertyrental.main.service;


import com.app.propertyrental.main.models.Notification;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface NotificationService {
    void sendNotification(Notification notification, Boolean emailTrigger);
    void markAsRead(String notificationId);
    void deleteNotification(String notificationId);
    ResponseEntity<List<Notification>> getNotifications(String userId);
}
