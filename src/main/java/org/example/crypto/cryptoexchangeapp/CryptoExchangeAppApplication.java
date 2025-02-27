package org.example.crypto.cryptoexchangeapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class CryptoExchangeAppApplication {

    public static void main(String[] args) {
        SpringApplication.run(CryptoExchangeAppApplication.class, args);
    }

}