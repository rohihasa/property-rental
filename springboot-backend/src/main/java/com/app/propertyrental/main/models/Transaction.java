package com.app.propertyrental.main.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "transactions")
public class Transaction {
    @Id
    private String id;
    private ObjectId propertyId;
    private ObjectId applicationId;
    private ObjectId paymentMethod;
    private String paymentStatus;
    private double paymentAmount;
    private Date paymentDate;
    private double adminCommission;
}
