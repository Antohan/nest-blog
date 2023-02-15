import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from '../articles/articles.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [ArticlesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
