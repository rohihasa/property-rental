package com.app.propertyrental.common.models;

import com.app.propertyrental.main.models.Notification;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Document(collection = "users")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class User {
  @Id
  private String id;

  @NotBlank
  @Size(max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  @NotBlank
  @Size(max = 120)
  private String password;

  private Set<ERole> roles;

  private boolean verified;

  private String firstName;

  private  String lastName;

  private ContactDetails contactDetails;

  private String profileImage;

  private List<String> savedProperties;

  private List<String> ownedProperties;

  private List<Notification> notifications;

  private String identityProof;

  private String creditReport;

    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
