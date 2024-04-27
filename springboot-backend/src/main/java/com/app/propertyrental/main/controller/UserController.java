package com.app.propertyrental.main.controller;

import com.app.propertyrental.common.models.User;
import com.app.propertyrental.main.models.Notification;
import com.app.propertyrental.main.models.PaymentMethods;
import com.app.propertyrental.main.models.property.Property;
import com.app.propertyrental.main.payload.response.ReportResponse;
import com.app.propertyrental.main.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/profilePicture")
    public ResponseEntity<String> getProfilePicture() {
        return userService.getProfilePic();
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable("userId") String userId) {
        return userService.getUserById(userId);
    }

    @PatchMapping("/{userId}")
    public ResponseEntity<?> updateProfile(@PathVariable("userId") String userId,@RequestBody User user) {
        return userService.updateProfile(user);
    }

    @GetMapping("/notifications")
    public ResponseEntity<List<Notification>> getNotificationsForUser() {
        return userService.getNotificationsForUser();
    }

    @GetMapping("/{userId}/report")
    public ResponseEntity<ReportResponse> getReportForUser(@PathVariable("userId") String userId) {
        return userService.getReportForUser(userId);
    }

//    @PatchMapping("/{userId}/report")
//    public ResponseEntity<ReportResponse> patchReports(@RequestBody ReportResponse reportResponse) {
//        return userService.patchReports(reportResponse);
//    }


    @PostMapping("/addPaymentMethod")
    public ResponseEntity<?> addPaymentMethod(@RequestBody PaymentMethods paymentMethods){
        return userService.addPaymentMethod(paymentMethods);
    }

    @GetMapping("/paymentMethod/{id}")
    public ResponseEntity<PaymentMethods> getPaymentMethod(@PathVariable("id") String id) {
        return userService.getPaymentMethod(id);
    }

    @GetMapping("/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getPendingUsers() {
        return userService.getPendingUsers();
    }

    @GetMapping("/savedProperties")
    public ResponseEntity<List<Property>> getSavedPropertiesForUser() {
        return userService.getSavedPropertiesForUser();
    }

    @PostMapping("/saveProperty/{propertyId}")
    public ResponseEntity<?> saveProperty(@PathVariable("propertyId") String propertyId) {
        return userService.saveProperty(propertyId);
    }

    @PatchMapping("/applyForOwner")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> applyForOwner() {
        return userService.applyForOwner();
    }

    @PatchMapping("/approveUser/{userId}/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> approveUser(@PathVariable("userId") String userId,@PathVariable("status") String status) {
        return userService.approveUser(userId, status);
    }

}
