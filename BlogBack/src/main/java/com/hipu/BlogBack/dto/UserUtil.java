package com.hipu.BlogBack.dto;

import com.hipu.BlogBack.model.User;

public class UserUtil {
    public static final boolean isReqUser(User reqUser,User user1){
        return reqUser.getId().equals(user1.getId());
    }
    public static final boolean isFollowedByReqUser(User reqUser,User user1){
        return reqUser.getFollowing().contains(user1);
    }
}
