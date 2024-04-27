package com.app.propertyrental.common.payload.request;

import com.app.propertyrental.common.models.AdditionalDetails;
import com.app.propertyrental.common.models.ContactDetails;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@AllArgsConstructor
@NoArgsConstructor
@Data
public class SignupRequest {
  @NotBlank
  @Size(min = 3, max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;

  private String role;

  @NotBlank
  @Size(min = 6, max = 40)
  private String password;

  private String ProfileImage;

  private AdditionalDetails additionalDetails;

  private ContactDetails contactDetails;


}
