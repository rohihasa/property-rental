package com.app.propertyrental.main.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReviewRequest {
    private String propertyId;
    private String review;
    private int rating;
}
