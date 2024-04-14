package com.app.propertyrental.common.service;

import com.app.propertyrental.common.payload.request.LoginRequest;
import com.app.propertyrental.common.payload.request.SignupRequest;
import org.springframework.http.ResponseEntity;

public interface AuthService {

    ResponseEntity<?> registerUser(SignupRequest signUpRequest) ;

    ResponseEntity<?> authenticateUser( LoginRequest loginRequest);
}
