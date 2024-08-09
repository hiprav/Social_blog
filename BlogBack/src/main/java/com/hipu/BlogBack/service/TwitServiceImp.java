package com.hipu.BlogBack.service;

import com.hipu.BlogBack.exception.TwitException;
import com.hipu.BlogBack.exception.UserException;
import com.hipu.BlogBack.model.Twit;
import com.hipu.BlogBack.model.TwitReplyRequests;
import com.hipu.BlogBack.model.User;
import com.hipu.BlogBack.repo.TwitRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TwitServiceImp implements TwitService{

    @Autowired
    public TwitRepo twitRepo;

    @Override
    public Twit createTwit(Twit req, User user) throws UserException {
        Twit twit=new Twit();
        twit.setContent(req.getContent());
        twit.setCreatedAt(req.getCreatedAt());
        twit.setImage(req.getImage());
        twit.setUser(user);
        twit.setReply(false);
        twit.setTwit(true);
        twit.setVideo(req.getVideo());
        return twitRepo.save(twit);
    }

    @Override
    public List<Twit> findAllTwit() {
        return twitRepo.findAllByIsTwitTrueOrderByCreatedAtDesc();
    }

    @Override
    public Twit retwit(Long twitId, User user) throws UserException, TwitException {
        Twit twit=findById(twitId);
        if (twit.getReTwitUser().contains(user)) {
            twit.getReTwitUser().remove(user);
        }else {
            twit.getReTwitUser().add(user);
        }
        return twitRepo.save(twit);
    }

    @Override
    public Twit findById(Long twitId) throws TwitException {
        Twit twit=twitRepo.findById(twitId).orElseThrow(()-> new TwitException("Twit not found with id"+twitId));
        return twit;
    }

    @Override
    public void deleteTwitById(Long twitId, Long userId) throws TwitException, UserException {
        Twit twit=twitRepo.findTwitById(twitId);
        if (!userId.equals(twit.getUser().getId())) {
            throw new UserException("you cant delet another user twit");
        }
        twitRepo.delete(twit);
    }

    @Override
    public Twit removeFromRetwit(Long twitId, User user) throws TwitException, UserException {
        
        return null;
    }

    @Override
    public Twit createReply(TwitReplyRequests req, User user) throws TwitException {
        Twit extist=twitRepo.findTwitById(req.getTwitId());

        Twit twit=new Twit();
        twit.setContent(req.getContent());
        twit.setCreatedAt(req.getCreatedAt());
        twit.setImage(req.getImage());
        twit.setUser(user);
        twit.setReply(true);
        twit.setTwit(false);
        twit.setReplyFor(extist);

        Twit rep=twitRepo.save(twit);
        //twit.getReplyTwit().add(rep);
        extist.getReplyTwit().add(rep);
        twitRepo.save(extist);
        return extist;
    }

    @Override
    public List<Twit> getUserTwit(User user) {
        return twitRepo.findByReTwitUserContainsOrUser_idAndIsTwitTrueOrderByCreatedAtDesc(user,user.getId());
    }

    @Override
    public List<Twit> findByLikeContainsUser(User user) {
        return twitRepo.findByLikesUser_Id(user.getId());
    }
}
