package com.app.propertyrental.main.controller;


import com.app.propertyrental.main.models.Complaint;
import com.app.propertyrental.main.models.property.Property;
import com.app.propertyrental.main.models.property.PropertyDetails;
import com.app.propertyrental.main.payload.request.ApplicationRequest;
import com.app.propertyrental.main.payload.response.FiltersResponse;
import com.app.propertyrental.main.service.PropertyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/property")
public class PropertyController {

   private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
         this.propertyService = propertyService;
    }

    @GetMapping("/")
    public ResponseEntity<List<Property>> getAllProperties(
            @RequestParam(value = "minPrice",required = false) double minPrice,
            @RequestParam(value = "maxPrice",required = false)  double maxPrice,
            @RequestParam(value = "location",required = false) String location) {
       return propertyService.getAllProperties(minPrice, maxPrice, location);
    }

    @PostMapping("/")
    public ResponseEntity<Property> createProperty(@RequestBody Property property) {
       return propertyService.createProperty(property);
    }

    @GetMapping("/{propertyId}")
    public ResponseEntity<Property> getPropertyById(@PathVariable String propertyId) {
       return propertyService.getPropertyById(propertyId);
    }

    @PatchMapping("/{propertyId}")
    public ResponseEntity<Property> updateProperty(@PathVariable String propertyId, @RequestBody Property property) {
       return propertyService.updateProperty(propertyId, property);
    }


    @PatchMapping("/{propertyId}/status/{status}")
    public ResponseEntity<String> updateVerificationStatus(@PathVariable String propertyId, @PathVariable Boolean status) {
       return propertyService.updateVerificationStatus(propertyId, status);
    }


    @GetMapping("/{propertyId}/terms")
    public ResponseEntity<PropertyDetails> getPropertyTerms(@PathVariable String propertyId) {
       return  propertyService.getPropertyTerms(propertyId);
    }

    @PatchMapping("/{propertyId}/terms")
    public ResponseEntity<PropertyDetails> updatePropertyTerms(@PathVariable String propertyId, @RequestBody PropertyDetails propertyDetails) {
       return propertyService.updatePropertyTerms(propertyId, propertyDetails);
    }


    @PostMapping("/{propertyId}/apply")
    public ResponseEntity<String> applyForProperty(@RequestBody ApplicationRequest applicationRequest) {
       return propertyService.applyForProperty(applicationRequest);
    }

    @GetMapping("/{propertyId}/complaints")
    public ResponseEntity<List<Complaint>> getComplaints(@PathVariable String propertyId) {
       return propertyService.getComplaints(propertyId);
    }

    @PostMapping("/{propertyId}/complaints")
    public ResponseEntity<String> createComplaint(@PathVariable String propertyId, @RequestBody Complaint complaint) {
       return propertyService.createComplaint(propertyId, complaint);
    }

    @PatchMapping("/complaints/{complaintId}/status/{status}")
    public ResponseEntity<String> updateComplaintStatus(@PathVariable String complaintId, @PathVariable String status) {
       return propertyService.updateComplaintStatus(complaintId, status);
    }

    @PostMapping("/{propertyId}/message")
    public ResponseEntity<String> sendMessase(@PathVariable String propertyId, @RequestParam String message) {
       return propertyService.sendMessase(propertyId, message);
    }

    @PostMapping("/owner")
    public ResponseEntity<List<Property>> getOwnerProperties() {
       return propertyService.getOwnerProperties();
    }


    @GetMapping("/locations")
    public ResponseEntity<List<String>> getLocations() {
       return propertyService.getLocations();
    }

    @GetMapping("/filter")
    public ResponseEntity<FiltersResponse> getFilter() {
       return propertyService.getFilters();
    }



}
