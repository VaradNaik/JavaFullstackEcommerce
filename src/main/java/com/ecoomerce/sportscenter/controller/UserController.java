package com.ecoomerce.sportscenter.controller;

import com.ecoomerce.sportscenter.entity.UserEntity;
import com.ecoomerce.sportscenter.repository.UserRepository;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

//@RestController
//@RequestMapping("/account")
//public class UserController {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private PasswordEncoder passwordEncoder;
//
//    //@CrossOrigin(origins = "http://localhost:4200/account/register")
//    @PostMapping("/register")
//    public UserEntity registerUser(@RequestBody UserEntity userEntity) {
//        UserEntity userEntity1 = new UserEntity();
//        userEntity1.setUsername(userEntity.getUsername());
//        userEntity1.setPassword(passwordEncoder.encode(userEntity.getPassword()));
//        userEntity1.setEmail(userEntity.getEmail());
//        return userRepository.save(userEntity1);
//    }
//}

@RestController
@RequestMapping("/account")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserEntity userEntity) {
        try {
            UserEntity newUser = new UserEntity(userEntity.getUsername(), userEntity.getEmail(), passwordEncoder.encode(userEntity.getPassword()));
            return ResponseEntity.ok(userRepository.save(newUser));
        } catch (DataIntegrityViolationException e) {
            if (e.getCause() instanceof ConstraintViolationException) {
                ConstraintViolationException ex = (ConstraintViolationException) e.getCause();
                String constraintName = ex.getConstraintName();
                System.out.println(constraintName);
                if ("users.username".equals(constraintName)) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("duplicate username");
                } else if ("users.email".equals(constraintName)) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("duplicate emailId");
                }
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleException(Exception ex) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
    }
}