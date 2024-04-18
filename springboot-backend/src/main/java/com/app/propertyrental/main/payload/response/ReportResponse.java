package com.app.propertyrental.main.payload.response;


import com.app.propertyrental.common.models.ContactDetails;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ReportResponse {
    private ContactDetails contactDetails;
    private String idProof;
    private String creditReport;
}

