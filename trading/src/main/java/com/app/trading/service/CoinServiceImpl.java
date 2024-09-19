package com.app.trading.service;

import com.app.trading.modal.Coin;
import com.app.trading.repository.CoinRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.util.concurrent.RateLimiter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class CoinServiceImpl implements CoinService {

    @Autowired
    private CoinRepository coinRepository;

    @Autowired
    private ObjectMapper objectMapper;

    // Caching TTL configuration (in milliseconds)
    private static final long CACHE_TTL = 60 * 1000; // 1 minute TTL
    private ConcurrentHashMap<String, CacheEntry> cache = new ConcurrentHashMap<>();

    // Guava Rate Limiter (50 calls per minute)
    private RateLimiter rateLimiter = RateLimiter.create(50.0 / 60.0); // 50 requests per minute

    // Backoff retry configuration
    private static final int MAX_RETRIES = 3;
    private static final long INITIAL_BACKOFF = 1000; // 1 second

    @Cacheable(value = "coins", key = "#page", unless = "#result == null")
    @Override
    public List<Coin> getCoinList(int page) throws Exception {
        rateLimiter.acquire(); // Acquire a permit before making the request
        return fetchCoinList(page);
    }

    private List<Coin> fetchCoinList(int page) throws Exception {
        String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&per_page=10&page=" + page;
        RestTemplate restTemplate = new RestTemplate();

        for (int i = 0; i < MAX_RETRIES; i++) {
            try {
                HttpHeaders headers = new HttpHeaders();
                HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
                ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

                // Parse response and update cache
                List<Coin> coinList = objectMapper.readValue(response.getBody(), new TypeReference<List<Coin>>() {});
                cache.put("coins_page_" + page, new CacheEntry<>(coinList, System.currentTimeMillis()));

                return coinList;

            } catch (HttpClientErrorException e) {
                if (e.getStatusCode() == HttpStatus.TOO_MANY_REQUESTS) {
                    String retryAfter = e.getResponseHeaders().getFirst("Retry-After");
                    long waitTime = retryAfter != null ? Long.parseLong(retryAfter) * 1000 : INITIAL_BACKOFF;
                    Thread.sleep(waitTime);
                } else {
                    throw e;
                }
            }
        }
        throw new Exception("API limit exceeded and retries failed.");
    }

    @Override
    public String getMarketChart(String coinId, int days) throws Exception {
        rateLimiter.acquire(); // Throttle requests

        // Check cache first
        String cacheKey = "market_chart_" + coinId + "_" + days;
        if (cache.containsKey(cacheKey) && (System.currentTimeMillis() - cache.get(cacheKey).getTimestamp()) < CACHE_TTL) {
            return (String) cache.get(cacheKey).getData();
        }

        String url = "https://api.coingecko.com/api/v3/coins/" + coinId + "/market_chart?vs_currency=usd&days=" + days;
        RestTemplate restTemplate = new RestTemplate();

        for (int i = 0; i < MAX_RETRIES; i++) {
            try {
                HttpHeaders headers = new HttpHeaders();
                HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
                ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

                cache.put(cacheKey, new CacheEntry<>(response.getBody(), System.currentTimeMillis()));
                return response.getBody();
            } catch (HttpClientErrorException e) {
                if (e.getStatusCode() == HttpStatus.TOO_MANY_REQUESTS) {
                    String retryAfter = e.getResponseHeaders().getFirst("Retry-After");
                    long waitTime = retryAfter != null ? Long.parseLong(retryAfter) * 1000 : INITIAL_BACKOFF;
                    Thread.sleep(waitTime);
                } else {
                    throw e;
                }
            }
        }
        throw new Exception("API limit exceeded and retries failed.");
    }

    @Cacheable(value = "coinDetails", key = "#coinId", unless = "#result == null")
    @Override
    public String getCoinDetails(String coinId) throws Exception {
        rateLimiter.acquire(); // Throttle requests

        String cacheKey = "coin_details_" + coinId;
        if (cache.containsKey(cacheKey) && (System.currentTimeMillis() - cache.get(cacheKey).getTimestamp()) < CACHE_TTL) {
            return (String) cache.get(cacheKey).getData();
        }

        String url = "https://api.coingecko.com/api/v3/coins/" + coinId;
        RestTemplate restTemplate = new RestTemplate();

        for (int i = 0; i < MAX_RETRIES; i++) {
            try {
                HttpHeaders headers = new HttpHeaders();
                HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
                ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

                // Cache the response as a raw string
                cache.put(cacheKey, new CacheEntry<>(response.getBody(), System.currentTimeMillis()));
                return response.getBody(); // Return raw JSON response
            } catch (HttpClientErrorException e) {
                if (e.getStatusCode() == HttpStatus.TOO_MANY_REQUESTS) {
                    String retryAfter = e.getResponseHeaders().getFirst("Retry-After");
                    long waitTime = retryAfter != null ? Long.parseLong(retryAfter) * 1000 : INITIAL_BACKOFF;
                    Thread.sleep(waitTime);
                } else {
                    throw e;
                }
            }
        }
        throw new Exception("API limit exceeded and retries failed.");
    }


    @Override
    public Coin findById(String coinId) throws Exception {
        rateLimiter.acquire(); // Rate limiter
        return coinRepository.findById(coinId).orElseThrow(() -> new Exception("Coin not found"));
    }

    @Override
    public String searchCoin(String keyword) throws Exception {
        rateLimiter.acquire(); // Rate limiter

        String url = "https://api.coingecko.com/api/v3/search?query=" + keyword;
        RestTemplate restTemplate = new RestTemplate();
        for (int i = 0; i < MAX_RETRIES; i++) {
            try {
                HttpHeaders headers = new HttpHeaders();
                HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
                ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

                return response.getBody();
            } catch (HttpClientErrorException e) {
                if (e.getStatusCode() == HttpStatus.TOO_MANY_REQUESTS) {
                    String retryAfter = e.getResponseHeaders().getFirst("Retry-After");
                    long waitTime = retryAfter != null ? Long.parseLong(retryAfter) * 1000 : INITIAL_BACKOFF;
                    Thread.sleep(waitTime);
                } else {
                    throw e;
                }
            }
        }
        throw new Exception("API limit exceeded and retries failed.");
    }

    @Override
    public String getTop50CoinsByMarketCapRank() throws Exception {
        rateLimiter.acquire(); // Rate limiter

        String url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1";
        RestTemplate restTemplate = new RestTemplate();
        for (int i = 0; i < MAX_RETRIES; i++) {
            try {
                HttpHeaders headers = new HttpHeaders();
                HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
                ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

                return response.getBody();
            } catch (HttpClientErrorException e) {
                if (e.getStatusCode() == HttpStatus.TOO_MANY_REQUESTS) {
                    String retryAfter = e.getResponseHeaders().getFirst("Retry-After");
                    long waitTime = retryAfter != null ? Long.parseLong(retryAfter) * 1000 : INITIAL_BACKOFF;
                    Thread.sleep(waitTime);
                } else {
                    throw e;
                }
            }
        }
        throw new Exception("API limit exceeded and retries failed.");
    }

    @Override
    public String getTrendingCoins() throws Exception {
        rateLimiter.acquire(); // Rate limiter

        String url = "https://api.coingecko.com/api/v3/search/trending";
        RestTemplate restTemplate = new RestTemplate();
        for (int i = 0; i < MAX_RETRIES; i++) {
            try {
                HttpHeaders headers = new HttpHeaders();
                HttpEntity<String> entity = new HttpEntity<>("parameters", headers);
                ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

                return response.getBody();
            } catch (HttpClientErrorException e) {
                if (e.getStatusCode() == HttpStatus.TOO_MANY_REQUESTS) {
                    String retryAfter = e.getResponseHeaders().getFirst("Retry-After");
                    long waitTime = retryAfter != null ? Long.parseLong(retryAfter) * 1000 : INITIAL_BACKOFF;
                    Thread.sleep(waitTime);
                } else {
                    throw e;
                }
            }
        }
        throw new Exception("API limit exceeded and retries failed.");
    }


    private Coin mapJsonToCoin(JsonNode jsonNode) {
        Coin coin = new Coin();
        coin.setId(jsonNode.get("id").asText());
        coin.setName(jsonNode.get("name").asText());
        coin.setSymbol(jsonNode.get("symbol").asText());
        coin.setImage(jsonNode.get("image").get("large").asText());
        // Map other fields as needed
        return coin;
    }

    // CacheEntry helper class to store data and its timestamp
    private static class CacheEntry<T> {
        private T data;
        private long timestamp;

        public CacheEntry(T data, long timestamp) {
            this.data = data;
            this.timestamp = timestamp;
        }

        public T getData() {
            return data;
        }

        public long getTimestamp() {
            return timestamp;
        }
    }
}
