package com.coderscampus.miriamassignment14.dto;

public class MessageDTO {

	private Long id;
	private String content;
//	private Long channelId;
	private String username;

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

//	public Long getChannelId() {
//		return channelId;
//	}

//	public void setChannelId(Long channelId) {
//		this.channelId = channelId;
//	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}

