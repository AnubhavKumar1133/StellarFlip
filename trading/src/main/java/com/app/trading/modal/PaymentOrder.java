package com.app.trading.modal;

import com.app.trading.domain.PaymentMethod;
import com.app.trading.domain.PaymentOrderStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;

@Data
@Entity
public class PaymentOrder implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private Long amount;

    private PaymentOrderStatus status;

    @ManyToOne
    private User user;

    private PaymentMethod paymentMethod;
}
