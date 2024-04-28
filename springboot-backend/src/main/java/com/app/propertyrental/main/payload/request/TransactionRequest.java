package com.app.propertyrental.main.payload.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class TransactionRequest {
    private String propertyId;
    private String paymentMethod;
    private String name;
    private String type;
    private String cardNumber;
    private String expiryDate;
    private String cvv;
    private String cardHolderName;
    private double paymentAmount;
}
