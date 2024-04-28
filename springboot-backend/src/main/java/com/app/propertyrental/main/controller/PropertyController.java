package com.app.propertyrental.main.controller;


import com.app.propertyrental.main.models.Complaint;
import com.app.propertyrental.main.models.property.Property;
import com.app.propertyrental.main.models.property.PropertyDetails;
import com.app.propertyrental.main.models.property.Review;
import com.app.propertyrental.main.payload.request.ApplicationRequest;
import com.app.propertyrental.main.payload.request.MessageRequest;
import com.app.propertyrental.main.payload.request.ReviewRequest;
import com.app.propertyrental.main.payload.response.FiltersResponse;
import com.app.propertyrental.main.service.PropertyService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/property")
public class PropertyController {

   private final PropertyService propertyService;

    public PropertyController(PropertyService propertyService) {
         this.propertyService = propertyService;
    }

    @GetMapping("")
    public ResponseEntity<List<Property>> getAllProperties(
            @RequestParam(value = "minPrice",required = false,defaultValue = "0") double minPrice,
            @RequestParam(value = "maxPrice",required = false,defaultValue = "99999999")  double maxPrice,
            @RequestParam(value = "location",required = false,defaultValue = "") String location) {
       return propertyService.getAllProperties(minPrice, maxPrice, location);
    }

    @PostMapping("/")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<Property> createProperty(@RequestBody Property property) {
       return propertyService.createProperty(property);
    }

    @GetMapping("/{propertyId}")
    public ResponseEntity<Property> getPropertyById(@PathVariable String propertyId) {
       return propertyService.getPropertyById(propertyId);
    }

    @PatchMapping("/{propertyId}")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<Property> updateProperty(@PathVariable String propertyId, @RequestBody Property property) {
       return propertyService.updateProperty(propertyId, property);
    }


    @GetMapping("/pending")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Property>> getPendingProperties() {
       return propertyService.getPendingProperties();
    }

    @PatchMapping("/{propertyId}/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> updateVerificationStatus(@PathVariable String propertyId, @PathVariable String status) {
       return propertyService.updateVerificationStatus(propertyId, status);
    }


    @GetMapping("/{propertyId}/terms")
    public ResponseEntity<PropertyDetails> getPropertyTerms(@PathVariable String propertyId) {
       return  propertyService.getPropertyTerms(propertyId);
    }

    @PatchMapping("/{propertyId}/terms")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<PropertyDetails> updatePropertyTerms(@PathVariable String propertyId, @RequestBody PropertyDetails propertyDetails) {
       return propertyService.updatePropertyTerms(propertyId, propertyDetails);
    }


    @PostMapping("/apply")
    @PreAuthorize("hasRole('USER') or hasRole('OWNER')")
    public ResponseEntity<String> applyForProperty(@RequestBody ApplicationRequest applicationRequest) {
       return propertyService.applyForProperty(applicationRequest);
    }

//    @GetMapping("/{propertyId}/complaints")
//    public ResponseEntity<List<Complaint>> getComplaints(@PathVariable String propertyId) {
//       return propertyService.getComplaints(propertyId);
//    }
//
//    @PostMapping("/complaint")
//    @PreAuthorize("hasRole('USER') or hasRole('OWNER')")
//    public ResponseEntity<String> createComplaint(@RequestBody Complaint complaint) {
//       return propertyService.createComplaint( complaint);
//    }
//
//    @PatchMapping("/complaint/{complaintId}/status/{status}")
//    @PreAuthorize("hasRole('OWNER')")
//    public ResponseEntity<String> updateComplaintStatus(@PathVariable String complaintId, @PathVariable String status) {
//       return propertyService.updateComplaintStatus(complaintId, status);
//    }

    @PostMapping("/message")
    public ResponseEntity<String> sendMessase( @RequestBody MessageRequest messageRequest) {
       return propertyService.sendMessase(messageRequest);
    }

    @GetMapping("/owner")
    @PreAuthorize("hasRole('ADMIN') or hasRole('OWNER')")
    public ResponseEntity<List<Property>> getOwnerProperties() {
       return propertyService.getOwnerProperties();
    }


    @GetMapping("/locations")
    public ResponseEntity<List<String>> getLocations() {
       return propertyService.getLocations();
    }

    @GetMapping("/filters")
    public ResponseEntity<FiltersResponse> getFilter() {
       return propertyService.getFilters();
    }

    @PostMapping("/review")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<String> reviewProperty(@RequestBody ReviewRequest reviewRequest) {
       return propertyService.reviewProperty(reviewRequest);
    }

    @GetMapping("/reviews/{propertyId}")
    public ResponseEntity<List<Review>> getReviews(@PathVariable String propertyId) {
       return propertyService.getReviews(propertyId);
    }


}
