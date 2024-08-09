package com.hipu.BlogBack.service;

import com.hipu.BlogBack.config.JwtProvider;
import com.hipu.BlogBack.exception.UserException;
import com.hipu.BlogBack.model.User;
import com.hipu.BlogBack.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImp implements UserService{

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public User findUserById(Long userId) throws UserException {
        User user=userRepo.findById(userId).orElseThrow(()->new UserException("user not found with id "+userId));
        return user;
    }

    @Override
    public User findUserProfileByJwt(String jwt) throws UserException {
        jwt=jwt.substring(7);
        System.out.println("i am in findUserProfileByJwt "+jwt);
        String email=jwtProvider.getEmailFromToken(jwt);
        User user=userRepo.findByEmail(email);
        if (user == null) {
            throw new UserException("user not found with email "+email);
        }
        return user;
    }

    @Override
    public User updateUser(Long userId, User user) throws UserException {
        User user1=findUserById(userId);

        if (user.getFullName() != null) {
            user1.setFullName(user.getFullName());
        }    if (user.getImage() != null) {
            user1.setImage(user.getImage());
        }    if (user.getBackgroundImage() != null) {
            user1.setBackgroundImage(user.getBackgroundImage());
        }    if (user.getBirthDate() != null) {
            user1.setBirthDate(user.getBirthDate());
        }    if (user.getBio() != null) {
            user1.setBio(user.getBio());
        }    if (user.getWebsite() != null) {
            user1.setWebsite(user.getWebsite());
        }
        return userRepo.save(user);
    }

    @Override
    public User followUser(Long userId, User user) throws UserException {
        User followtouser=findUserById(userId);
        if (user.getFollowing().contains(followtouser) && followtouser.getFollowers().contains(user)) {
            user.getFollowing().remove(followtouser);
            followtouser.getFollowers().remove(user);
        }else {
            user.getFollowing().add(followtouser);
            followtouser.getFollowers().add(user);
        }
        userRepo.save(followtouser);
        userRepo.save(user);
        return followtouser;
    }

    @Override
    public List<User> searchUser(String query) {

        return userRepo.searchUser(query);
    }
}
