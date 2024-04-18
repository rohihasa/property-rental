package com.app.propertyrental.main.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Document(collection = "notifications")
public class Notifications {
    private String id;
    private ObjectId senderId;
    private ObjectId receiverId;
    private String message;
    private String type;
    private String status;
    private String createdAt;
    private String updatedAt;
}
