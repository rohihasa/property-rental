package com.app.propertyrental.main.models.property;


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
@Document(collection = "properties")
public class Property {
    @Id
    private String id;
    private ObjectId ownerId;
    private String name;
    private String description;
    private Integer bathrooms;
    private Address address;
    private Double size;
    private Integer yearBuilt;
    private Boolean privacySetting;
    private Boolean isActive;
    private Date createdAt;
    private Date updatedAt;
    private List<String> amenities;
    private Boolean petsAllowed;
    private List<String> images;
    private PropertyDetails propertyDetails;


    //filters
    // get location from address

    private Boolean isAvailable;
    private Boolean isFurnished;
    private Double price;
    private String type;
    private Integer bedrooms;
    private Boolean verificationStatus;


}
