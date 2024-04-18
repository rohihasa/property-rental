package com.app.propertyrental.main.models;


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
@Document(collection = "complaints")
public class Complaint {
    @Id
    private String id;
    private ObjectId userId;
    private ObjectId propertyId;
    private String description;
    private Boolean isResolved;
    private List<String> images;
    private Date createdAt;
    private Date updatedAt;
}
