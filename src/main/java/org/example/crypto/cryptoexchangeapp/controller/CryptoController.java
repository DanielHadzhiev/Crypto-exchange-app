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
            formattedData.put("Tether",result.get("USDTZUSD"));
            formattedData.put("Solana",result.get("SOLUSD"));
            formattedData.put("Pepe",result.get("PEPEUSD"));
            formattedData.put("Litecoin",result.get("XLTCZUSD"));
            formattedData.put("Dogecoin",result.get("XDGUSD"));
            formattedData.put("XRP",result.get("XXRPZUSD"));
            formattedData.put("Polkadot",result.get("DOTUSD"));
            formattedData.put("Chainlink",result.get("LINKUSD"));
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
        formattedData.put("Tether",rawData.get("Tether"));
        formattedData.put("Solana",rawData.get("Solana"));
        formattedData.put("Pepe", rawData.get("Pepe"));
        formattedData.put("Litecoin", rawData.get("Litecoin"));
        formattedData.put("Dogecoin",rawData.get("Dogecoin"));
        formattedData.put("XRP",rawData.get("XRP"));
        formattedData.put("Polkadot",rawData.get("Polkadot"));
        formattedData.put("Chainlink",rawData.get("Chainlink"));

        return formattedData;
    }
}
