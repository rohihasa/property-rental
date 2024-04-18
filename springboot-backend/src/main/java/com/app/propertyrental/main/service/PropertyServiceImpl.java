package com.app.propertyrental.main.service;


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
import com.app.propertyrental.main.repository.ComplaintRepository;
import com.app.propertyrental.main.repository.PropertyRepository;
import org.bson.types.ObjectId;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PropertyServiceImpl implements PropertyService{

    private final PropertyRepository propertyRepository;

    private final ComplaintRepository complaintRepository;

    private final CommonUtils commonUtils;

    private final ApplicationRepository applicationRepository;

    private final UserRepository userRepository;

    private final NotificationService notificationService;

    public PropertyServiceImpl( UserRepository userRepository,PropertyRepository propertyRepository,ApplicationRepository applicationRepository, ComplaintRepository complaintRepository, CommonUtils commonUtils,NotificationService notificationService) {
        this.propertyRepository = propertyRepository;
        this.complaintRepository = complaintRepository;
        this.commonUtils = commonUtils;
        this.applicationRepository = applicationRepository;
        this.notificationService=notificationService;
        this.userRepository=userRepository;
    }


    @Override
    public ResponseEntity<List<Property>> getAllProperties(double minPrice, double maxPrice, String location) {
       try{
                return ResponseEntity.ok(propertyRepository.findAll());
             } catch (Exception e) {
                return ResponseEntity.badRequest().body(null);
       }
    }

    @Override
    public ResponseEntity<Property> createProperty(Property property) {
        try{
            return ResponseEntity.ok(propertyRepository.save(property));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @Override
    public ResponseEntity<Property> updateProperty(String propertyId, Property property) {
        try{
            Property property1 = propertyRepository.findById(propertyId).get();
            //TODO : cehck update property
            property.setId(property1.getId());
            return ResponseEntity.ok(propertyRepository.save(property));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @Override
    public ResponseEntity<String> updateVerificationStatus(String propertyId, Boolean status) {
        try{
            Property property = propertyRepository.findById(propertyId).get();
            if(status.equals("accept")){
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
        try{
            Property property = propertyRepository.findById(propertyId).get();
            return ResponseEntity.ok(property.getPropertyDetails());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @Override
    public ResponseEntity<PropertyDetails> updatePropertyTerms(String propertyId, PropertyDetails propertyDetails) {
        try{
            Property property = propertyRepository.findById(propertyId).get();
            property.setPropertyDetails(propertyDetails);
            return ResponseEntity.ok(propertyRepository.save(property).getPropertyDetails());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @Override
    public ResponseEntity<Property> getPropertyById(String propertyId) {
        try{
            return ResponseEntity.ok(propertyRepository.findById(propertyId).get());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @Override
    public ResponseEntity<List<String>> getLocations() {
        try{
            return ResponseEntity.ok(propertyRepository.findDistinctLocations());
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
        try{
            ObjectId userId = commonUtils.getUserId();
            Property property = propertyRepository.findById(applicationRequest.getPropertyId()).get();
            Application application= new Application();

            application.setUserId(userId);
            application.setPropertyId(new ObjectId(applicationRequest.getPropertyId()));
            application.setStatus(ApplicationStatus.PENDING);
            application.setMessage(application.getMessage());
            application.setCreatedAt(commonUtils.getCurrentDate());
            application.setUpdatedAt(commonUtils.getCurrentDate());
            application.setMoveInDate(applicationRequest.getMoveInDate());
            application.setEmergencyContact(applicationRequest.getEmergencyContact());
            application.setEmploymentDetails(applicationRequest.getEmploymentDetails());
            application.setCreditReport(new ObjectId( applicationRequest.getCreditReport()));

            applicationRepository.save(application);

            return ResponseEntity.ok("Application submitted successfully");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @Override
    public ResponseEntity<List<Complaint>> getComplaints(String propertyId) {
        try{
            return ResponseEntity.ok(complaintRepository.findByPropertyId(new ObjectId(propertyId)));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @Override
    public ResponseEntity<String> createComplaint(String propertyId, Complaint complaint) {
        try{
            complaint.setPropertyId(new ObjectId(propertyId));
            complaintRepository.save(complaint);
            return ResponseEntity.ok("Complaint created successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @Override
    public ResponseEntity<String> updateComplaintStatus(String complaintId, String status) {
        try{
            Complaint complaint = complaintRepository.findById(complaintId).get();
            if(status.equals("resolve")){
                complaint.setIsResolved(true);
            } else {
                complaint.setIsResolved(false);
            }
            complaint.setUpdatedAt(commonUtils.getCurrentDate());
            complaintRepository.save(complaint);
            return ResponseEntity.ok("Complaint updated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @Override
    public ResponseEntity<String> sendMessase(String propertyId, String message) {
        try{
            Property property = propertyRepository.findById(propertyId).get();
            User user=userRepository.findById(property.getId()).get();
            Notification notification = new Notification();
            notification.setReceiverId(new ObjectId( user.getId()));
            notification.setSenderId(commonUtils.getUserId());
            notification.setMessage(message);
            notification.setCreatedAt(commonUtils.getCurrentDate());
            notification.setIsRead(false);
            notificationService.sendNotification(notification,true);
            return ResponseEntity.ok("Message sent successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error");
        }
    }

    @Override
    public ResponseEntity<List<Property>> getOwnerProperties() {
        try{
            ObjectId userId = commonUtils.getUserId();
            return ResponseEntity.ok(propertyRepository.findByOwnerId(userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
