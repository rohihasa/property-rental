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
@Document(collection = "contracts")
public class Contract {
    @Id
    private String id;
    private ObjectId propertyId;
    private ObjectId userId;
    private ObjectId applicationId;
    private String status;
    private String message;
    private String createdAt;
    private String updatedAt;
    private String moveInDate;
    private String emergencyContact;
    private String employmentDetails;
    private Boolean autoDebit;
    private String rentalAgreement;
    private String creditReport;

}
