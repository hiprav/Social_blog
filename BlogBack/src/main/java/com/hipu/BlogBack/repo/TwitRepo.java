package com.hipu.BlogBack.repo;

import com.hipu.BlogBack.model.Twit;
import com.hipu.BlogBack.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TwitRepo extends JpaRepository<Twit,Long> {
    Twit findTwitById(Long id);
    List<Twit>findAllByIsTwitTrueOrderByCreatedAtDesc();
    List<Twit>findByReTwitUserContainsOrUser_idAndIsTwitTrueOrderByCreatedAtDesc(User user,Long userId);
    List<Twit>findByLikesContainingOrderByCreatedAtDesc(User user);
    @Query("select t from Twit t JOIN t.likes i where  i.user.id=:userId")
    List<Twit>findByLikesUser_Id(Long userId);
}
