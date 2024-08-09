package com.hipu.BlogBack.dto;

import com.hipu.BlogBack.model.Twit;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
@Data
public class TwitDto {
    private Long id;
    private String content;
    private String image;
    private String viode;
    private UserDto user;
    private LocalDateTime craetedAt;
    private int totalLike;
    private int totalReplies;
    private int totalRetweets;
    private boolean isLiked;
    private boolean isRetwit;
    private List<Long>retwitUserId;
    private List<TwitDto> replyTwits;
}
