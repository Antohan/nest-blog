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
    const articleIndex = this.articles.findIndex((article) => article.id === id);
    if (articleIndex === -1) {
      throw new Error('Not found');
    }
    this.articles[articleIndex] = { ...this.articles[articleIndex], ...updateArticleDto };
    return this.articles[articleIndex];
  }

  async remove(id: string): Promise<{ deleted: boolean; message?: string }> {
    try {
      const index = this.articles.findIndex((article) => article.id === id);
      this.articles.splice(index, 1);
      return { deleted: true };
    } catch (error) {
      return { deleted: false, message: error.message };
    }
  }
}
