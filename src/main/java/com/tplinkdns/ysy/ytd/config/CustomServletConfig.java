package com.tplinkdns.ysy.ytd.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class CustomServletConfig implements WebMvcConfigurer {

    @Override //LocalDateFormatter 설정
    public void addFormatters(FormatterRegistry registry) {
        registry.addFormatter(new LocalDateFormatter());
        // controller.formatter.LocalDateFormatter
    }



}
