package com.hipu.BlogBack.controller;

import com.hipu.BlogBack.config.JwtProvider;
import com.hipu.BlogBack.exception.UserException;
import com.hipu.BlogBack.model.User;
import com.hipu.BlogBack.model.Varification;
import com.hipu.BlogBack.repo.UserRepo;
import com.hipu.BlogBack.response.AuthResponse;
import com.hipu.BlogBack.service.CustomerServiceDetailServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private CustomerServiceDetailServiceImp customerServiceDetailServiceImp;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user) throws UserException {
        System.out.println("1");
        String email=user.getEmail();
        String password=user.getPassword();
        String fullName= user.getFullName();
        String birthdate= user.getBirthDate();
        User isEmailExist=userRepo.findByEmail(email);
        if (isEmailExist != null) {
            throw new UserException("Email is already in use");
        }
        User createdUser=new User();
        createdUser.setEmail(email);
        createdUser.setFullName(fullName);
        createdUser.setPassword(passwordEncoder.encode(password));
        createdUser.setBirthDate(birthdate);
        createdUser.setVarification(new Varification());

        User saveduser=userRepo.save(createdUser);

        Authentication authentication=new UsernamePasswordAuthenticationToken(email,password);
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token=jwtProvider.generateToken(authentication);

        AuthResponse res=new AuthResponse(token,true);

        return new ResponseEntity<AuthResponse>(res, HttpStatus.CREATED);
    }
    @PostMapping("/signin")
    public ResponseEntity<AuthResponse> signin(@RequestBody User user) {
        String username=user.getEmail();
        String password=user.getPassword();

        Authentication authentication=authentication(username,password);
        String token=jwtProvider.generateToken(authentication);
        AuthResponse res=new AuthResponse(token,true);
        return new ResponseEntity<AuthResponse>(res,HttpStatus.ACCEPTED);
    }

    private Authentication authentication(String username,String password){
        UserDetails userDetails=customerServiceDetailServiceImp.loadUserByUsername(username);

        if (userDetails == null) {
            throw new BadCredentialsException("Invalid username");
        }
        if (!passwordEncoder.matches(password,userDetails.getPassword())) {
            throw new BadCredentialsException("Invalid Password");
        }
        return new UsernamePasswordAuthenticationToken(username,null,userDetails.getAuthorities());
    }

}
