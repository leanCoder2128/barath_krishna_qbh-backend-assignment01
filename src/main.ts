import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3000).then(() => console.log('Application running on port 3000')).catch((error) => console.log('Error while starting the application', error));
}
bootstrap();
