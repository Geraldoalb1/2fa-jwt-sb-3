package com.alibou.security.auth;

import com.alibou.security.user.Role;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {

  private String firstname;
  private String lastname;
  private String email;
  private String password;

  @NotNull(message = "Role cannot be null")
  private Role role;
}
