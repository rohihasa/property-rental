package com.app.propertyrental.main.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "transactions")
public class Transaction {
    @Id
    private String id;
    private ObjectId applicationId;
    private String contractId;
    private ObjectId paymentMethod;
    private String paymentStatus;
    private String paymentAmount;
    private double adminCommission;

}
