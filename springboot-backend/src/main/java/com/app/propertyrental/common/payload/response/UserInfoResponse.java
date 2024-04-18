package com.app.propertyrental.common.payload.response;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserInfoResponse {
  private String id;
  private String username;
  private String email;
  private String role;
  private boolean isVerified;

//  public UserInfoResponse(String id, String username, String email, String role) {
//    this.id = id;
//    this.username = username;
//    this.email = email;
//    this.role = role;
//
//  }
//
//  public String getId() {
//    return id;
//  }
//
//  public void setId(String id) {
//    this.id = id;
//  }
//
//  public String getEmail() {
//    return email;
//  }
//
//  public void setEmail(String email) {
//    this.email = email;
//  }
//
//  public String getUsername() {
//    return username;
//  }
//
//  public void setUsername(String username) {
//    this.username = username;
//  }
//
//  public String getRole() {
//    return role;
//  }
}
