package com.app.propertyrental.main.repository;
import com.app.propertyrental.main.models.PaymentMethods;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends MongoRepository<PaymentMethods, String>{
}
