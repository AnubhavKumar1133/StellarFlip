package com.app.trading.service;

import com.app.trading.modal.Asset;
import com.app.trading.modal.Coin;
import com.app.trading.modal.User;
import com.app.trading.repository.AssetRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AssetServiceImpl implements AssetService{
    @Autowired
    private AssetRepository assetRepository;

    @Override
    public Asset createAsset(User user, Coin coin, double quantity) {
        Asset asset = new Asset();
        asset.setUser(user);
        asset.setCoin(coin);
        asset.setQuantity(quantity);
        asset.setBuyPrice(coin.getCurrentPrice());
        return assetRepository.save(asset);
    }

    @Override
    public Asset getAssetById(Long assetId) throws Exception {
        return assetRepository.findById(assetId).orElseThrow(
                () -> new Exception("asset not found"));
    }

    @Override
    public Asset getAssetByUserIdAndId(Long userId, Long assetId) {
        return assetRepository.findByUserIdAndId(userId, assetId);
    }

    @Override
    public List<Asset> getUsersAssets(Long userId) {
        return assetRepository.findByUserId(userId);
    }

    @Override
    @Transactional (rollbackFor = Exception.class)
    public Asset updateAsset(Long assetId, double quantity) throws Exception {
        if (quantity == 0) {
            throw new IllegalArgumentException(
                "Quantity change cannot be zero"
            );
        }

        Asset oldAsset = getAssetById(assetId);

        double updatedQuantity = oldAsset.getQuantity() + quantity;

        if (updatedQuantity < 0) {
            throw new IllegalArgumentException(
                "Insufficient asset quantity"
            );
        }

        oldAsset.setQuantity(updatedQuantity);

        return assetRepository.save(oldAsset);
    }


    @Override
    @Transactional
    public Asset findAssetByUserIdAndCoinIdForUpdate(
            Long userId, String coinId) {

        return assetRepository.findByUserIdAndCoinIdForUpdate(
            userId, coinId
        );
    }

    @Override
    public Asset findAssetByUserIdAndCoinId(Long userId, String coinId) {
        return assetRepository.findByUserIdAndCoinId(userId, coinId);
    }

    @Override
    public void deleteAsset(Long assetId) {
        assetRepository.deleteById(assetId);
    }
}
