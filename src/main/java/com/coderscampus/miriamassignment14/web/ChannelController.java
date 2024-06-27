package com.coderscampus.miriamassignment14.web;

import java.util.List;
import java.util.Optional;

import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.coderscampus.miriamassignment14.domain.Channel;
import com.coderscampus.miriamassignment14.domain.Message;
import com.coderscampus.miriamassignment14.domain.User;
import com.coderscampus.miriamassignment14.service.ChannelService;
import com.coderscampus.miriamassignment14.service.MessageService;
import com.coderscampus.miriamassignment14.service.UserService;

@Controller
public class ChannelController {

    private final ChannelService channelService;
    private final MessageService messageService;
    private final UserService userService;

    private static final Logger logger = LoggerFactory.getLogger(ChannelController.class);

    @Autowired
    public ChannelController(ChannelService channelService, MessageService messageService, UserService userService) {
        this.channelService = channelService;
        this.messageService = messageService;
        this.userService = userService;
    }
// adjusted below method for redirect per code review:

    @GetMapping("/channels/{userId}/{channelId}")
    public String viewChannel(@PathVariable Long channelId, @PathVariable Long userId, Model model, HttpSession session) {

        String username = (String) session.getAttribute("username");
        logger.info("Checking session for username in viewChannel: {}", username);
        if (username == null || username.isEmpty()) {
            logger.info("Username is null or empty, redirecting to welcome page");
            return "redirect:/";
        }

        Optional<User> optionalUser = userService.findById(userId);
        User user = optionalUser.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        Channel channel = channelService.findById(channelId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Channel not found"));

        List<Message> messages = messageService.findMessagesByChannelId(channelId);
        model.addAttribute("user", user);
        model.addAttribute("channel", channel);
        model.addAttribute("messages", messages);
        model.addAttribute("username", username);

        return "channel";
    }


    //adjusted below method for redirect per code review
    @GetMapping("/channels/{userId}")
    public String showChannels(@PathVariable Long userId, Model model, HttpSession session) {
        String username = (String) session.getAttribute("username");
        logger.info("Checking session for username in showChannels: {}", username);
        if (username == null || username.isEmpty()) {
            logger.info("Username is null or empty, redirecting to welcome page");

            return "redirect:/";
        }

        List<Channel> channels = channelService.findAll();
        Optional<User> optionalUser = userService.findById(userId);
        User user = optionalUser.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        Channel channel = new Channel();
        model.addAttribute("user", user);
        model.addAttribute("channels", channels);
        model.addAttribute("channel", channel);
        model.addAttribute("username", username);
        return "channels";
    }


    @PostMapping("/channels/createChannel/{userId}")
    public String createChannel(String name, @PathVariable Long userId) {
        Channel newChannel = new Channel();
        newChannel.setName(name);
        Channel savedChannel = channelService.save(newChannel);


        return "redirect:/channels/" + userId;
    }

}
