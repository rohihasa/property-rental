package com.app.propertyrental.main.repository;
import com.app.propertyrental.main.models.PaymentMethods;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends MongoRepository<PaymentMethods, String>{
    List<PaymentMethods> findByCustomerId(ObjectId customerId);

}
