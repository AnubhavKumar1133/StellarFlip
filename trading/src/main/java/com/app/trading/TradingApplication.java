package com.app.trading;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

import java.io.Serializable;

@SpringBootApplication
@EnableCaching
public class TradingApplication {

	public static void main(String[] args) {
		SpringApplication.run(TradingApplication.class, args);
	}

}
