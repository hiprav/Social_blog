package com.hipu.BlogBack.controller;

import com.hipu.BlogBack.dto.LikeDto;
import com.hipu.BlogBack.dto.LikeDtoMapper;
import com.hipu.BlogBack.exception.TwitException;
import com.hipu.BlogBack.exception.UserException;
import com.hipu.BlogBack.model.Like;
import com.hipu.BlogBack.model.User;
import com.hipu.BlogBack.service.LikeService;
import com.hipu.BlogBack.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/api")
public class LikeController {

    @Autowired
    private UserService userService;

    @Autowired
    private LikeService likeService;

    @PostMapping("/{twitId}/likes")
    public ResponseEntity<LikeDto> likeTwit(@PathVariable Long twitId, @RequestHeader("Authorization")String jwt) throws UserException, TwitException{
        User user=userService.findUserProfileByJwt(jwt);
        Like like=likeService.likeTwit(twitId,user);
        LikeDto likeDto=LikeDtoMapper.toLikeDto(like,user);
        return new ResponseEntity<LikeDto>(likeDto, HttpStatus.CREATED);
    }
    @PostMapping("/twit/{twitId}")
    public ResponseEntity<List<LikeDto>> getAllLikes(@PathVariable Long twitId, @RequestHeader("Authorization")String jwt) throws UserException, TwitException{
        User user=userService.findUserProfileByJwt(jwt);
        List<Like> likes=likeService.getAllLikes(twitId);
        List<LikeDto> likeDtos=LikeDtoMapper.toLikeDtos(likes,user);
        return new ResponseEntity<>(likeDtos, HttpStatus.CREATED);
    }
}
