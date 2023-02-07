import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-artice.dto';

@Injectable()
export class ArticlesService {
  private readonly articles: Article[] = [];

  async findAll(): Promise<Article[]> {
    return this.articles;
  }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    const article: Article = {
      id: randomUUID(),
      ...createArticleDto,
    };
    this.articles.push(article);
    return article;
  }

  async findOne(id: string): Promise<Article> {
    return this.articles.find((article) => article.id === id);
  }

  async update(id: string, updateArticleDto: UpdateArticleDto): Promise<Article> {
    const article = this.articles.find((article) => article.id === id);
    for (const key in updateArticleDto) {
      article[key] = updateArticleDto[key];
    }
    return article;
  }

  async remove(id: string): Promise<void> {
    const index = this.articles.findIndex((article) => article.id === id);
    this.articles.splice(index, 1);
  }
}
