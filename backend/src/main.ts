import "dotenv/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Cinevault")
    .setDescription("A web application for managing a list of movies.")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("swagger", app, document, {
    customSiteTitle: "Cinevault - Swagger",
    swaggerOptions: {
      docExpansion: "none",
    },
  });

  await app.listen(process.env.PORT || 3333);
}
bootstrap();
