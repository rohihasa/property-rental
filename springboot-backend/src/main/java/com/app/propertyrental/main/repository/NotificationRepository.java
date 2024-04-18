package com.app.propertyrental.main.repository;
import com.app.propertyrental.main.models.Notification;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


import java.util.List;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String>{
    List<Notification> findByReceiverId(ObjectId receiverId);

}
