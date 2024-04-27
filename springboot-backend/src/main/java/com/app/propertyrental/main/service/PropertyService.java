package com.app.propertyrental.main.service;

import com.app.propertyrental.main.models.Complaint;
import com.app.propertyrental.main.models.property.Property;
import com.app.propertyrental.main.models.property.PropertyDetails;
import com.app.propertyrental.main.payload.request.ApplicationRequest;
import com.app.propertyrental.main.payload.request.MessageRequest;
import com.app.propertyrental.main.payload.response.FiltersResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface PropertyService {

    ResponseEntity<List<Property>> getAllProperties(double minPrice, double maxPrice, String location);

    ResponseEntity<Property> createProperty(Property property);

    ResponseEntity<Property> updateProperty(String propertyId, Property property);

    ResponseEntity<String> updateVerificationStatus(String propertyId, String status);

    ResponseEntity<PropertyDetails> getPropertyTerms(String propertyId);

    ResponseEntity<PropertyDetails> updatePropertyTerms(String propertyId, PropertyDetails propertyDetails);

    ResponseEntity<Property> getPropertyById(String propertyId);
    ResponseEntity<List<String>> getLocations();

    ResponseEntity<FiltersResponse> getFilters();

    ResponseEntity<String> applyForProperty(ApplicationRequest applicationRequest);

    ResponseEntity<List<Complaint>> getComplaints(String propertyId);

    ResponseEntity<String> createComplaint(Complaint complaint);

    ResponseEntity<String> updateComplaintStatus(String complaintId, String status);

    ResponseEntity<String> sendMessase(MessageRequest messageRequest);

    ResponseEntity<List<Property>> getOwnerProperties();




}
