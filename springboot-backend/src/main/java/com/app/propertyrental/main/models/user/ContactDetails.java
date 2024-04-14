package com.app.propertyrental.main.models.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class ContactDetails {
    private String phoneNumber;
    private String secondaryPhone;
    private Address address;
    private String city;

}
