package com.app.propertyrental.main.controller;


import com.app.propertyrental.main.models.Notification;
import com.app.propertyrental.main.service.NotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping("/notifications")
public class NotificationController {
    private NotificationService notificationService;

    public NotificationController(NotificationService notificationService) {
        this.notificationService = notificationService;
    }

    @PostMapping("/")
    public void sendNotification(@RequestBody Notification notification, @RequestParam Boolean emailTrigger) {

        notificationService.sendNotification(notification,emailTrigger);
    }

    @PatchMapping("/{notificationId}")
    public void markAsRead(@PathVariable String notificationId) {
        notificationService.markAsRead(notificationId);
    }

    @DeleteMapping("/{notificationId}")
    public void deleteNotification(@PathVariable String notificationId) {
        notificationService.deleteNotification(notificationId);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Notification>> getNotifications(@PathVariable String userId) {
        return notificationService.getNotifications(userId);
    }

}
