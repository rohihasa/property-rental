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
@Document(collection = "applications")
public class Application {
    @Id
    private String id;
    private ObjectId userId;
    private ObjectId propertyId;
    private ApplicationStatus status;
    private String message;
    private Date createdAt;
    private Date updatedAt;
    private Date moveInDate;
    private String emergencyContact;
    private String employmentDetails;
    private ObjectId creditReport;
    private ObjectId idProof;
}
