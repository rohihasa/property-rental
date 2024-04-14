package com.app.propertyrental.main.models.user;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "customers")
public class Customer {
    @Id
    private String id;
    private ObjectId userId;
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String email;
    private boolean isSeller;
    private ContactDetails contactDetails;
    private boolean isVerified;
    private boolean active;
    private Date createdAt;
    private Date updatedAt;
    private String profileImage;
    private List<String> wishlist;
    private List<String> cart;
    private List<String> address;
    private List<String> paymentMethods;
}
