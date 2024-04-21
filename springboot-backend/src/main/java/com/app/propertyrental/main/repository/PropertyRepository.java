package com.app.propertyrental.main.repository;


import com.app.propertyrental.main.models.property.Property;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends MongoRepository<Property, String> {

    List<Property> findByOwnerId(ObjectId userId);
}
