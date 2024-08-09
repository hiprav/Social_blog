package com.hipu.BlogBack.controller;

import com.hipu.BlogBack.dto.TwitDto;
import com.hipu.BlogBack.dto.TwitDtoMapper;
import com.hipu.BlogBack.exception.TwitException;
import com.hipu.BlogBack.exception.UserException;
import com.hipu.BlogBack.model.Twit;
import com.hipu.BlogBack.model.TwitReplyRequests;
import com.hipu.BlogBack.model.User;
import com.hipu.BlogBack.response.ApiResponse;
import com.hipu.BlogBack.service.TwitService;
import com.hipu.BlogBack.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/twits")
public class TwitController {
    @Autowired
    private TwitService twitService;
    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<TwitDto> craeteTwit(@RequestBody Twit req, @RequestHeader("Authorization")String jwt)throws UserException, TwitException{
        User user=userService.findUserProfileByJwt(jwt);
        Twit twit=twitService.createTwit(req,user);
        TwitDto twitDto= TwitDtoMapper.toTwitDto(twit,user);
        return new ResponseEntity<>(twitDto, HttpStatus.CREATED);
    }
    @PostMapping("/reply")
    public ResponseEntity<TwitDto> replyTwit(@RequestBody TwitReplyRequests  req, @RequestHeader("Authorization")String jwt)throws UserException, TwitException{
        User user=userService.findUserProfileByJwt(jwt);
        Twit twit=twitService.createReply(req,user);
        TwitDto twitDto= TwitDtoMapper.toTwitDto(twit,user);
        return new ResponseEntity<>(twitDto, HttpStatus.CREATED);
    }
    @PutMapping("/{twitId}/retwit")
    public ResponseEntity<TwitDto> retwit(@PathVariable Long twitId, @RequestHeader("Authorization")String jwt)throws UserException, TwitException{
        User user=userService.findUserProfileByJwt(jwt);
        Twit twit=twitService.retwit(twitId,user);
        TwitDto twitDto= TwitDtoMapper.toTwitDto(twit,user);
        return new ResponseEntity<>(twitDto, HttpStatus.OK);
    }
    @GetMapping("/{twitId}")//---------------------------------------------------
    public ResponseEntity<TwitDto> findTwitById(@PathVariable long twitId, @RequestHeader("Authorization")String jwt)throws UserException, TwitException{
        User user=userService.findUserProfileByJwt(jwt);
        Twit twit=twitService.findById(twitId);
        TwitDto twitDto= TwitDtoMapper.toTwitDto(twit,user);
        return new ResponseEntity<>(twitDto, HttpStatus.OK);
    }
    @DeleteMapping("/{twitId}")
    public ResponseEntity<ApiResponse> deleteTwit(@PathVariable long twitId, @RequestHeader("Authorization")String jwt)throws UserException, TwitException{
        User user=userService.findUserProfileByJwt(jwt);
        twitService.deleteTwitById(twitId,user.getId());
        ApiResponse res=new ApiResponse("Twit deleted sucessfully",true);
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
    @GetMapping("/")//-----------------------------------------------------------
    public ResponseEntity<List<TwitDto>> getAlTwits(@RequestHeader("Authorization")String jwt)throws UserException, TwitException{
        User user=userService.findUserProfileByJwt(jwt);
        List<Twit> twits=twitService.findAllTwit();
        List<TwitDto> twitDtos=TwitDtoMapper.toTwitDtos(twits,user);
        return new ResponseEntity<>(twitDtos, HttpStatus.OK);
    }
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<TwitDto>> getUserAlTwits(@PathVariable long userId,@RequestHeader("Authorization")String jwt)throws UserException, TwitException{
        User user=userService.findUserProfileByJwt(jwt);//made no use of userId🤣
        List<Twit> twits=twitService.getUserTwit(user);
        List<TwitDto> twitDtos=TwitDtoMapper.toTwitDtos(twits,user);
        return new ResponseEntity<>(twitDtos, HttpStatus.OK);
    }
    @GetMapping("/user/{userId}/likes")
    public ResponseEntity<List<TwitDto>> findTwitByLikesContainUser(@PathVariable long userId,@RequestHeader("Authorization")String jwt)throws UserException, TwitException{
        User user=userService.findUserProfileByJwt(jwt);//made no use of userId🤣
        List<Twit> twits=twitService.findByLikeContainsUser(user);
        List<TwitDto> twitDtos=TwitDtoMapper.toTwitDtos(twits,user);
        return new ResponseEntity<>(twitDtos, HttpStatus.OK);
    }
}
