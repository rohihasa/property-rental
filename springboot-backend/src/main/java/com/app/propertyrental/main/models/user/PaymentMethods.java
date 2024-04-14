package com.app.propertyrental.main.models.user;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "paymentMethods")
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
    private String createdAt;
    private String updatedAt;
}
