package com.react.restaurant.controller;

import com.react.restaurant.model.Cart;
import com.react.restaurant.model.Menu;
import com.react.restaurant.repositoy.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // React port
public class MenuController {

    @Autowired

    private MenuRepository menuRepository;

    @GetMapping("menu/get")
    List<Menu> getAllMenu(){
        return menuRepository.findAll();
    }

    @GetMapping("menu/get/{id}")
    Menu getMenuById(@PathVariable Long id){
        return menuRepository.findById(id)
                .orElseThrow(() -> new ArithmeticException());
    }

    @GetMapping("menu/categories")
    public List<String> getDistinctCategories() {
        return menuRepository.findDistinctCategories();
    }

    @GetMapping("menu/categories/{category}")
    List<Menu> getCategoriesMenu(@PathVariable String category){
        return menuRepository.findByCategory(category);
    }

    @GetMapping("menu/search/{keyword}")
    public List<Menu> searchItems(@PathVariable String keyword) {
        return menuRepository.searchByNameOrCategory(keyword);
    }
}
