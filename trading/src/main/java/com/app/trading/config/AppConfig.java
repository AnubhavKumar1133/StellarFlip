package com.app.trading.config;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Configuration // java annotation used to configure settings tells this to Spring when app starts
public class AppConfig {
    @Bean // Tells spring to create an object of this class and manage it 
    // store it in IoC (inversion of control) container

    //security configuration for this app
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // make the session state less instead of storing the user information in the session
        http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize.requestMatchers("/api/**").authenticated() // authorize all requests with /api/ in it
                        .anyRequest().permitAll()) //permit other apis like /register /signin
                .addFilterBefore(new JwtTokenValidator(), BasicAuthenticationFilter.class) //add a JwtTokenValidator filter before BasicAuthenticationFilter
                .csrf(csrf -> csrf.disable()) //disable CSRF
                .cors(cors -> cors.configurationSource(corsConfigurationSource()));//remove the default cors policy with the one configured in the 
                // corsConfigurationSource()

        return http.build();
    }

    // Configures CORS policy for this app
    private CorsConfigurationSource corsConfigurationSource(){

        return new CorsConfigurationSource() {
            @Override // override the getCorsConfiguration()
            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                CorsConfiguration cfg = new CorsConfiguration();
                cfg.setAllowedOrigins( // list of allowed origins
                        Arrays.asList(
                                "http://localhost:5173",
                                "http://localhost:3000")
                );
                cfg.setAllowedMethods(Collections.singletonList("*")); // allow all rest api methods like GET, PUT etc
                cfg.setAllowCredentials(true); // allow credentials to be exchanged in the Cross site requests
                cfg.setExposedHeaders(Arrays.asList(("Authorization"))); // allow frontend to read the authorization header sent from backend important because browsers restrict which js can read
                cfg.setAllowedHeaders(Collections.singletonList("*")); // allow FE to send any headers, Authorization, Content-type etc
                cfg.setMaxAge(3600L);
                return cfg;
            }
        };
    }
}
