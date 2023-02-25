import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/sequelize';
import { ArticlesService } from './articles.service';
import { Article } from './entities/article.entity';

const mockArticles = [
  { id: '1', title: 'test 1', content: 'test 1' },
  { id: '2', title: 'test 2', content: 'test 2' },
];
const mockArticle = { id: '3', title: 'test 3', content: 'test 3' };

describe('ArticlesService', () => {
  let service: ArticlesService;
  let model: typeof Article;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ArticlesService,
        {
          provide: getModelToken(Article),
          useValue: {
            findAll: jest.fn(() => mockArticles),
            findOne: jest.fn(() => mockArticle),
            create: jest.fn(() => mockArticle),
            update: jest.fn(() => mockArticle),
            destroy: jest.fn(() => ({ deleted: true })),
          },
        },
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
    model = module.get<typeof Article>(getModelToken(Article));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of articles', async () => {
      const articles = await service.findAll();
      expect(articles).toEqual(mockArticles);
    });
  });

  describe('findOne', () => {
    it('should return a single article', async () => {
      const findSpy = jest.spyOn(model, 'findOne');
      expect(service.findOne('1'));
      expect(findSpy).toBeCalledWith({ where: { id: '1' } });
    });
  });

  describe('create', () => {
    it('should create a new article', async () => {
      const article = await service.create({ title: 'test', content: 'test' });
      expect(article).toEqual(mockArticle);
    });
  });
});
