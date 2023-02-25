import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Article } from './entities/article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-artice.dto';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel(Article) private readonly articleModel: typeof Article) {}

  async findAll(): Promise<Article[]> {
    return this.articleModel.findAll<Article>();
  }

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    return await this.articleModel.create<Article>(createArticleDto);
  }

  async findOne(id: string): Promise<Article> {
    return this.articleModel.findOne({ where: { id } });
  }

  async update(
    id: string,
    updateArticleDto: UpdateArticleDto,
  ): Promise<{ numberOfAffectedRows: number; updatedArticle: Article }> {
    const [numberOfAffectedRows, [updatedArticle]] = await this.articleModel.update<Article>(
      updateArticleDto,
      { where: { id }, returning: true },
    );
    return { numberOfAffectedRows, updatedArticle };
  }

  async remove(id: string): Promise<number> {
    return await this.articleModel.destroy({ where: { id } });
  }
}
