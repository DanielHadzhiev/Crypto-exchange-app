package org.example.crypto.cryptoexchangeapp.controller;

import org.example.crypto.cryptoexchangeapp.service.CryptoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/crypto")
@CrossOrigin(origins = "http://localhost:3000") // Allow React frontend to access
public class CryptoController {

    private final CryptoService cryptoService;

    @Autowired
    public CryptoController(CryptoService cryptoService) {
        this.cryptoService = cryptoService;
    }

    @GetMapping("/prices")
    public Map<String, Object> getCryptoPrices() {
        Map<String, Object> rawData = cryptoService.getCryptoPrices();

        // Extract relevant price data
        Map<String, Object> formattedData = new HashMap<>();
        Map<String, Object> result = (Map<String, Object>) rawData.get("result");

        if (result != null) {
            formattedData.put("Bitcoin", result.get("XXBTZUSD"));
            formattedData.put("Ethereum", result.get("XETHZUSD"));
            formattedData.put("Cardano", result.get("ADAUSD"));
        }

        return formattedData;
    }

    @GetMapping("/historical")
    public Map<String, Object> getCryptoHistoricalData() {
        // The service now returns a combined result map with keys "Bitcoin" and "Ethereum"
        Map<String, Object> rawData = cryptoService.getCryptoHistoricalData();
        Map<String, Object> formattedData = new HashMap<>();

        // Directly map the merged keys from the service response.
        formattedData.put("Bitcoin", rawData.get("Bitcoin"));
        formattedData.put("Ethereum", rawData.get("Ethereum"));
        formattedData.put("Cardano", rawData.get("Cardano"));

        return formattedData;
    }
}
