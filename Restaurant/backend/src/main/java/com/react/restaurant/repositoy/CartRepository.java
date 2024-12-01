package com.react.restaurant.repositoy;

import com.react.restaurant.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart,Long> {
    List<Cart> findByUserid(String userid);
}
