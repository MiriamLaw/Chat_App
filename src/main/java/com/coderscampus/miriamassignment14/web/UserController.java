package com.coderscampus.miriamassignment14.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.coderscampus.miriamassignment14.domain.User;
import com.coderscampus.miriamassignment14.service.UserService;

import jakarta.servlet.http.HttpSession;

@Controller
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public String welcome(Model model) {
        User user = new User();
        model.addAttribute("user", user);
        return "welcome";
    }

    //adjusted method below for redirect per code review:
    @PostMapping("/setUser")
    public String setUser(@RequestParam String username, HttpSession session) {
        User user = userService.findByUsername(username).orElse(new User());
        user.setUsername(username);
        user = userService.save(user);
        session.setAttribute("username", username);

        return "redirect:/channels/" + user.getId();
    }

}
