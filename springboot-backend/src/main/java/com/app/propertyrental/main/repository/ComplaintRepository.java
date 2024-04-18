package com.app.propertyrental.main.repository;

import com.app.propertyrental.main.models.Complaint;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends MongoRepository<Complaint, String>{
    List<Complaint> findByPropertyId(ObjectId propertyId);
}
