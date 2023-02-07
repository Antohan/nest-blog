import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
  findAll(): string {
    return 'Return from service';
  }

  create(createArticleDto: CreateArticleDto) {
    return createArticleDto;
  }
}
