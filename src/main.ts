import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  // app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle("Petitions-API")
    .setVersion("1.0")
    .build();


  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("", app, document);
  await app.listen(3000);
}
bootstrap();

console.log(process.env.JWT_SECRET);
