package com.app.trading.controller;

import com.app.trading.modal.User;
import com.app.trading.modal.Wallet;
import com.app.trading.modal.WalletTransaction;
import com.app.trading.service.TransactionService;
import com.app.trading.service.UserService;
import com.app.trading.service.WalletService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TransactionController {
    @Autowired
    private WalletService walletService;

    @Autowired
    private UserService userService;

    @Autowired
    private TransactionService transactionService;

    @GetMapping("/api/transactions")
    public ResponseEntity<List<WalletTransaction>> getUserWallet(
            @RequestHeader("Authorization") String jwt
    )throws Exception{
        User user = userService.findUserProfileByJwt(jwt);
        Wallet wallet = walletService.getUserWallet(user);
        List<WalletTransaction> transactionList = transactionService.getTransactionsByWallet(wallet);
        return new ResponseEntity<>(transactionList, HttpStatus.ACCEPTED);
    }
}
