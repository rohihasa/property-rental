package com.app.propertyrental.main.models.user;


//import com.app.propertyrental.main.models.product.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "sellers")
public class Seller {
    @Id
    private String id;
    private String userId;
    private String SellerType;
//    private List<Product> listings;

    private Customer userdetails;
}
