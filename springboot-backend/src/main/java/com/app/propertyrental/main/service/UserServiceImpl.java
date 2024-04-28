package com.app.propertyrental.main.service;

import com.app.propertyrental.common.models.ERole;
import com.app.propertyrental.common.models.User;
//import com.app.propertyrental.common.repository.RoleRepository;
import com.app.propertyrental.common.repository.UserRepository;
import com.app.propertyrental.common.utils.CommonUtils;
import com.app.propertyrental.main.models.Application;
import com.app.propertyrental.main.models.ApplicationStatus;
import com.app.propertyrental.main.models.Notification;
import com.app.propertyrental.main.models.PaymentMethods;
import com.app.propertyrental.main.models.property.Property;
import com.app.propertyrental.main.payload.response.ReportResponse;
import com.app.propertyrental.main.repository.ApplicationRepository;
import com.app.propertyrental.main.repository.PaymentRepository;
import com.app.propertyrental.main.repository.PropertyRepository;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    private PropertyRepository propertyRepository;

    private final ApplicationRepository applicationRepository;

//    private NotificationRepository notificationRepository;

//    private RoleRepository roleRepository;

    private PaymentRepository paymentRepository;

    private CommonUtils commonUtils;

    public UserServiceImpl(UserRepository userRepository, PaymentRepository paymentRepository, PropertyRepository propertyRepository, ApplicationRepository applicationRepository, CommonUtils commonUtils) {
        this.userRepository = userRepository;
//        this.roleRepository = roleRepository;
        this.propertyRepository = propertyRepository;
        this.paymentRepository = paymentRepository;
        this.applicationRepository = applicationRepository;
//        this.notificationRepository = notificationRepository;
        this.commonUtils = commonUtils;
    }


    @Override
    public ResponseEntity<String> getProfilePic() {
        try {

            return ResponseEntity.ok(userRepository.findById(commonUtils.getUserId().toString()).get().getProfileImage());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }

    }

    @Override
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            return ResponseEntity.ok(userRepository.findAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @Override
    public ResponseEntity<User> getUserById(String id) {
        try {
            List<Application> application = applicationRepository.findByUserId(commonUtils.getUserId());
            User user= userRepository.findById(id).get();

            Optional<Application> currentPropertyOpt = application.stream()
                    .filter(_application -> _application.getStatus().equals(ApplicationStatus.MOVED_IN))
                    .findFirst();

            if (currentPropertyOpt.isPresent()) {
                Application currentProperty = currentPropertyOpt.get();
                Optional<Property> propertyOpt = propertyRepository.findById(currentProperty.getPropertyId().toString());

                if (propertyOpt.isPresent()) {
                    Property property = propertyOpt.get();
                    user.setCurrentProperty(property);
                }
            }
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @Override
    public ResponseEntity<?> updateProfile(User user) {
        try {

            User _user = userRepository.findById(commonUtils.getUserId().toString()).get();
            Optional.ofNullable(user.getEmail()).ifPresent(_user::setEmail);
            Optional.ofNullable(user.getFirstName()).ifPresent(_user::setFirstName);
            Optional.ofNullable(user.getLastName()).ifPresent(_user::setLastName);
            Optional.ofNullable(user.getContactDetails()).ifPresent(_user::setContactDetails);
            Optional.ofNullable(user.getProfileImage()).ifPresent(_user::setProfileImage);
            Optional.ofNullable(user.getCreditReport()).ifPresent(_user::setCreditReport);
            Optional.ofNullable(user.getIdentityProof()).ifPresent(_user::setIdentityProof);
            userRepository.save(_user);


            return ResponseEntity.ok("Profile Updated");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @Override
    public ResponseEntity<List<Notification>> getNotificationsForUser() {
        try {
            List<Notification> notifications = userRepository.findById(commonUtils.getUserId().toString()).get().getNotifications();
            if (notifications.isEmpty()) {
                return ResponseEntity.ok(List.of());
            }
            notifications = notifications.stream().filter(notification -> !notification.getIsRead()).collect(Collectors.toList());
            return ResponseEntity.ok(notifications);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @Override
    public ResponseEntity<ReportResponse> getReportForUser(String id) {
        try {

            User user = userRepository.findById(id).get();
            ReportResponse reportResponse = new ReportResponse();
            reportResponse.setContactDetails(user.getContactDetails());
            if (user.getIdentityProof() == null) {
                reportResponse.setIdProof("Not Available");
            } else {
                reportResponse.setIdProof(user.getIdentityProof());
            }
            if (user.getCreditReport() == null) {
                reportResponse.setCreditReport("Not Available");
            } else {
                reportResponse.setCreditReport(user.getCreditReport());
            }

            return ResponseEntity.ok(reportResponse);
        } catch (Exception e) {
            ReportResponse reportResponse = new ReportResponse();

            return ResponseEntity.ok(reportResponse);
        }
    }

    @Override
    public ResponseEntity<PaymentMethods> addPaymentMethod(PaymentMethods paymentMethods) {
        try {
//            User user = userRepository.findById(commonUtils.getUserId().toString()).get();
            paymentMethods.setCustomerId(commonUtils.getUserId());
            paymentRepository.save(paymentMethods);
            return ResponseEntity.ok(paymentMethods);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @Override
    public ResponseEntity<List<PaymentMethods>> getPaymentMethod() {
        try {
                ObjectId userId = commonUtils.getUserId();
                List<PaymentMethods> paymentMethods = paymentRepository.findByCustomerId(userId);
            if(!paymentMethods.isEmpty()){
                return ResponseEntity.ok(paymentMethods);
            }else{
                return ResponseEntity.ok(null);
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @Override
    public ResponseEntity<List<User>> getPendingUsers() {
        try {

            return ResponseEntity.ok(userRepository.findByVerified(false));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @Override
    public ResponseEntity<String> saveProperty(String propertyId) {
        try {
            User user = userRepository.findById(commonUtils.getUserId().toString()).get();
            Property property = propertyRepository.findById(propertyId).get();
            List<String> savedProperties = user.getSavedProperties();
            if (savedProperties.contains(property.getId())) {
                user.getSavedProperties().remove(property.getId());
                userRepository.save(user);
                return ResponseEntity.ok("Property unsaved");
            } else {
                user.getSavedProperties().add(property.getId());
                userRepository.save(user);
                return ResponseEntity.ok("Property Saved");
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @Override
    public ResponseEntity<List<Property>> getSavedPropertiesForUser() {
        try {
            User user = userRepository.findById(commonUtils.getUserId().toString()).get();
            List<Property> properties = propertyRepository.findAllById(user.getSavedProperties());
            return ResponseEntity.ok(properties);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

   public ResponseEntity<?> applyForOwner() {
    try {
        User user = userRepository.findById(commonUtils.getUserId().toString()).get();
        user.setRoles(Set.of(ERole.ROLE_OWNER));
        user.setVerified(false);
        userRepository.save(user);
        return ResponseEntity.ok("Applied for Owner waiting for admin approval");
    } catch (Exception e) {
        return ResponseEntity.badRequest().body("Error");
    }
}

    @Override
    public ResponseEntity<?> approveUser(String userId, String status) {
        try {
            User user = userRepository.findById(userId).get();
            if (status.equals("approve")) {
                user.setVerified(true);
                userRepository.save(user);
                return ResponseEntity.ok("User Approved");
            } else {
                user.setVerified(true);
                user.setRoles(Set.of(ERole.ROLE_USER));
                userRepository.save(user);
                return ResponseEntity.ok("User Rejected");
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @Override
    public ResponseEntity<ReportResponse> patchReports(ReportResponse reportResponse) {
        try {
            User user = userRepository.findById(commonUtils.getUserId().toString()).get();
            user.setIdentityProof(reportResponse.getIdProof());
            user.setCreditReport(reportResponse.getCreditReport());
            userRepository.save(user);
            return ResponseEntity.ok(reportResponse);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
