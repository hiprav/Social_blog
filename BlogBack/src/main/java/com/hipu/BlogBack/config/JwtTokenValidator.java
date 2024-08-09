package com.hipu.BlogBack.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.Collections;
import java.util.List;

public class JwtTokenValidator extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String jwt = request.getHeader(JwtConstant.JWT_HEADER);

        if(jwt!=null) {
            jwt=jwt.substring(7);

            try {

                SecretKey key= Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());

                Claims claims = Jwts.parserBuilder()
                        .setSigningKey(key)
                        .build()
                        .parseClaimsJws(jwt)
                        .getBody();

                String email=String.valueOf(claims.get("email"));

                String authorities=String.valueOf(claims.get("authorities"));

                List<GrantedAuthority> auths=AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
                Authentication athentication=new UsernamePasswordAuthenticationToken(email,null, auths);

                SecurityContextHolder.getContext().setAuthentication(athentication);

            }
            catch (ExpiredJwtException e) {
                throw new BadCredentialsException("Token has expired");
            } catch (MalformedJwtException e) {
                throw new BadCredentialsException("Malformed token");
            }
              catch (Exception e) {
                throw new BadCredentialsException("Invalid token: " + e.getMessage());
            }
        }

        filterChain.doFilter(request, response);// try to understand this
    }
}
