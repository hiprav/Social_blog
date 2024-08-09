package com.hipu.BlogBack.dto;

import com.hipu.BlogBack.model.Twit;
import com.hipu.BlogBack.model.User;

import java.util.ArrayList;
import java.util.List;

public class TwitDtoMapper {
    public static TwitDto toTwitDto(Twit twit, User reqUser){
        UserDto user=UserDtoMapper.toUserDto(twit.getUser());
        boolean isLiked=TwitUtil.isLikedByReqUser(reqUser,twit);
        boolean isRetwited=TwitUtil.isRetwitByReqUser(reqUser,twit);
        List<Long> retwitUserId=new ArrayList<>();
        for (User user1:twit.getReTwitUser()){
            retwitUserId.add(user1.getId());
        }
        TwitDto twitDto=new TwitDto();
        twitDto.setId(twit.getId());
        twitDto.setContent(twit.getContent());
        twitDto.setCraetedAt(twit.getCreatedAt());
        twitDto.setImage(twit.getImage());
        twitDto.setTotalLike(twit.getLikes().size());
        twitDto.setTotalReplies(twit.getReplyTwit().size());
        twitDto.setTotalRetweets(twit.getReTwitUser().size());
        twitDto.setUser(user);
        twitDto.setLiked(isLiked);
        twitDto.setRetwit(isRetwited);
        twitDto.setRetwitUserId(retwitUserId);
        twitDto.setReplyTwits(toTwitDtos(twit.getReplyTwit(),reqUser));
        twitDto.setViode(twit.getVideo());

        return twitDto;
    }
    public static List<TwitDto> toTwitDtos(List<Twit> twits,User reqUser){
        List<TwitDto> twitDtos=new ArrayList<>();
        for (Twit twit:twits){
            TwitDto twitDto=toReplyTwitDto(twit,reqUser);
            twitDtos.add(twitDto);
        }
        return twitDtos;
    }

    private static TwitDto toReplyTwitDto(Twit twit, User reqUser) {
        UserDto user=UserDtoMapper.toUserDto(twit.getUser());
        boolean isLiked=TwitUtil.isLikedByReqUser(reqUser,twit);
        boolean isRetwited=TwitUtil.isRetwitByReqUser(reqUser,twit);
        List<Long> retwitUserId=new ArrayList<>();
        for (User user1:twit.getReTwitUser()){
            retwitUserId.add(user1.getId());
        }
        TwitDto twitDto=new TwitDto();
        twitDto.setId(twit.getId());
        twitDto.setContent(twit.getContent());
        twitDto.setCraetedAt(twit.getCreatedAt());
        twitDto.setImage(twit.getImage());
        twitDto.setTotalLike(twit.getLikes().size());
        twitDto.setTotalReplies(twit.getReplyTwit().size());
        twitDto.setTotalRetweets(twit.getReTwitUser().size());
        twitDto.setUser(user);
        twitDto.setLiked(isLiked);
        twitDto.setRetwit(isRetwited);
        twitDto.setRetwitUserId(retwitUserId);
        twitDto.setReplyTwits(toTwitDtos(twit.getReplyTwit(),reqUser));
        twitDto.setViode(twit.getVideo());

        return twitDto;
    }
}
