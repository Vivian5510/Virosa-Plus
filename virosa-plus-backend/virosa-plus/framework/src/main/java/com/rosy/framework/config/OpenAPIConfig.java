package com.rosy.framework.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class OpenAPIConfig {

        // 定制 OpenAPI 的基本信息
        @Bean
        public OpenAPI customOpenAPI() {
                return new OpenAPI()
                                .info(new Info()
                                                .title("Virosa-Plus 博客系统 API")
                                                .description("前后端分离的博客系统，包含前台展示和后台管理功能")
                                                .version("1.0.0")
                                                .contact(new Contact()
                                                                .name("Rosy")
                                                                .email("2156722358@qq.com"))
                                                .license(new License()
                                                                .name("Apache 2.0")
                                                                .url("https://www.apache.org/licenses/LICENSE-2.0.html")))
                                .externalDocs(new ExternalDocumentation()
                                                .description("博客系统文档")
                                                .url("https://github.com/Vivian5510/Virosa-Plus"))
                                .servers(servers());
        }

        private List<Server> servers() {
                List<Server> servers = new ArrayList<>();

                // 后端服务器
                Server backendServer = new Server();
                backendServer.setUrl("/api");
                backendServer.setDescription("后端服务");
                servers.add(backendServer);

                return servers;
        }

        // 配置 API 分组 - 公共部分
        @Bean
        public GroupedOpenApi publicApi() {
                return GroupedOpenApi.builder()
                                .group("公共API")
                                .pathsToMatch("/api/auth/**", "/api/articles/**", "/api/public/**")
                                .build();
        }

        // 配置 API 分组 - 后台管理
        @Bean
        public GroupedOpenApi adminApi() {
                return GroupedOpenApi.builder()
                                .group("后台管理API")
                                .pathsToMatch("/api/admin/**")
                                .build();
        }

        // 配置 API 分组 - 用户相关
        @Bean
        public GroupedOpenApi userApi() {
                return GroupedOpenApi.builder()
                                .group("用户API")
                                .pathsToMatch("/api/user/**")
                                .build();
        }
}
