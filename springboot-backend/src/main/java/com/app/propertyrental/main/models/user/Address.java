package com.app.propertyrental.main.models.user;



import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "address")
public class Address {
    @Id
    private String id;
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String country;
}
