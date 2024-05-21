package com.coderscampus.miriamassignment14.web;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.coderscampus.miriamassignment14.domain.Channel;
import com.coderscampus.miriamassignment14.domain.Message;
import com.coderscampus.miriamassignment14.dto.MessageDTO;
import com.coderscampus.miriamassignment14.service.ChannelService;
import com.coderscampus.miriamassignment14.service.MessageService;

@Controller
@RequestMapping("/api/messages")
public class MessageApiController {

    private final MessageService messageService;
    private final ChannelService channelService;

    @Autowired
    public MessageApiController(MessageService messageService, ChannelService channelService) {
        this.messageService = messageService;
        this.channelService = channelService;
    }


    @PostMapping("/createMessage/{channelId}")
    public ResponseEntity<Message> createMessage(@PathVariable Long channelId, @RequestBody Message message) {


        Channel channel = channelService.findById(channelId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Channel not found"));

        Message newMessage = new Message();
        newMessage.setContent(message.getContent());
        newMessage.setChannel(channel);
        newMessage.setUser(message.getUser());

        Message savedMessage = messageService.save(newMessage);

        return ResponseEntity.ok(savedMessage);
    }


    @GetMapping("/channels/{channelId}/messages")
    public ResponseEntity<List<Message>> getMessages(@PathVariable Long channelId, @RequestParam(required = false) Long mostRecentMessageId) {
        List<Message> messages;
        if (mostRecentMessageId != null) {
            messages = messageService.findNewMessagesByChannelId(channelId, mostRecentMessageId);
        } else {
            messages = messageService.findMessagesByChannelId(channelId);
        }

        return ResponseEntity.ok(messages);
    }

}
