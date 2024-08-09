package com.hipu.BlogBack.service;

import com.hipu.BlogBack.exception.UserException;
import com.hipu.BlogBack.model.User;

import java.util.List;

public interface UserService {
    public User findUserById(Long userId) throws UserException;

    public User findUserProfileByJwt(String jwt) throws UserException;
    public User updateUser(Long userId,User user) throws UserException;
    public User followUser(Long userId,User user) throws UserException;
    public List<User> searchUser(String query);
}
