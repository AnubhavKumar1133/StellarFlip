package com.app.trading.controller;

import com.app.trading.domain.PaymentMethod;
import com.app.trading.modal.PaymentOrder;
import com.app.trading.modal.User;
import com.app.trading.response.PaymentResponse;
import com.app.trading.service.PaymentService;
import com.app.trading.service.UserService;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class PaymentController {
    @Autowired
    private UserService userService;

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/payment/{paymentMethod}/amount/{amount}")
    public ResponseEntity<PaymentResponse> paymentHandler(
            @PathVariable PaymentMethod paymentMethod,
            @PathVariable Long amount,
            @RequestHeader ("Authorization") String jwt) throws Exception, RazorpayException, StripeException {
        User user = userService.findUserProfileByJwt(jwt);
        PaymentResponse paymentResponse;
        PaymentOrder order = paymentService.createOrder(user, amount, paymentMethod);

        if(paymentMethod.equals(paymentMethod.RAZORPAY)){
            paymentResponse = paymentService.createRazorpayPaymentLink(user, amount, order.getId());
        }
        else{
            paymentResponse = paymentService.createStripePaymentLink(user, amount, order.getId());
        }
        return new ResponseEntity<>(paymentResponse, HttpStatus.CREATED);
    }
}
