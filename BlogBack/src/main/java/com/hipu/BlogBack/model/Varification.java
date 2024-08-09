package com.hipu.BlogBack.model;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Varification {

    private boolean status=false;
    private LocalDateTime startAt;
    private LocalDateTime endAt;
    private String planType;

}
