package com.app.trading.service;

import com.app.trading.modal.Coin;
import com.app.trading.modal.User;
import com.app.trading.modal.Watchlist;

public interface WatchlistService {
    Watchlist findUserWatchlist(Long userId) throws Exception;

    Watchlist createWatchlist(User user);

    Watchlist findById(long id) throws Exception;

    Coin addItemToWatchlist(Coin coin, User user) throws Exception;
}
