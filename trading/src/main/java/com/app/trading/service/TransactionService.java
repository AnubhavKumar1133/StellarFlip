package com.app.trading.service;

import com.app.trading.domain.WalletTransactionType;
import com.app.trading.modal.Wallet;
import com.app.trading.modal.WalletTransaction;
import com.app.trading.repository.WalletTransactionRepository; // Assuming this repository exists
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private WalletTransactionRepository walletTransactionRepository;

    public WalletTransaction createTransaction(
            Wallet userWallet,
            WalletTransactionType type,
            String transferId,
            String purpose,
            Long amount) {
        WalletTransaction transaction = new WalletTransaction();
        transaction.setWallet(userWallet);
        transaction.setType(type);
        transaction.setDate(LocalDate.now());
        transaction.setTransferId(transferId);
        transaction.setPurpose(purpose);
        transaction.setAmount(amount);

        return walletTransactionRepository.save(transaction);
    }

    public List<WalletTransaction> getTransactionsByWallet(Wallet wallet) {
        return walletTransactionRepository.findByWalletId(wallet.getId());
    }
}
