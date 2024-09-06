package com.app.trading.service;

import com.app.trading.domain.OrderType;
import com.app.trading.modal.Coin;
import com.app.trading.modal.Order;
import com.app.trading.modal.OrderItem;
import com.app.trading.modal.User;

import java.util.List;

public interface OrderService {
    Order createOrder(User user, OrderItem orderItem, OrderType orderType);

    Order getOrderById(Long orderId) throws Exception;

    List<Order> getAllOrdersOfUser(Long userId, OrderType orderType, String assetSymbol);

    Order processOrder(Coin coin, double quantity, OrderType orderType, User user) throws Exception;
}
