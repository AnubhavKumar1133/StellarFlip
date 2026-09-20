package com.app.trading.repository;

import com.app.trading.modal.Asset;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AssetRepository extends JpaRepository<Asset, Long> {

    List<Asset> findByUserId(Long userId);

    Asset findByUserIdAndCoinId(Long userId, String coinId);

    Asset findByUserIdAndId(Long userId, Long AssetId);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("""
        SELECT a
        FROM Asset a
        WHERE a.user.id = :userId
          AND a.coin.id = :coinId
        """)
    Asset findByUserIdAndCoinIdForUpdate(
        @Param("userId") Long userId,
        @Param("coinId") String coinId
    );
}