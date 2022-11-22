package com.swp.sbeauty.security.services;

import com.swp.sbeauty.entity.Users;
import com.swp.sbeauty.repository.UserRepository;
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
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        Users user = userRepository.getUsersById(Long.parseLong(id))
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + id));
        return UserDetailsImpl.build(user);
    }


}
