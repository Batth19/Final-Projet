package com.react.restaurant.repositoy;

import com.react.restaurant.model.Cart;
import com.react.restaurant.model.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MenuRepository extends JpaRepository<Menu,Long> {
    @Query("SELECT DISTINCT m.category FROM Menu m")
    List<String> findDistinctCategories();

    @Query("SELECT m FROM Menu m WHERE m.name LIKE %:keyword% OR m.category LIKE %:keyword%")
    List<Menu> searchByNameOrCategory(@Param("keyword") String keyword);

    List<Menu> findByCategory(String category);
}
