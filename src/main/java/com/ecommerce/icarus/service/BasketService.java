package com.ecommerce.icarus.service;

import com.ecommerce.icarus.entity.Basket;
import com.ecommerce.icarus.model.BasketResponse;

import java.util.List;

public interface BasketService {
    List<BasketResponse> getAllBaskets();
    BasketResponse getBasketById(String basketId);
    void deleteBasketById(String basketId);
    BasketResponse createBasket(Basket basket);
}
