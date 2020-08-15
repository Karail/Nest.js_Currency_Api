import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                uri: configService.get<string>('MONGODB_URI'),
                useFindAndModify: false,
                useNewUrlParser: true,
                autoCreate: true
            }),
            inject: [ConfigService],
        }),
    ]
})
export class DatabaseModule { }
