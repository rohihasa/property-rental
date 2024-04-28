package com.app.propertyrental.main.service;

import com.app.propertyrental.main.models.property.Location;
import com.app.propertyrental.main.models.property.Review;
import com.app.propertyrental.main.payload.request.MessageRequest;
import com.app.propertyrental.main.payload.request.ReviewRequest;
import com.app.propertyrental.main.repository.LocationRepository;
import com.app.propertyrental.main.repository.ReviewRepository;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.http.HttpStatus;

import java.util.Map;

import com.app.propertyrental.common.models.User;
import com.app.propertyrental.common.repository.UserRepository;
import com.app.propertyrental.common.utils.CommonUtils;
import com.app.propertyrental.main.models.Application;
import com.app.propertyrental.main.models.ApplicationStatus;
import com.app.propertyrental.main.models.Complaint;
import com.app.propertyrental.main.models.Notification;
import com.app.propertyrental.main.models.property.Property;
import com.app.propertyrental.main.models.property.PropertyDetails;
import com.app.propertyrental.main.payload.request.ApplicationRequest;
import com.app.propertyrental.main.payload.response.FiltersResponse;
import com.app.propertyrental.main.repository.ApplicationRepository;
import com.app.propertyrental.main.repository.PropertyRepository;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;

    private final ReviewRepository reviewRepository;

    private final LocationRepository locationRepository;

    private final CommonUtils commonUtils;

    private final ApplicationRepository applicationRepository;

    private final UserRepository userRepository;

    private final NotificationService notificationService;

    public PropertyServiceImpl(UserRepository userRepository, PropertyRepository propertyRepository, ReviewRepository reviewRepository, LocationRepository locationRepository, ApplicationRepository applicationRepository, CommonUtils commonUtils, NotificationService notificationService) {
        this.propertyRepository = propertyRepository;
        this.reviewRepository = reviewRepository;
        this.locationRepository = locationRepository;
//        this.complaintRepository = complaintRepository;
        this.commonUtils = commonUtils;
        this.applicationRepository = applicationRepository;
        this.notificationService = notificationService;
        this.userRepository = userRepository;
    }


    @Override
    public ResponseEntity<List<Property>> getAllProperties(double minPrice, double maxPrice, String location) {
        try {
            List<Property> properties = propertyRepository.findAll();
            User user = userRepository.findById(commonUtils.getUserId().toString()).get();
            if (minPrice != 0) {
                properties = properties.stream().filter(property -> property.getPrice() >= minPrice).collect(Collectors.toList());
            }
            if (maxPrice != 0) {
                properties = properties.stream().filter(property -> property.getPrice() <= maxPrice).collect(Collectors.toList());
            }
            if (location != null && !location.isEmpty()) {
                properties = properties.stream().filter(property -> property.getAddress().getCity().equals(location)).collect(Collectors.toList());
            }
            properties.stream()
                    .forEach(property -> {
                        if(user.getSavedProperties().contains(property.getId())){
                            property.setSaved(true);
                        }
                    });

            return ResponseEntity.ok(properties.stream()
                    .filter(Property::getVerificationStatus)
                    .filter(Property::getIsAvailable)
                    .collect(Collectors.toList()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @Override
    public ResponseEntity<Property> createProperty(Property property) {
        try {
            property.setOwnerId(commonUtils.getUserId());
            property.setVerificationStatus(false);
            updateLatLongByZipCode(property.getAddress().getZipCode(), property);
            return ResponseEntity.ok(propertyRepository.save(property));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    public void updateLatLongByZipCode(String zipCode, Property property) {
        final String url = "https://nominatim.openstreetmap.org/search?postalcode=" + zipCode + "&format=json&countrycodes=US";
        RestTemplate restTemplate = new RestTemplate();
        try {
            ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(url, HttpMethod.GET, null, new ParameterizedTypeReference<List<Map<String, Object>>>() {
            });
            List<Map<String, Object>> results = response.getBody();
            if (results.isEmpty()) {
                throw new RuntimeException("Zipcode not found");
            } else {

                Map<String, Object> locationData = results.get(0);
                String displayName = (String) locationData.get("display_name");
                String[] splitDisplayName = displayName.split(",");
                String city = splitDisplayName[1].trim();
                locationRepository.save(Location.builder().name(city).build());
                property.getAddress().setLatitude((String) locationData.get("lat"));
                property.getAddress().setLongitude((String) locationData.get("lon"));
//                propertyRepository.save(property);
            }
        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.NOT_FOUND) {
                throw new RuntimeException("Zipcode not found");
            } else {
                throw new RuntimeException("Error occurred while fetching data from OpenStreetMap");
            }
        }
    }

    @Override
    public ResponseEntity<Property> updateProperty(String propertyId, Property property) {
        try {
            Property _property = propertyRepository.findById(propertyId).get();

            Optional.ofNullable(property.getName()).ifPresent(_property::setName);
            Optional.ofNullable(property.getDescription()).ifPresent(_property::setDescription);
            Optional.ofNullable(property.getBathrooms()).ifPresent(_property::setBathrooms);
            Optional.ofNullable(property.getAddress()).ifPresent(_property::setAddress);
            Optional.ofNullable(property.getSize()).ifPresent(_property::setSize);
            Optional.ofNullable(property.getYearBuilt()).ifPresent(_property::setYearBuilt);
            Optional.ofNullable(property.getPrivacySetting()).ifPresent(_property::setPrivacySetting);
            Optional.ofNullable(property.getIsActive()).ifPresent(_property::setIsActive);
            _property.setUpdatedAt(commonUtils.getCurrentDate());
            Optional.ofNullable(property.getAmenities()).ifPresent(_property::setAmenities);
            Optional.ofNullable(property.getPetsAllowed()).ifPresent(_property::setPetsAllowed);
            Optional.ofNullable(property.getImages()).ifPresent(_property::setImages);
            Optional.ofNullable(property.getPropertyDetails()).ifPresent(_property::setPropertyDetails);
            Optional.ofNullable(property.getIsAvailable()).ifPresent(_property::setIsAvailable);
            Optional.ofNullable(property.getIsFurnished()).ifPresent(_property::setIsFurnished);
            Optional.ofNullable(property.getPrice()).ifPresent(_property::setPrice);
            Optional.ofNullable(property.getType()).ifPresent(_property::setType);
            Optional.ofNullable(property.getBedrooms()).ifPresent(_property::setBedrooms);
            Optional.ofNullable(property.getVerificationStatus()).ifPresent(_property::setVerificationStatus);
            return ResponseEntity.ok(propertyRepository.save(_property));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @Override
    public ResponseEntity<String> updateVerificationStatus(String propertyId, String status) {
        try {
            Property property = propertyRepository.findById(propertyId).get();
            if (status.equals("accept")) {
                property.setVerificationStatus(true);
                propertyRepository.save(property);
                return ResponseEntity.ok("Property Verified");
            } else {
                propertyRepository.delete(property);
                return ResponseEntity.ok("Property dleted");
            }


        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @Override
    public ResponseEntity<PropertyDetails> getPropertyTerms(String propertyId) {
        try {
            Property property = propertyRepository.findById(propertyId).get();
            return ResponseEntity.ok(property.getPropertyDetails());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @Override
    public ResponseEntity<PropertyDetails> updatePropertyTerms(String propertyId, PropertyDetails propertyDetails) {
        try {
            Property property = propertyRepository.findById(propertyId).get();
            property.setPropertyDetails(propertyDetails);
            return ResponseEntity.ok(propertyRepository.save(property).getPropertyDetails());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @Override
    public ResponseEntity<Property> getPropertyById(String propertyId) {
        try {
            String UserId = commonUtils.getUserId().toString();
            User user = userRepository.findById(UserId).get();
            Property property = propertyRepository.findById(propertyId).get();
            if (user.getSavedProperties().contains(propertyId)) {
                property.setSaved(true);
            }

            property.setApplied(hasUserAppliedForProperty(UserId, propertyId));
            return ResponseEntity.ok(property);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    public boolean hasUserAppliedForProperty(String userId, String propertyId) {
        List<Application> applications = applicationRepository.findByPropertyId(new ObjectId(propertyId));
        return applications.stream().anyMatch(application -> application.getUserId().toString().equals(userId));
    }

    @Override
    public ResponseEntity<List<String>> getLocations() {
        try {
            List<Property> properties = propertyRepository.findAll();
            return ResponseEntity.ok(properties.stream().map(property -> property.getAddress().getCity()).distinct().collect(Collectors.toList()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @Override
    public ResponseEntity<FiltersResponse> getFilters() {
        try {
            List<Property> properties = propertyRepository.findAll();
            Map<String, List<?>> filters = new HashMap<>();
            filters.put("locations", properties.stream().map(property -> property.getAddress().getCity()).distinct().collect(Collectors.toList()));
            filters.put("types", properties.stream().map(Property::getType).distinct().collect(Collectors.toList()));
            filters.put("bedrooms", properties.stream().map(Property::getBedrooms).distinct().collect(Collectors.toList()));
            filters.put("bathrooms", properties.stream().map(Property::getBathrooms).distinct().collect(Collectors.toList()));
            filters.put("furnished", properties.stream().map(Property::getIsFurnished).distinct().collect(Collectors.toList()));
            filters.put("price", properties.stream().map(Property::getPrice).distinct().collect(Collectors.toList()));
            FiltersResponse filtersResponse = new FiltersResponse();
            filtersResponse.setFilters(filters);
            return ResponseEntity.ok(filtersResponse);
        } catch (Exception e) {
            throw new RuntimeException("Failed to get filters", e);
        }
    }

    @Override
    public ResponseEntity<String> applyForProperty(ApplicationRequest applicationRequest) {
        try {
            ObjectId userId = commonUtils.getUserId();
            Property property = propertyRepository.findById(applicationRequest.getPropertyId()).get();
            Application application = new Application();


            User user = userRepository.findById(userId.toString()).get();
            user.setCreditReport(applicationRequest.getCreditReport());
            user.setIdentityProof(applicationRequest.getIdProof());
            userRepository.save(user);

            application.setUserId(userId);
            application.setPropertyId(new ObjectId(applicationRequest.getPropertyId()));
            application.setStatus(ApplicationStatus.PENDING);
            application.setMessage(applicationRequest.getMessage());
            application.setCreatedAt(commonUtils.getCurrentDate());
            application.setUpdatedAt(commonUtils.getCurrentDate());
            application.setMoveInDate(applicationRequest.getMoveInDate());
            application.setEmergencyContact(applicationRequest.getEmergencyContact());
            application.setEmploymentDetails(applicationRequest.getEmploymentDetails());
            applicationRepository.save(application);

            return ResponseEntity.ok("Application submitted successfully");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

//    @Override
//    public ResponseEntity<List<Complaint>> getComplaints(String propertyId) {
//        try {
//            return ResponseEntity.ok(complaintRepository.findByPropertyId(new ObjectId(propertyId)));
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body(null);
//        }
//    }

//    @Override
//    public ResponseEntity<String> createComplaint(Complaint complaint) {
//        try {
//            complaint.setUserId(commonUtils.getUserId());
//            complaint.setPropertyId(complaint.getPropertyId());
//            complaintRepository.save(complaint);
//            return ResponseEntity.ok("Complaint created successfully");
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Error");
//        }
//    }

//    @Override
//    public ResponseEntity<String> updateComplaintStatus(String complaintId, String status) {
//        try {
//            Complaint complaint = complaintRepository.findById(complaintId).get();
//            if (status.equals("resolve")) {
//                complaint.setIsResolved(true);
//            } else {
//                complaint.setIsResolved(false);
//            }
//            complaint.setUpdatedAt(commonUtils.getCurrentDate());
//            complaintRepository.save(complaint);
//            return ResponseEntity.ok("Complaint updated successfully");
//        } catch (Exception e) {
//            return ResponseEntity.badRequest().body("Error");
//        }
//    }

    @Override
    public ResponseEntity<String> sendMessase(MessageRequest messageRequest) {
        try {
            Property property = propertyRepository.findById(messageRequest.getPropertyId()).get();
            User user = userRepository.findById(property.getOwnerId().toString()).get();
            Notification notification = new Notification();
            notification.setReceiverId(new ObjectId(user.getId()));
            notification.setSenderId(commonUtils.getUserId());
            notification.setMessage(messageRequest.getMessage());
            notification.setCreatedAt(commonUtils.getCurrentDate());
            notification.setIsRead(false);
            notificationService.sendNotification(notification, true);
            return ResponseEntity.ok("Message sent successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @Override
    public ResponseEntity<List<Property>> getOwnerProperties() {
        try {
            ObjectId userId = commonUtils.getUserId();
            return ResponseEntity.ok(propertyRepository.findByOwnerId(userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @Override
    public ResponseEntity<String> reviewProperty(ReviewRequest reviewRequest) {
        try {
            Review review = new Review();
            review.setUserId(commonUtils.getUserId().toString());
            review.setPropertyId(reviewRequest.getPropertyId());
            review.setRating(reviewRequest.getRating());
            review.setReview(reviewRequest.getReview());
            reviewRepository.save(review);
            return ResponseEntity.ok("Review submitted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @Override
    public ResponseEntity<List<Review>> getReviews(String propertyId) {
        try {
            return ResponseEntity.ok(reviewRepository.findByPropertyId(propertyId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
