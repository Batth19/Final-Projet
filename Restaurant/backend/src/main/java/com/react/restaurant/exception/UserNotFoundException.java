package com.react.restaurant.exception;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(){
        super("Could Not Found the User!");
    }
}
