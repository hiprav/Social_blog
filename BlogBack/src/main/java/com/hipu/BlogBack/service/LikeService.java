package com.hipu.BlogBack.service;

import com.hipu.BlogBack.exception.TwitException;
import com.hipu.BlogBack.exception.UserException;
import com.hipu.BlogBack.model.Like;
import com.hipu.BlogBack.model.User;

import java.util.List;

public interface LikeService {
    public Like likeTwit(Long twitId, User user) throws UserException, TwitException;
    public List<Like> getAllLikes(Long twitId) throws TwitException;
}
