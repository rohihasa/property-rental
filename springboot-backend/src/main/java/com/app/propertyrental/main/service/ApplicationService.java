package com.app.propertyrental.main.service;


import com.app.propertyrental.main.models.Application;
import com.app.propertyrental.main.models.ApplicationStatus;
import com.app.propertyrental.main.models.Transaction;
import com.app.propertyrental.main.models.Contract;
import com.app.propertyrental.main.payload.request.TransactionRequest;
import com.app.propertyrental.main.payload.response.ApplicationResponse;
import com.app.propertyrental.main.payload.response.TransactionRespose;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ApplicationService {

    ResponseEntity<List<ApplicationResponse>> getAllApplicationsOfUser();

    ResponseEntity<List<ApplicationResponse>> getAllApplications();

    ResponseEntity<List<ApplicationResponse>> getApplicationsByPropertyId(String propertyId);

    ResponseEntity<?> updateApplicationStatus(String applicationId, ApplicationStatus status,TransactionRequest transactionRequest);


    //to add card details and accept the rental agreement
//    ResponseEntity<Contract> createContract(String applicationId);


    ResponseEntity<Transaction> createTransactionForCurrentProperty();

    ResponseEntity<List<Transaction>> getTransactionsByPropertyId(String applicationId);

    ResponseEntity<List<TransactionRespose>> getAllTransactions();

    ResponseEntity<List<TransactionRespose>> getAllUserTranscrions();
}
