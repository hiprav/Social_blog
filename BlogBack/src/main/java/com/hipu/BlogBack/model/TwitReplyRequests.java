package com.hipu.BlogBack.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class TwitReplyRequests {
    private String content;
    private Long twitId;
    private LocalDateTime createdAt;
    private String image;
}
