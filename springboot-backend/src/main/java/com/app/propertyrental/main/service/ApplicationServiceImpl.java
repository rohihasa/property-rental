package com.app.propertyrental.main.service;


import com.app.propertyrental.common.models.User;
import com.app.propertyrental.common.repository.UserRepository;
import com.app.propertyrental.common.utils.CommonUtils;
import com.app.propertyrental.main.models.*;
import com.app.propertyrental.main.models.property.Property;
import com.app.propertyrental.main.payload.request.TransactionRequest;
import com.app.propertyrental.main.payload.response.ApplicationResponse;
import com.app.propertyrental.main.payload.response.TransactionRespose;
import com.app.propertyrental.main.repository.ApplicationRepository;
import com.app.propertyrental.main.repository.ContractRepository;
import com.app.propertyrental.main.repository.PaymentRepository;
import com.app.propertyrental.main.repository.PropertyRepository;
//import com.app.propertyrental.main.repository.TransactionRepository;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationRepository applicationRepository;

    private final CommonUtils commonUtils;

    private final PaymentRepository paymentRepository;

    private final ContractRepository contractRepository;
//    private final TransactionRepository transactionRepository;

    private final PropertyRepository propertyRepository;
    private  final UserRepository userRepository;

    public ApplicationServiceImpl(ApplicationRepository applicationRepository,
                                  CommonUtils commonUtils, PaymentRepository paymentRepository,
                                  ContractRepository contractRepository,
//                                  TransactionRepository transactionRepository,
                                  PropertyRepository propertyRepository, UserRepository userRepository) {

        this.applicationRepository = applicationRepository;
        this.commonUtils = commonUtils;
        this.paymentRepository = paymentRepository;
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
                if(!property.getIsAvailable()){
                    throw new RuntimeException("property filled");
                }
                property.setIsAvailable(false);
//                createTransaction(transactionRequest);
                PaymentMethods paymentMethod = createPaymentMethod(transactionRequest);
                transactionRequest.setPaymentMethod(paymentMethod.getId());
                createContract(transactionRequest, application, property,paymentMethod);
                changeOtherPropertyApplicationsToClose(property,applicationId);

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

    private PaymentMethods createPaymentMethod(TransactionRequest transactionRequest) {
        PaymentMethods paymentMethod = new PaymentMethods();
        paymentMethod.setCustomerId(commonUtils.getUserId());
        paymentMethod.setName(transactionRequest.getName());
        paymentMethod.setType(transactionRequest.getType());
        paymentMethod.setCardNumber(transactionRequest.getCardNumber());
        paymentMethod.setExpiryDate(transactionRequest.getExpiryDate());
        paymentMethod.setCvv(transactionRequest.getCvv());
        paymentMethod.setCardHolderName(transactionRequest.getCardHolderName());
        paymentMethod.setActive(true);
        paymentMethod.setCreatedAt(commonUtils.getCurrentDate());
        paymentMethod.setUpdatedAt(commonUtils.getCurrentDate());
        return paymentRepository.save(paymentMethod);
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
    public ResponseEntity<Transaction> createTransactionForCurrentProperty() {
        try {

            Contract contract = contractRepository.findByUserId(commonUtils.getUserId()).get(0);
            Transaction _transaction = contract.getTransactions().get(0);
            // Create a new transaction
            Transaction transaction = new Transaction();
            transaction.setPropertyId(_transaction.getPropertyId());
            transaction.setPaymentMethod(contract.getPaymentId());
            transaction.setPaymentAmount(_transaction.getPaymentAmount());
            transaction.setPaymentDate(commonUtils.getCurrentDate());
            transaction.setUserId(commonUtils.getUserId());
            transaction.setAdminCommission(_transaction.getPaymentAmount() * 0.05);

            // Find the contract associated with the property
            // Add the transaction to the contract's transactions
            contract.getTransactions().add(transaction);
            // Save the updated contract
            contractRepository.save(contract);

            return ResponseEntity.ok(transaction);
        } catch (Exception e) {
            throw new RuntimeException("Error while creating transaction");
        }
    }


    public void createContract(TransactionRequest transactionRequest, Application application, Property property,PaymentMethods paymentMethod) {
        try {
            Contract contract = new Contract();
            contract.setApplicationId(new ObjectId(application.getId()));
            contract.setUserId(application.getUserId());
            contract.setPropertyId(application.getPropertyId());
            contract.setApplicationId(new ObjectId(application.getId()));
            contract.setPaymentId(new ObjectId(paymentMethod.getId()));
            contract.setMoveInDate(application.getMoveInDate());
            contract.setCreatedAt(commonUtils.getCurrentDate());
            contract.setUpdatedAt(commonUtils.getCurrentDate());
            contract.setEmergencyContact(application.getEmergencyContact());
            contract.setEmploymentDetails(application.getEmploymentDetails());
            contract.setRentalAgreement(property.getPropertyDetails().getRentalAgreement());

            if (contract.getTransactions() == null) {
                contract.setTransactions(List.of(createTransaction(transactionRequest,property)));
            } else {
                contract.getTransactions().add(createTransaction(transactionRequest,property));
            }
            Contract _contract = contractRepository.save(contract);

        } catch (Exception e) {
            throw new RuntimeException("Error while creating contract");
        }
    }


    public Transaction createTransaction(TransactionRequest transactionRequest,Property property) {
        try {
            Transaction transaction = new Transaction();
            transaction.setPropertyId(new ObjectId(transactionRequest.getPropertyId()));
            transaction.setPaymentMethod(new ObjectId(transactionRequest.getPaymentMethod()));
            transaction.setPaymentMethod(new ObjectId(transactionRequest.getPaymentMethod()));
            transaction.setPaymentAmount(property.getPrice());
            transaction.setPaymentDate(commonUtils.getCurrentDate());
            transaction.setAdminCommission(property.getPrice() * 0.05);
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
public ResponseEntity<List<TransactionRespose>> getAllTransactions() {
    try {
        List<Contract> contracts = contractRepository.findAll();
        List<TransactionRespose> transactionResponses = new ArrayList<>();

        for (Contract contract : contracts) {
            for (Transaction transaction : contract.getTransactions()) {
                TransactionRespose transactionResponse = new TransactionRespose();
                transactionResponse.setId(new ObjectId().toString());

                // Query propertyRepository and userRepository to get name and username
                Property property = propertyRepository.findById(transaction.getPropertyId().toString()).get();
                User user = userRepository.findById(contract.getUserId().toString()).get();

                transactionResponse.setPropertyId(property.getName());
                transactionResponse.setUserId(user.getUsername());

                transactionResponse.setApplicationId(contract.getApplicationId().toString());
                transactionResponse.setPaymentMethod(transaction.getPaymentMethod().toString());
                transactionResponse.setPaymentStatus("success"); // default status
                transactionResponse.setAmount(transaction.getPaymentAmount());
                transactionResponse.setPaymentDate(transaction.getPaymentDate().toString());

                // Round admin commission to 2 decimal places
                double adminCommission = transaction.getAdminCommission();
                adminCommission = Math.round(adminCommission * 100.0) / 100.0;
                transactionResponse.setAdminCommission(String.valueOf(adminCommission));

                transactionResponses.add(transactionResponse);
            }
        }

        return ResponseEntity.ok(transactionResponses);
    } catch (Exception e) {
        return ResponseEntity.badRequest().build();
    }
}

   @Override
public ResponseEntity<List<TransactionRespose>> getAllUserTranscrions() {
    try {
        ObjectId currentUser = commonUtils.getUserId();
        List<Contract> contracts = contractRepository.findAll();
        List<TransactionRespose> transactionResponses = new ArrayList<>();

        for (Contract contract : contracts) {
            for (Transaction transaction : contract.getTransactions()) {
                if (transaction.getUserId().equals(currentUser)) {
                    TransactionRespose transactionResponse = new TransactionRespose();
                    transactionResponse.setId(new ObjectId().toString());

                    // Query propertyRepository and userRepository to get name and username
                    Property property = propertyRepository.findById(transaction.getPropertyId().toString()).get();
                    User user = userRepository.findById(contract.getUserId().toString()).get();

                    transactionResponse.setPropertyId(property.getName());
                    transactionResponse.setUserId(user.getUsername());

                    transactionResponse.setApplicationId(contract.getApplicationId().toString());
                    transactionResponse.setPaymentMethod(transaction.getPaymentMethod().toString());
                    transactionResponse.setPaymentStatus("success"); // default status
                    transactionResponse.setAmount(transaction.getPaymentAmount());
                    transactionResponse.setPaymentDate(transaction.getPaymentDate().toString());

                    // Round admin commission to 2 decimal places
                    double adminCommission = transaction.getAdminCommission();
                    adminCommission = Math.round(adminCommission * 100.0) / 100.0;
//                    transactionResponse.setAdminCommission(String.valueOf(adminCommission));
                transactionResponse.setAdminCommission("Not available");
                    transactionResponses.add(transactionResponse);
                }
            }
        }

        return ResponseEntity.ok(transactionResponses);
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
