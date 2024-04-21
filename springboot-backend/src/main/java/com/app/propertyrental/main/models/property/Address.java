package com.app.propertyrental.main.models.property;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class Address {
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String country;
    private String latitude;
    private String longitude;
}
