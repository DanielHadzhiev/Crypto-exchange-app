package org.example.crypto.cryptoexchangeapp.service.impl;

import org.example.crypto.cryptoexchangeapp.service.CryptoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class CryptoServiceImpl implements CryptoService {

    // Ticker URL (unchanged)
    private static final String KRAKEN_API_URL = "https://api.kraken.com/0/public/Ticker?pair=XBTUSD,ETHUSD,ADAUSD";
    // We won't use the combined OHLC URL since it causes errors.
    // Instead, we'll call each pair individually.
    private static final String OHLC_URL_BTC = "https://api.kraken.com/0/public/OHLC?pair=XXBTZUSD&interval=60";
    private static final String OHLC_URL_ETH = "https://api.kraken.com/0/public/OHLC?pair=XETHZUSD&interval=60";
    // If Cardano is supported, update the URL accordingly; for now, we'll omit it.

    private static final Logger logger = LoggerFactory.getLogger(CryptoServiceImpl.class);
    private final RestTemplate restTemplate;

    @Autowired
    public CryptoServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public Map<String, Object> getCryptoPrices() {
        try {
            ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
                    KRAKEN_API_URL,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            return response.getBody();
        } catch (HttpClientErrorException e) {
            logger.error("Error fetching crypto prices: {}", e.getMessage(), e);
            return Collections.emptyMap();
        } catch (Exception e) {
            logger.error("Unexpected error fetching crypto prices", e);
            return Collections.emptyMap();
        }
    }

    @Override
    public Map<String, Object> getCryptoHistoricalData() {
        Map<String, Object> combinedResults = new HashMap<>();

        try {
            // Fetch Bitcoin OHLC data
            ResponseEntity<Map<String, Object>> btcResponse = restTemplate.exchange(
                    OHLC_URL_BTC,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            Map<String, Object> btcData = btcResponse.getBody();
            if (btcData != null && btcData.containsKey("result")) {
                Map<String, Object> result = (Map<String, Object>) btcData.get("result");
                // Typically, the key will be "XXBTZUSD"
                combinedResults.put("Bitcoin", result.get("XXBTZUSD"));
            }

            // Fetch Ethereum OHLC data
            ResponseEntity<Map<String, Object>> ethResponse = restTemplate.exchange(
                    OHLC_URL_ETH,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            Map<String, Object> ethData = ethResponse.getBody();
            if (ethData != null && ethData.containsKey("result")) {
                Map<String, Object> result = (Map<String, Object>) ethData.get("result");
                // Typically, the key will be "XETHZUSD"
                combinedResults.put("Ethereum", result.get("XETHZUSD"));
            }

            // If you later get Cardano working, add a similar block here.

        } catch (HttpClientErrorException e) {
            logger.error("Error fetching crypto historical data: {}", e.getMessage(), e);
            return Collections.emptyMap();
        } catch (Exception e) {
            logger.error("Unexpected error fetching crypto historical data", e);
            return Collections.emptyMap();
        }

        return combinedResults;
    }
}
