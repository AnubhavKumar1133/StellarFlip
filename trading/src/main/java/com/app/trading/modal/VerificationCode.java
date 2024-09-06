package com.app.trading.modal;

import com.app.trading.domain.VerificationType;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;


@Data
@Entity
public class VerificationCode implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String otp;

    @OneToOne
    private User user;

    private String name;

    private String mobile;

    private VerificationType verificationType;

    private String email;
}
