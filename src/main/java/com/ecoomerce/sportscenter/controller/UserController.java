package com.ecoomerce.sportscenter.controller;

import com.ecoomerce.sportscenter.entity.UserEntity;
import com.ecoomerce.sportscenter.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //@CrossOrigin(origins = "http://localhost:4200/account/register")
    @PostMapping("/register")
    public UserEntity registerUser(@RequestBody UserEntity userEntity) {
        UserEntity userEntity1 = new UserEntity();
        userEntity1.setUsername(userEntity.getUsername());
        userEntity1.setPassword(passwordEncoder.encode(userEntity.getPassword()));
        userEntity1.setEmail(userEntity.getEmail());
        return userRepository.save(userEntity1);
    }
}