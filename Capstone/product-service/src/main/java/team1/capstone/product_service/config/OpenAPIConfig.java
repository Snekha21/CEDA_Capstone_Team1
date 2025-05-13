package team1.capstone.product_service.config;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class OpenAPIConfig {

  @Value("${myapp.openapi.dev-url}")
  private String devUrl;

  @Value("${myapp.openapi.prod-url}")
  private String prodUrl;

  @Bean
  public OpenAPI myOpenAPI() {
    Server devServer = new Server();
    devServer.setUrl(devUrl);
    devServer.setDescription("Development Server URL for Cosmetic Catalogue");

    Server prodServer = new Server();
    prodServer.setUrl(prodUrl);
    prodServer.setDescription("Production Server URL for Cosmetic Catalogue");


    License license = new License()
        .name("CosmeticAPI License")
        .url("https://urldefense.com/v3/__https://choosealicense.com/licenses/mit/__;!!Nyu6ZXf5!p40vRoLX4Q5Ayz_ZFm3ijw1j-ryBubLWM1ukF0ySL3Z5NyYeyBJaxUNC6B1qOmNbpobN-Jjag6m-011aQccYhOgu$ ");

    Info info = new Info()
        .title("Cosmetic Catalogue Product API")
        .version("1.0")
        .description("This API provides endpoints to manage a wide range of cosmetic products, including category-based listings, pricing, and ratings.")
        .termsOfService("https://urldefense.com/v3/__https://www.cosmeticapi.com/terms__;!!Nyu6ZXf5!p40vRoLX4Q5Ayz_ZFm3ijw1j-ryBubLWM1ukF0ySL3Z5NyYeyBJaxUNC6B1qOmNbpobN-Jjag6m-011aQbJF7Pun$ ")
        .license(license);

    return new OpenAPI().info(info).servers(List.of(devServer, prodServer));
  }
}
