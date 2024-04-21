package com.app.propertyrental.main.controller;


import com.app.propertyrental.main.models.Application;
import com.app.propertyrental.main.models.ApplicationStatus;
import com.app.propertyrental.main.models.Transaction;
import com.app.propertyrental.main.payload.request.TransactionRequest;
import com.app.propertyrental.main.service.ApplicationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(ApplicationService applicationService) {
        this.applicationService = applicationService;
    }

    @GetMapping("/")
    @PreAuthorize("hasRole('ADMIN') or hasRole('OWNER')")
    public ResponseEntity<List<Application>> getAllApplications() {
        return applicationService.getAllApplications();
    }

    @GetMapping("/user")
    @PreAuthorize("hasRole('ADMIN') or hasRole('OWNER')")
    public ResponseEntity<List<Application>> getAllApplicationsOfUser() {
        return applicationService.getAllApplicationsOfUser();
    }

    @GetMapping("/property/{propertyId}")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<List<Application>> getAllApplicationsOfProperty(@PathVariable("propertyId") String propertyId) {
        return applicationService.getApplicationsByPropertyId(propertyId);
    }

    @PatchMapping("/{applicationId}/{status}")
    @PreAuthorize("hasRole('OWNER')")
    public ResponseEntity<?> updateApplicationStatus(@PathVariable("applicationId") String applicationId, @PathVariable("status") ApplicationStatus status,@RequestBody(required = false) TransactionRequest transactionRequest) {
        return applicationService.updateApplicationStatus(applicationId, status,transactionRequest);
    }


    @GetMapping("/transactions")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        return applicationService.getAllTransactions();
    }


    @GetMapping("/transaction/create")
    public ResponseEntity<Transaction> createTransaction(@RequestBody TransactionRequest transactionRequest) {
        return applicationService.createTransaction(transactionRequest);
    }

}
