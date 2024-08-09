package com.hipu.BlogBack.controller;

import com.hipu.BlogBack.dto.UserDto;
import com.hipu.BlogBack.dto.UserDtoMapper;
import com.hipu.BlogBack.dto.UserUtil;
import com.hipu.BlogBack.exception.UserException;
import com.hipu.BlogBack.model.User;
import com.hipu.BlogBack.repo.UserRepo;
import com.hipu.BlogBack.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepo userRepo;

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepo.findAll();
        return ResponseEntity.ok(users);
    }
    @GetMapping("profile")
    public ResponseEntity<UserDto> getUserProfile(@RequestHeader("Authorization")String jwt)throws UserException{
        System.out.println("i am in get user profile controller");
        User user=userService.findUserProfileByJwt(jwt);
        System.out.println("user "+user.getFullName());
        user.setPassword(null);
        user.setReq_user(true);
        UserDto userDto= UserDtoMapper.toUserDto(user);
        System.out.println("userDto "+userDto.getFullName());
        userDto.setReq_user(true);
        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
    }
    @GetMapping("/{userId}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long userId, @RequestHeader("Authorization")String jwt)throws UserException{
        User reqUser=userService.findUserProfileByJwt(jwt);
        User user=userService.findUserById(userId);
        UserDto userDto= UserDtoMapper.toUserDto(user);
        userDto.setReq_user(UserUtil.isReqUser(reqUser,user));
        userDto.setFollowed(UserUtil.isFollowedByReqUser(reqUser,user));
        return new ResponseEntity<UserDto>(userDto, HttpStatus.ACCEPTED);
    }
    @GetMapping("/search")
    public ResponseEntity<List<UserDto>> searchUser(@RequestParam String query,@RequestHeader("Authorization")String jwt)throws UserException{
        //User reqUser=userService.findUserProfileByJwt(jwt);
        List<User> users=userService.searchUser(query);
        List<UserDto> userDtos= UserDtoMapper.toUserDtos(users);

        return new ResponseEntity<List<UserDto>>(userDtos, HttpStatus.ACCEPTED);
    }
    @PutMapping("/update")
    public ResponseEntity<UserDto> updateUser(@RequestBody User req,@RequestHeader("Authorization")String jwt)throws UserException{
        User reqUser=userService.findUserProfileByJwt(jwt);
       User user=userService.updateUser(reqUser.getId(),req);
        UserDto userDto= UserDtoMapper.toUserDto(user);
        userDto.setReq_user(true);
        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
    }
    @PutMapping("/{userId}/follow")
    public ResponseEntity<UserDto> followUser(@PathVariable Long userId,@RequestHeader("Authorization")String jwt)throws UserException{
        User reqUser=userService.findUserProfileByJwt(jwt);
        User user=userService.followUser(userId,reqUser);
        UserDto userDto= UserDtoMapper.toUserDto(user);
        userDto.setFollowed(UserUtil.isFollowedByReqUser(reqUser,user));
        return new ResponseEntity<>(userDto, HttpStatus.ACCEPTED);
    }
}
