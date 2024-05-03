package com.app.propertyrental.main.payload.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TransactionRespose {
    private String id;
    private String propertyId;
    private String userId;
    private String applicationId;
    private String paymentMethod;
    private String paymentStatus;
    private double amount;
    private String paymentDate;
    private String adminCommission;



}
