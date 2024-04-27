package com.app.propertyrental.main.models;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

//@Document(collection = "notifications")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Notification {
    @Id
    private String id;
    private ObjectId senderId;
    private ObjectId receiverId;
    private String message;
    private String type;
    private Boolean isRead;
    private Date createdAt;

}
