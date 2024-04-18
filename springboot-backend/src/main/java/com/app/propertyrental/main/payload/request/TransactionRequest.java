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
    private String paymentStatus;
    private double paymentAmount;
}
