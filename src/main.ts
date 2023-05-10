import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const startServer = async () => {
  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);
    console.log(`🚀 Server is running on🏃‍♂️${await app.getUrl()}`);
  } catch (error) {
    console.error(`⚠️ Unable to start the server due to ${error.message}`);
  }
};

startServer();
