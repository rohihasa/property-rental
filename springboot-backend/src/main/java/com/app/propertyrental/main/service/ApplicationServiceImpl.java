package com.app.propertyrental.main.service;


import com.app.propertyrental.common.repository.UserRepository;
import com.app.propertyrental.common.utils.CommonUtils;
import com.app.propertyrental.main.models.Application;
import com.app.propertyrental.main.models.ApplicationStatus;
import com.app.propertyrental.main.models.Contract;
import com.app.propertyrental.main.models.Transaction;
import com.app.propertyrental.main.models.property.Property;
import com.app.propertyrental.main.payload.request.TransactionRequest;
import com.app.propertyrental.main.payload.response.ApplicationResponse;
import com.app.propertyrental.main.repository.ApplicationRepository;
import com.app.propertyrental.main.repository.ContractRepository;
import com.app.propertyrental.main.repository.PropertyRepository;
//import com.app.propertyrental.main.repository.TransactionRepository;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;

    private final CommonUtils commonUtils;

    private final ContractRepository contractRepository;
//    private final TransactionRepository transactionRepository;

    private final PropertyRepository propertyRepository;
    private  final UserRepository userRepository;

    public ApplicationServiceImpl(ApplicationRepository applicationRepository,
                                  CommonUtils commonUtils,
                                  ContractRepository contractRepository,
//                                  TransactionRepository transactionRepository,
                                  PropertyRepository propertyRepository, UserRepository userRepository) {

        this.applicationRepository = applicationRepository;
        this.commonUtils = commonUtils;
        this.contractRepository = contractRepository;
//        this.transactionRepository = transactionRepository;
        this.propertyRepository = propertyRepository;
        this.userRepository = userRepository;
    }

    @Override
    public ResponseEntity<List<ApplicationResponse>> getAllApplicationsOfUser() {
        try {
            ObjectId userId = commonUtils.getUserId();
            List<Application> applications = applicationRepository.findByUserId(userId);
            List<ApplicationResponse> applicationResponses = getApplicationResponses(applications);

            return ResponseEntity.ok(applicationResponses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }



    @Override
    public ResponseEntity<List<ApplicationResponse>> getAllApplications() {
        try {
            List<Application> applications = applicationRepository.findAll();
            List<ApplicationResponse> applicationResponses = getApplicationResponses(applications);
            return ResponseEntity.ok(applicationResponses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @Override
    public ResponseEntity<List<ApplicationResponse>> getApplicationsByPropertyId(String propertyId) {
        try {
            List<Application> applications = applicationRepository.findByPropertyId(new ObjectId(propertyId));
            boolean isAnyApplicationMovedIn = applications.stream()
                    .anyMatch(application -> application.getStatus().equals(ApplicationStatus.MOVED_IN));

            if (isAnyApplicationMovedIn) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            List<ApplicationResponse> applicationResponses = getApplicationResponses(applications);
            return ResponseEntity.ok(applicationResponses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }



    @Override
    public ResponseEntity<?> updateApplicationStatus(String applicationId, ApplicationStatus status, TransactionRequest transactionRequest) {
        try {
            Application application = applicationRepository.findById(applicationId).get();
            if (status.equals(ApplicationStatus.MOVED_IN)) {
                Property property = propertyRepository.findById(application.getPropertyId().toString()).get();
                property.setIsAvailable(false);
//                createTransaction(transactionRequest);
                changeOtherPropertyApplicationsToClose(property,applicationId);
                createContract(transactionRequest, application, property);
                propertyRepository.save(property);
            } else if (status.equals(ApplicationStatus.CANCELLED)) {
                applicationRepository.delete(application);
                return ResponseEntity.ok("Application cancelled");
            }
            application.setStatus(status);
            applicationRepository.save(application);
            return ResponseEntity.ok(application);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    private void changeOtherPropertyApplicationsToClose(Property property, String applicationId) {
        List<Application> applications = applicationRepository.findByPropertyId(new ObjectId(property.getId()));
        applications.stream()
                .filter(application -> !application.getId().equals(applicationId))
                .forEach(application -> {
                    application.setStatus(ApplicationStatus.PROCESS_COMPLETED);
                    applicationRepository.save(application);
                });
    }

    @Override
    public ResponseEntity<Transaction> createTransactionForProperty(TransactionRequest transactionRequest) {
        try {
            // Create a new transaction
            Transaction transaction = new Transaction();
            transaction.setPropertyId(new ObjectId(transactionRequest.getPropertyId()));
            transaction.setPaymentMethod(new ObjectId(transactionRequest.getPaymentMethod()));
            transaction.setPaymentAmount(transactionRequest.getPaymentAmount());
            transaction.setPaymentDate(commonUtils.getCurrentDate());
            transaction.setAdminCommission(transactionRequest.getPaymentAmount() * 0.05);

            // Find the contract associated with the property
            Contract contract = contractRepository.findByPropertyId(transaction.getPropertyId()).get(0);
            // Add the transaction to the contract's transactions
            contract.getTransactions().add(transaction);
            // Save the updated contract
            contractRepository.save(contract);

            return ResponseEntity.ok(transaction);
        } catch (Exception e) {
            throw new RuntimeException("Error while creating transaction");
        }
    }


    public void createContract(TransactionRequest transactionRequest, Application application, Property property) {
        try {
            Contract contract = new Contract();
            contract.setApplicationId(new ObjectId(application.getId()));
            contract.setUserId(application.getUserId());
            contract.setPropertyId(application.getPropertyId());
            contract.setApplicationId(new ObjectId(application.getId()));
            contract.setMoveInDate(application.getMoveInDate());
            contract.setCreatedAt(commonUtils.getCurrentDate());
            contract.setUpdatedAt(commonUtils.getCurrentDate());
            contract.setEmergencyContact(application.getEmergencyContact());
            contract.setEmploymentDetails(application.getEmploymentDetails());
            contract.setRentalAgreement(property.getPropertyDetails().getRentalAgreement());

            if (contract.getTransactions() == null) {
                contract.setTransactions(List.of(createTransaction(transactionRequest)));
            } else {
                contract.getTransactions().add(createTransaction(transactionRequest));
            }
            Contract _contract = contractRepository.save(contract);

        } catch (Exception e) {
            throw new RuntimeException("Error while creating contract");
        }
    }


    public Transaction createTransaction(TransactionRequest transactionRequest) {
        try {
            Transaction transaction = new Transaction();
            transaction.setPropertyId(new ObjectId(transactionRequest.getPropertyId()));
            transaction.setPaymentMethod(new ObjectId(transactionRequest.getPaymentMethod()));
            transaction.setPaymentMethod(new ObjectId(transactionRequest.getPaymentMethod()));
            transaction.setPaymentAmount(transactionRequest.getPaymentAmount());
            transaction.setPaymentDate(commonUtils.getCurrentDate());
            transaction.setAdminCommission(transactionRequest.getPaymentAmount() * 0.05);
            return transaction;
        } catch (Exception e) {
            throw new RuntimeException("Error while creating transaction");
        }
    }


    @Override
    public ResponseEntity<List<Transaction>> getTransactionsByPropertyId(String propertyId) {
        try {
            // Retrieve contracts associated with the property
            List<Contract> contracts = contractRepository.findByPropertyId(new ObjectId(propertyId));
            // Retrieve transactions from the contracts
            List<Transaction> transactions = contracts.stream()
                    .flatMap(contract -> contract.getTransactions().stream())
                    .collect(Collectors.toList());
            return ResponseEntity.ok(transactions);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @Override
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        try {
            // Retrieve all contracts
            List<Contract> contracts = contractRepository.findAll();
            // Retrieve all transactions from all contracts
            List<Transaction> transactions = contracts.stream()
                    .flatMap(contract -> contract.getTransactions().stream())
                    .collect(Collectors.toList());
            return ResponseEntity.ok(transactions);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    private  List<ApplicationResponse> getApplicationResponses(List<Application> applications) {
        return applications.stream()
                .map(application -> {
                    ApplicationResponse applicationResponse = new ApplicationResponse();
                    applicationResponse.setId(application.getId());
                    applicationResponse.setUser(userRepository.findById(application.getUserId().toString()).get());
                    applicationResponse.setProperty(propertyRepository.findById(application.getPropertyId().toString()).get());
                    applicationResponse.setStatus(application.getStatus());
                    applicationResponse.setCreatedAt(application.getCreatedAt());
                    applicationResponse.setMoveInDate(application.getMoveInDate());
                    applicationResponse.setEmergencyContact(application.getEmergencyContact());
                    applicationResponse.setEmploymentDetails(application.getEmploymentDetails());
                    return applicationResponse;
                }).collect(Collectors.toList());
    }

}
