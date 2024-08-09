package com.hipu.BlogBack.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
public class Twit {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private User user;

    private String content;
    private String image;
    private String video;

    @OneToMany(mappedBy = "twit",cascade = CascadeType.ALL)
    private List<Like> likes=new ArrayList<>();

    @OneToMany
    private List<Twit> replyTwit=new ArrayList<>();

    @ManyToMany
    private List<User> reTwitUser=new ArrayList<>();

    @ManyToOne
    private Twit replyFor;

    private boolean isReply;
    private boolean isTwit;

    private LocalDateTime createdAt;
}
