package com.react.restaurant.controller;

import com.react.restaurant.exception.UserNotFoundException;
import com.react.restaurant.model.Cart;
import com.react.restaurant.model.User;
import com.react.restaurant.repositoy.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // React port
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("user/create")
    User newUser(@RequestBody User newUser){
        return userRepository.save(newUser);
    }

    @PostMapping("user/login")
    User userLogin(@RequestBody User user){
        User storedUser = userRepository.findByUsername(user.getUsername());
        if(storedUser != null && user.getPassword().equals(storedUser.getPassword()) ){
            return storedUser;
        }
        return null;
    }


    @PutMapping("user/reset-password")
    User updateUser(@RequestBody User updateUser){

        User user = userRepository.findByUsername(updateUser.getUsername());

        if(user == null)
            throw new UserNotFoundException();


        return userRepository.findById(user.getId())
                .map(saveData -> {
                    saveData.setPassword(updateUser.getPassword());
                    return userRepository.save(saveData);
                })
                .orElseThrow(()-> new UserNotFoundException());
    }


}
