import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticlesModule } from 'src/modules/articles/articles.module';

@Module({
  imports: [ArticlesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}