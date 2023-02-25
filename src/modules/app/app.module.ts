import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from '../articles/articles.module';
import { Article } from '../articles/entities/article.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT')),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        models: [Article],
        autoLoadModels: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    ArticlesModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
