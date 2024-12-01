package com.react.restaurant.controller;

import com.react.restaurant.model.Cart;
import com.react.restaurant.repositoy.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // React port
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @GetMapping("cart/get/{user_id}")
    List<Cart> getCart(@PathVariable String user_id){
        return cartRepository.findByUserid(user_id);
    }

    @PostMapping("cart/add")
    Cart newCart(@RequestBody Cart newCart){
        return cartRepository.save(newCart);
    }

    @PutMapping("cart/edit/{id}")
    Cart updateCart(@RequestBody Cart updateCart,@PathVariable Long id){
        return cartRepository.findById(id)
                .map(carts -> {
                    carts.setQty(updateCart.getQty());
                    return cartRepository.save(carts);
                }).orElseThrow(()-> new ArithmeticException());
    }

    @DeleteMapping("cart/delete/{id}")
    int deleteCart(@PathVariable Long id){
        if(!cartRepository.existsById(id)){
            return 0;
        }
        cartRepository.deleteById(id);
        return 1;
    }

}
