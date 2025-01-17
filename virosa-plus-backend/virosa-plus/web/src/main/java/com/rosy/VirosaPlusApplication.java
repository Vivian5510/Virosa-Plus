package com.rosy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@SpringBootApplication
@ConfigurationPropertiesScan("com.rosy.framework.config")
public class VirosaPlusApplication {
    public static void main(String[] args) {
        SpringApplication.run(VirosaPlusApplication.class, args);
    }
}
