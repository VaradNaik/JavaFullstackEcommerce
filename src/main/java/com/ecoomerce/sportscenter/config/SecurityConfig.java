package com.ecoomerce.sportscenter.config;

import com.ecoomerce.sportscenter.security.JwtAuthenticationEntryPoint;
import com.ecoomerce.sportscenter.security.JwtAuthenticationFilter;
import com.ecoomerce.sportscenter.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity()
public class SecurityConfig {
    private final JwtAuthenticationEntryPoint entryPoint;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Autowired
    private AuthenticationManagerBuilder authenticationManagerBuilder;

    public SecurityConfig(JwtAuthenticationEntryPoint entryPoint,
                          JwtAuthenticationFilter jwtAuthenticationFilter,
                          CustomUserDetailsService customUserDetailsService) {
        this.entryPoint = entryPoint;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception{
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests((requests)-> requests
                        .requestMatchers("/products").authenticated()
                        .requestMatchers("/auth/login").permitAll()
                        //.requestMatchers("/account/register").permitAll()
                        .anyRequest().permitAll())
                .exceptionHandling(ex -> ex.authenticationEntryPoint(entryPoint))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();

    }
    @Bean
    public AuthenticationManager authenticationManager(HttpSecurity http) throws Exception {
        return authenticationManagerBuilder.getObject();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
