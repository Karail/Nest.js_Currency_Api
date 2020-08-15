import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CurrencyModule } from './currency/currency.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from './database/database.module';
import config from './config/config';

@Module({
  imports: [
  ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
    load: [config]
  }),
  ScheduleModule.forRoot(),
  CurrencyModule,
  AuthModule,
  UserModule,
  DatabaseModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
