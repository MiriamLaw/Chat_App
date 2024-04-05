package com.coderscampus.miriamassignment14.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.server.ResponseStatusException;

import com.coderscampus.miriamassignment14.domain.Channel;
import com.coderscampus.miriamassignment14.domain.Message;
import com.coderscampus.miriamassignment14.service.ChannelService;
import com.coderscampus.miriamassignment14.service.MessageService;

@Controller
public class ChannelController {
	
	private final ChannelService channelService;
	private final MessageService messageService;
	
	@Autowired
	public ChannelController(ChannelService channelService, MessageService messageService) {
		this.channelService = channelService;
		this.messageService = messageService;
	}
	
	@GetMapping("/channels/{channelId}")
	public String viewChannel(@PathVariable Long channelId, Model model) {
		Channel channel = channelService.findById(channelId)
										.orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Channel not found"));
		List<Message> messages = messageService.findMessagesByChannelId(channelId);
		model.addAttribute("channel", channel);
		model.addAttribute("messages", messages);
		
		return "channel";
	}
	
	

}