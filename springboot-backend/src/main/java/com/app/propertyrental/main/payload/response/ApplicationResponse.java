package com.app.propertyrental.main.payload.response;

import com.app.propertyrental.common.models.User;
import com.app.propertyrental.main.models.ApplicationStatus;
import com.app.propertyrental.main.models.property.Property;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ApplicationResponse {
    private User userId;
    private Property property;
    private ApplicationStatus status;
    private Date createdAt;
    private Date moveInDate;
    private String emergencyContact;
    private String employmentDetails;
}
