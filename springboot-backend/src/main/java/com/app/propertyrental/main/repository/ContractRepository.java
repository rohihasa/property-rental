package com.app.propertyrental.main.repository;


import com.app.propertyrental.main.models.Contract;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContractRepository extends MongoRepository<Contract, String>{
    List<Contract> findByPropertyId(ObjectId objectId);
}
