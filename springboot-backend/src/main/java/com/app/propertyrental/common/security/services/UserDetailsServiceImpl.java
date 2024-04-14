package com.app.propertyrental.common.security.services;

import com.app.propertyrental.common.models.User;
import com.app.propertyrental.common.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
  @Autowired
  UserRepository userRepository;

  @Override
  @Transactional
  public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));

    return UserDetailsImpl.build(user);
  }

  @Transactional
  public UserDetails loadUserByUser(String userName) throws UsernameNotFoundException {
    User user = userRepository.findByUsername(userName)
            .orElseThrow(() -> new UsernameNotFoundException("User Not Found with userName: " + userName));

    return UserDetailsImpl.build(user);
  }

}
