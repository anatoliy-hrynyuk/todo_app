import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as dotenv from "dotenv";
import { NoteModule } from "../src/modules/note.module";


dotenv.config();

const PORT = process.env.PORT || 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api/v1");

  const options = new DocumentBuilder()
    .setTitle("Notes todo app 12.07.21")
    .setDescription(
      "A documentation for notes"
    )
    .setVersion("1.0")
    .addTag("Notes")
    .build();
  const appDocument = SwaggerModule.createDocument(app, options, {
    include: [NoteModule]
  });
  SwaggerModule.setup("api", app, appDocument);
  await app.listen(PORT);
}
bootstrap();
