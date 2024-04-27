package com.app.propertyrental.common.service;

import com.app.propertyrental.common.models.Admin;
import com.app.propertyrental.common.models.ERole;
import com.app.propertyrental.common.models.Role;
import com.app.propertyrental.common.models.User;
import com.app.propertyrental.common.payload.request.LoginRequest;
import com.app.propertyrental.common.payload.request.SignupRequest;
import com.app.propertyrental.common.payload.response.MessageResponse;
import com.app.propertyrental.common.payload.response.UserInfoResponse;
import com.app.propertyrental.common.repository.AdminRepository;
import com.app.propertyrental.common.repository.RoleRepository;
import com.app.propertyrental.common.repository.UserRepository;
import com.app.propertyrental.common.security.jwt.JwtUtils;
import com.app.propertyrental.common.security.services.UserDetailsImpl;
//import com.app.propertyrental.main.service.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class AuthServiceImpl implements AuthService {
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder encoder;
    private final AdminRepository adminRepository;

//    private final UserService userService;

    AuthServiceImpl(AuthenticationManager authenticationManager, JwtUtils jwtUtils, UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder encoder, AdminRepository adminRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.encoder = encoder;
//        this.userService = userService;
        this.adminRepository = adminRepository;
    }

    @Override
    public ResponseEntity<?> registerUser(SignupRequest signUpRequest) {


        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Username is already taken!"));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Error: Email is already in use!"));
        }

        // Create new user's account
        User user = new User(signUpRequest.getUsername(),
                signUpRequest.getEmail(),
                encoder.encode(signUpRequest.getPassword()));

        Set<String> strRoles = Set.of(signUpRequest.getRole());
        Set<Role> roles = new HashSet<>();

        if (strRoles.isEmpty()) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
            roles.add(userRole);
        } else {
            strRoles.forEach(role -> {
                switch (role) {
                    case "admin":
                        Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        user.setVerified(true);
                        roles.add(adminRole);

                        break;
                    case "owner":
                        Role RecruiterRole = roleRepository.findByName(ERole.ROLE_OWNER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        roles.add(RecruiterRole);
                        user.setVerified(false);
                        break;

                    default:
                        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                        user.setVerified(true);
                        roles.add(userRole);
                }
            });
        }

        user.setRoles(roles);

        user.setAdditionalDetails(signUpRequest.getAdditionalDetails());
        user.getAdditionalDetails().setContactDetails(signUpRequest.getContactDetails());
        user.setSavedProperties(List.of());
        user.setOwnedProperties(List.of());
       User _user =  userRepository.save(user);

        if(signUpRequest.getRole().equalsIgnoreCase("admin")) {
            Admin admin= new Admin();
            admin.setUserId(_user.getId());
            admin.setEmail(_user.getEmail());
            admin.setProfileImage(_user.getProfileImage());
            admin.setCreatedAt(new Date());
            admin.setUpdatedAt(new Date());
            adminRepository.save(admin);
        }

        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    @Override
    public ResponseEntity<?> authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        User user = userRepository.findByEmail(loginRequest.getEmail()).get();
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        ResponseCookie jwtCookie = jwtUtils.generateJwtCookie(userDetails);
        System.out.println(jwtCookie);

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());
        HttpHeaders headers = new HttpHeaders();
        return ResponseEntity.ok().header("X-JWT-Token", jwtCookie.toString())
                .header("Access-Control-Expose-Headers", "X-JWT-Token")
                .body(new UserInfoResponse(
                        userDetails.getId(),
                        userDetails.getUsername(),
                        userDetails.getEmail(),
                        roles.get(0), user.isVerified()));
    }


}
