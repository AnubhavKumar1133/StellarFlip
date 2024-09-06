package com.app.trading.repository;

import com.app.trading.modal.Wallet;
import com.app.trading.modal.WalletTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Long> {
    // You can add custom query methods here if needed
    List<WalletTransaction> findByWalletId(Long walletId);

}
