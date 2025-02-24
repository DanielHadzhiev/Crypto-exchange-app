package org.example.crypto.cryptoexchangeapp.service;

import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public interface CryptoService {

    Map<String, Object> getCryptoPrices();
    Map<String, Object> getCryptoHistoricalData();
}
