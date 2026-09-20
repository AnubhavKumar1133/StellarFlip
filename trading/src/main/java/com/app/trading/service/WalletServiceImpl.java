package com.app.trading.service;

import com.app.trading.domain.OrderType;
import com.app.trading.modal.Order;
import com.app.trading.modal.User;
import com.app.trading.modal.Wallet;
import com.app.trading.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class WalletServiceImpl implements WalletService{
    @Autowired
    private WalletRepository walletRepository;


    private Wallet getUserWalletForUpdate(User user) throws Exception {
        return walletRepository.findByUserIdForUpdate(user.getId()).orElseThrow(() -> new Exception("Wallet not found"));
    }

    @Override
    public Wallet getUserWallet(User user) {
        Wallet wallet = walletRepository.findByUserId(user.getId());
        if(wallet==null){
            wallet=new Wallet();
            wallet.setUser(user);
            walletRepository.save(wallet);
        }
        return wallet;
    }

    @Override
    public Wallet addBalance(Wallet wallet, Long money) {
        BigDecimal balance = wallet.getBalance();
        BigDecimal newBalance = balance.add(BigDecimal.valueOf(money));
        wallet.setBalance(newBalance);
        return walletRepository.save(wallet);
    }

    @Override
    public Wallet findWalletById(Long id) throws Exception {
        Optional<Wallet> wallet = walletRepository.findById(id);
        if(wallet.isPresent()){
            return wallet.get();
        }
        throw new Exception("wallet not found");
    }

    @Override
    @Transactional (rollbackFor = Exception.class) 
    // Ensures that database operations made by this 
    // controller are transactional all database operations succeed together or everything falls back on failure.
    public Wallet walletToWalletTransfer(
            User sender,
            Wallet receiverWallet,
            Long amount
    ) throws Exception {

        if (amount == null || amount <= 0) {
            throw new Exception("Transfer amount must be greater than zero");
        }

        if (receiverWallet == null || receiverWallet.getId() == null) {
            throw new Exception("Receiver wallet not found");
        }

        Wallet senderWallet = getUserWalletForUpdate(sender);

        // Lock receiver too, not just the sender
        Wallet lockedReceiver = walletRepository
                .findByIdForUpdate(receiverWallet.getId())
                .orElseThrow(() -> new Exception("Receiver wallet not found"));

        if (senderWallet.getId().equals(lockedReceiver.getId())) {
            throw new Exception("Cannot transfer to the same wallet");
        }

        BigDecimal transferAmount = BigDecimal.valueOf(amount);

        if (senderWallet.getBalance().compareTo(transferAmount) < 0) {
            throw new Exception("Insufficient balance");
        }

        senderWallet.setBalance(
                senderWallet.getBalance().subtract(transferAmount)
        );

        lockedReceiver.setBalance(
                lockedReceiver.getBalance().add(transferAmount)
        );

        walletRepository.save(senderWallet);
        walletRepository.save(lockedReceiver);

        return senderWallet;
    }

    @Override
    @org.springframework.transaction.annotation.Transactional(
            rollbackFor = Exception.class
    )
    public Wallet payOrderPayment(Order order, User user) throws Exception {

        if (order == null || order.getPrice() == null) {
            throw new Exception("Invalid order");
        }

        BigDecimal amount = order.getPrice();

        if (amount.compareTo(BigDecimal.ZERO) <= 0) {
            throw new Exception("Order amount must be greater than zero");
        }

        Wallet wallet = getUserWalletForUpdate(user);

        if (order.getOrderType().equals(OrderType.BUY)) {

            if (wallet.getBalance().compareTo(amount) < 0) {
                throw new Exception("Insufficient funds for this transaction");
            }

            wallet.setBalance(wallet.getBalance().subtract(amount));

        } else if (order.getOrderType().equals(OrderType.SELL)) {

            wallet.setBalance(wallet.getBalance().add(amount));

        } else {
            throw new Exception("Invalid order type");
        }

        return walletRepository.save(wallet);
    }
}
