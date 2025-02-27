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
    private static final String KRAKEN_API_URL = "https://api.kraken.com/0/public/Ticker?pair=XBTUSD,ETHUSD,ADAUSD,USDTZUSD,SOLUSD,DOGEUSD,XRPUSD,LTCUSD,PEPEUSD,LINKUSD,DOTUSD";
    private static final String OHLC_URL_BTC = "https://api.kraken.com/0/public/OHLC?pair=XXBTZUSD&interval=60";
    private static final String OHLC_URL_ETH = "https://api.kraken.com/0/public/OHLC?pair=XETHZUSD&interval=60";
    private static final String OHLC_URL_ADA = "https://api.kraken.com/0/public/OHLC?pair=ADAUSD&interval=60";
    private static final String OHLC_URL_USDT = "https://api.kraken.com/0/public/OHLC?pair=USDTZUSD&interval=60";
    private static final String OHLC_URL_SOL = "https://api.kraken.com/0/public/OHLC?pair=SOLUSD&interval=60";
    private static final String OHLC_URL_DOGE = "https://api.kraken.com/0/public/OHLC?pair=DOGEUSD&interval=60";
    private static final String OHLC_URL_XRP = "https://api.kraken.com/0/public/OHLC?pair=XRPUSD&interval=60";
    private static final String OHLC_URL_LTC = "https://api.kraken.com/0/public/OHLC?pair=LTCUSD&interval=60";
    private static final String OHLC_URL_PEPE = "https://api.kraken.com/0/public/OHLC?pair=PEPEUSD&interval=60";
    private static final String OHLC_URL_DOT = "https://api.kraken.com/0/public/OHLC?pair=DOTUSD&interval=60";
    private static final String OHLC_URL_LINK = "https://api.kraken.com/0/public/OHLC?pair=LINKUSD&interval=60";



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
                combinedResults.put("Ethereum", result.get("XETHZUSD"));
            }

            // Fetch Cardano OHLC data
            ResponseEntity<Map<String, Object>> adaResponse = restTemplate.exchange(
                    OHLC_URL_ADA,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            Map<String, Object> adaData = adaResponse.getBody();
            if (adaData != null && adaData.containsKey("result")) {
                Map<String, Object> result = (Map<String, Object>) adaData.get("result");
                combinedResults.put("Cardano", result.get("ADAUSD"));
            }

            // Fetch USDT OHLC data
            ResponseEntity<Map<String, Object>> usdtResponse = restTemplate.exchange(
                    OHLC_URL_USDT,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            Map<String, Object> usdtData = usdtResponse.getBody();
            if (usdtData != null && usdtData.containsKey("result")) {
                Map<String, Object> result = (Map<String, Object>) usdtData.get("result");
                combinedResults.put("Tether", result.get("USDTZUSD"));
            }

            // Fetch Solana OHLC data
            ResponseEntity<Map<String, Object>> solResponse = restTemplate.exchange(
                    OHLC_URL_SOL,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            Map<String, Object> solData = solResponse.getBody();
            if (solData != null && solData.containsKey("result")) {
                Map<String, Object> result = (Map<String, Object>) solData.get("result");
                combinedResults.put("Solana", result.get("SOLUSD")); // Ensure this is correct
            }

            // Fetch Dogecoin OHLC data
            ResponseEntity<Map<String, Object>> dogeResponse = restTemplate.exchange(
                    OHLC_URL_DOGE,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            Map<String, Object> dogeData = dogeResponse.getBody();
            if (dogeData != null && dogeData.containsKey("result")) {
                Map<String, Object> result = (Map<String, Object>) dogeData.get("result");
                combinedResults.put("Dogecoin", result.get("XDGUSD"));
            }

            // Fetch XRP OHLC data
            ResponseEntity<Map<String, Object>> xrpResponse = restTemplate.exchange(
                    OHLC_URL_XRP,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            Map<String, Object> xrpData = xrpResponse.getBody();
            if (xrpData != null && xrpData.containsKey("result")) {
                Map<String, Object> result = (Map<String, Object>) xrpData.get("result");
                combinedResults.put("XRP", result.get("XXRPZUSD"));
            }

            // Fetch Litecoin OHLC data
            ResponseEntity<Map<String, Object>> ltcResponse = restTemplate.exchange(
                    OHLC_URL_LTC,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            Map<String, Object> ltcData = ltcResponse.getBody();
            if (ltcData != null && ltcData.containsKey("result")) {
                Map<String, Object> result = (Map<String, Object>) ltcData.get("result");
                combinedResults.put("Litecoin", result.get("XLTCZUSD"));
            }

            // Fetch Pepe OHLC data
            ResponseEntity<Map<String, Object>> pepeResponse = restTemplate.exchange(
                    OHLC_URL_PEPE,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            Map<String, Object> pepeData = pepeResponse.getBody();
            if (pepeData != null && pepeData.containsKey("result")) {
                Map<String, Object> result = (Map<String, Object>) pepeData.get("result");
                combinedResults.put("Pepe", result.get("PEPEUSD")); // Adjust if necessary
            }

            // Fetch Polkadot OHLC data
            ResponseEntity<Map<String, Object>> dotResponse = restTemplate.exchange(
                    OHLC_URL_DOT,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            Map<String, Object> dotData = dotResponse.getBody();
            if (dotData != null && dotData.containsKey("result")) {
                Map<String, Object> result = (Map<String, Object>) dotData.get("result");
                combinedResults.put("Polkadot", result.get("DOTUSD"));
            }

// Fetch Chainlink OHLC data
            ResponseEntity<Map<String, Object>> linkResponse = restTemplate.exchange(
                    OHLC_URL_LINK,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<Map<String, Object>>() {}
            );
            Map<String, Object> linkData = linkResponse.getBody();
            if (linkData != null && linkData.containsKey("result")) {
                Map<String, Object> result = (Map<String, Object>) linkData.get("result");
                combinedResults.put("Chainlink", result.get("LINKUSD"));
            }

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
