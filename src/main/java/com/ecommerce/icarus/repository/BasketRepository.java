package com.ecommerce.icarus.repository;

import com.ecommerce.icarus.entity.Basket;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BasketRepository extends CrudRepository<Basket, String> {
}
