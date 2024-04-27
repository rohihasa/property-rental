package com.app.propertyrental.main.repository;

import com.app.propertyrental.main.models.property.Review;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface    ReviewRepository extends MongoRepository<Review, String>{
}
