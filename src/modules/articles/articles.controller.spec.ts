import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { Article } from './entities/article.entity';
import { UpdateArticleDto } from './dto/update-artice.dto';

const mockArticles: Article[] = [{ id: '1', title: 'test', content: 'test' }];
const mockArticle: Article = { id: '2', title: 'test', content: 'test' };

describe('ArticlesController', () => {
  let articleController: ArticlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        {
          provide: ArticlesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockArticles),
            findOne: jest
              .fn()
              .mockImplementation((id: string) =>
                Promise.resolve({ id, title: 'test', content: 'test' }),
              ),
            create: jest
              .fn()
              .mockImplementation((article: UpdateArticleDto) => Promise.resolve({ ...article })),
            update: jest
              .fn()
              .mockImplementation((id: string, article: UpdateArticleDto) =>
                Promise.resolve({ id: '1', ...article }),
              ),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    articleController = module.get<ArticlesController>(ArticlesController);
  });

  it('should be defined', () => {
    expect(articleController).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of articles', async () => {
      await expect(articleController.findAll()).resolves.toEqual(mockArticles);
    });
  });

  describe('findOne', () => {
    it('should return an articles', async () => {
      await expect(articleController.findOne('1')).resolves.toEqual(mockArticles[0]);
    });
  });

  describe('create', () => {
    it('should create an articles', async () => {
      await expect(articleController.create(mockArticle)).resolves.toEqual(mockArticle);
    });
  });

  describe('update', () => {
    it('should update the articles', async () => {
      const newArticleDto: UpdateArticleDto = { title: 'test', content: 'test' };
      await expect(articleController.update('1', newArticleDto)).resolves.toEqual({
        id: '1',
        ...newArticleDto,
      });
    });
  });

  describe('remove', () => {
    it('should return that remove an articles', async () => {
      await expect(articleController.remove('1')).resolves.toEqual({ deleted: true });
    });
  });
});
