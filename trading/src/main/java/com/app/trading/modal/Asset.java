package com.app.trading.modal;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(
    name = "assets",
    uniqueConstraints = {
        @UniqueConstraint(
            name = "uk_asset_user_coin",
            columnNames = {"user_id", "coin_id"}
        )
    }
)
public class Asset {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private double quantity;

    private double buyPrice;

    @ManyToOne
    @JoinColumn(name = "coin_id", nullable = false)
    private Coin coin;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}