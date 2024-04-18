package com.app.propertyrental.main.payload.request;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ApplicationRequest {
    private String propertyId;
    private String message;
    private Date moveInDate;
    private String emergencyContact;
    private String employmentDetails;
    private String creditReport;

}
