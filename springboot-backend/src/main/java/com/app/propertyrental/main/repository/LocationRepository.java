package com.app.propertyrental.main.repository;

import com.app.propertyrental.main.models.property.Location;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends MongoRepository<Location, String>{
}
