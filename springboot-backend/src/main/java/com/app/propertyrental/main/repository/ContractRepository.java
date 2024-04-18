package com.app.propertyrental.main.repository;


import com.app.propertyrental.main.models.Contract;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContractRepository extends MongoRepository<Contract, String>{
}
