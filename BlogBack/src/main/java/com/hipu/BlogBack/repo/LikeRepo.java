package com.hipu.BlogBack.repo;


import com.hipu.BlogBack.model.Like;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeRepo extends JpaRepository<Like,Long> {

    @Query("SELECT I FROM Like I WHERE I.user.id=:userId and I.twit.id=:twitId")
    public Like LikeExist(@Param("userId") Long userid,@Param("twitId") Long twit);

    @Query("SELECT I FROM Like I WHERE I.twit.id=:twitId")
    public List<Like> findByTwitId(@Param("twitId") Long twit);
}
