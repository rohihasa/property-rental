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
@Document(collection = "payment")
public class PaymentMethods {
    @Id
    private String id;
    private ObjectId customerId;
    private String name;
    private String type;
    private String cardNumber;
    private String expiryDate;
    private String cvv;
    private String cardHolderName;
    private boolean active;
    private boolean isDefault;
    private Date createdAt;
    private Date updatedAt;
}
