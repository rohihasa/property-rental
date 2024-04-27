package com.app.propertyrental.main.models.property;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "reviews")
public class Review {
    private String id;
    private String propertyId;
    private String userId;
    private String review;
    private int rating;
    private String createdAt;
    private String updatedAt;
    //
}
