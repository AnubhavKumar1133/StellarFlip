package com.app.trading.service;

import com.app.trading.domain.VerificationType;
import com.app.trading.modal.ForgotPasswordToken;
import com.app.trading.modal.User;
import com.app.trading.modal.VerificationCode;

public interface ForgotPasswordService {
    ForgotPasswordToken createToken(User user, String id, String otp, VerificationType verificationType, String sendTo);

    ForgotPasswordToken findById(String id);

    ForgotPasswordToken findByUser(Long userId);

    void deleteToken(ForgotPasswordToken token);
}
