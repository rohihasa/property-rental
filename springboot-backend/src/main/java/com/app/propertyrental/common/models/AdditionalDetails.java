package com.app.propertyrental.common.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AdditionalDetails {
    private String firstName;
    private String lastName;
    private ContactDetails contactDetails;
    private String createdAt;
    private String updatedAt;

//    seller additonal
    private String SellerType;
}
