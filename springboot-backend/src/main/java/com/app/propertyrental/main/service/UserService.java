package com.app.propertyrental.main.service;

import com.app.propertyrental.common.models.User;
import com.app.propertyrental.main.models.Notification;
import com.app.propertyrental.main.models.PaymentMethods;
import com.app.propertyrental.main.models.property.Property;
import com.app.propertyrental.main.payload.response.AdminDashboardResponse;
import com.app.propertyrental.main.payload.response.ReportResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface UserService {

    ResponseEntity<String> getProfilePic();

    ResponseEntity<List<User>> getAllUsers();

    ResponseEntity<User> getUserById(String id);

    ResponseEntity<?> updateProfile(User user);

    ResponseEntity<List<Notification>> getNotificationsForUser();

    ResponseEntity<ReportResponse> getReportForUser(String id);

    ResponseEntity<PaymentMethods> addPaymentMethod(PaymentMethods paymentMethods);

    ResponseEntity<List<PaymentMethods>> getPaymentMethod();

    ResponseEntity<List<User>> getPendingUsers();

    ResponseEntity<String> saveProperty(String propertyId);

    ResponseEntity<List<Property>> getSavedPropertiesForUser();

    ResponseEntity<?> applyForOwner();

    ResponseEntity<?> approveUser(String userId,String status);


    ResponseEntity<ReportResponse> patchReports(ReportResponse reportResponse);

    ResponseEntity<AdminDashboardResponse> getAdminDashboard();

    ResponseEntity<?> revertStatus(String userId);
}
