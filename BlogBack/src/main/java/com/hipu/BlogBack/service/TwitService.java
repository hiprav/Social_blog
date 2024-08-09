package com.hipu.BlogBack.service;

import com.hipu.BlogBack.exception.TwitException;
import com.hipu.BlogBack.exception.UserException;
import com.hipu.BlogBack.model.Twit;
import com.hipu.BlogBack.model.TwitReplyRequests;
import com.hipu.BlogBack.model.User;

import java.util.List;

public interface TwitService {

    public Twit createTwit(Twit req, User user)throws UserException;
    public List<Twit> findAllTwit();
    public Twit retwit(Long twitId,User user) throws UserException, TwitException;
    public Twit findById(Long twitId)throws TwitException;
    public void deleteTwitById(Long twitId,Long userId) throws TwitException,UserException;
    public Twit removeFromRetwit(Long twitId,User user) throws TwitException,UserException;
    public Twit createReply(TwitReplyRequests res, User user) throws TwitException;
    public List<Twit> getUserTwit(User user);
    public List<Twit> findByLikeContainsUser(User user);

}
