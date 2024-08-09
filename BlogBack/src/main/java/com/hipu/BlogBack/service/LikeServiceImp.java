package com.hipu.BlogBack.service;

import com.hipu.BlogBack.exception.TwitException;
import com.hipu.BlogBack.exception.UserException;
import com.hipu.BlogBack.model.Like;
import com.hipu.BlogBack.model.Twit;
import com.hipu.BlogBack.model.User;
import com.hipu.BlogBack.repo.LikeRepo;
import com.hipu.BlogBack.repo.TwitRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LikeServiceImp implements LikeService{
    @Autowired
    private LikeRepo likeRepo;
    @Autowired
    private TwitService twitService;
    @Autowired
    private TwitRepo twitRepo;

    @Override
    public Like likeTwit(Long twitId, User user) throws UserException, TwitException {
        Like isLikeExist=likeRepo.LikeExist(user.getId(),twitId);
        if (isLikeExist != null) {
            return isLikeExist;
        }
        Twit twit=twitService.findById(twitId);
        Like like=new Like();
        like.setTwit(twit);
        like.setUser(user);
        Like saved=likeRepo.save(like);
        twit.getLikes().add(saved);
        twitRepo.save(twit);
        return saved;
    }

    @Override
    public List<Like> getAllLikes(Long twitId) throws TwitException {
     //   Twit twit=twitRepo.findById(twitId);  ye mane comment kiya hai
        List<Like>like= likeRepo.findByTwitId(twitId);
        return List.of();
    }
}
