package com.hipu.BlogBack.dto;

import com.hipu.BlogBack.model.Like;
import com.hipu.BlogBack.model.Twit;
import com.hipu.BlogBack.model.User;

public class TwitUtil {
    public final static boolean isLikedByReqUser(User reUser, Twit twit){
        for (Like like:twit.getLikes()){
            if (like.getUser().getId().equals(reUser.getId())) {
                return true;
            }
        }
        return false;
    }
    public final static boolean isRetwitByReqUser(User reUser, Twit twit){
        for (User user:twit.getReTwitUser()){
            if (user.getId().equals(reUser.getId())) {
                return true;
            }
        }
        return false;
    }
}
