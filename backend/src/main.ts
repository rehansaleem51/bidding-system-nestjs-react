import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './redis-io-adapter';
import * as moment from 'moment-timezone';

async function bootstrap() {
  moment.tz.setDefault('Asia/Karachi');
  const app = await NestFactory.create(AppModule, { cors: true });
  const redisIoAdapter = new RedisIoAdapter(app);
await redisIoAdapter.connectToRedis();

app.useWebSocketAdapter(redisIoAdapter);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
