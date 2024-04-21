package com.app.propertyrental.common.models;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Admin {
    @Id
    private String id;
    private String userId;
    private String username;
    private String email;
    private String profileImage;
    private Date createdAt;
    private Date updatedAt;
}
