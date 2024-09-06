package com.app.trading.service;

import com.app.trading.modal.PaymentDetails;
import com.app.trading.modal.User;

public interface PaymentDetailService {
    public PaymentDetails addPaymentDetails(String accountNumber, String accountHolderName, String ifsc, String bankName, User user);

    public PaymentDetails getUsersPaymentDetails(User user);
}
