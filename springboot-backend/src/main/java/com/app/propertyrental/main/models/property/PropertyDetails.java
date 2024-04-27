package com.app.propertyrental.main.models.property;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;

import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PropertyDetails {
    private Date leaseStartDate;
    private Date leaseEndDate;
    private Date applicationDeadline;
    private String rentalAgreement;
    private double rentPerMonth;
}
