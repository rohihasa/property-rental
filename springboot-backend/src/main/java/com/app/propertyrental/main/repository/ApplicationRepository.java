package com.app.propertyrental.main.repository;

import com.app.propertyrental.main.models.Application;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends MongoRepository<Application, String>{
    List<Application> findByUserId(ObjectId userId);

    List<Application> findByPropertyId(ObjectId objectId);
}
