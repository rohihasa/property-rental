package com.app.propertyrental.main.repository;


import com.app.propertyrental.main.models.Contract;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ContractRepository extends MongoRepository<Contract, String>{
    List<Contract> findByPropertyId(ObjectId objectId);
    List<Contract> findByUserId(ObjectId objectId);

}
