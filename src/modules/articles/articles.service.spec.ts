import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';
import { Article } from './entities/article.entity';

const mockArticles: Article[] = [
  { id: '1', title: 'test 1', content: 'test 1' },
  { id: '2', title: 'test 2', content: 'test 2' },
];
const mockArticle: Article = { id: '3', title: 'test 3', content: 'test 3' };

describe('ArticlesService', () => {
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ArticlesService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(mockArticles),
            findOne: jest.fn().mockResolvedValue(mockArticle),
            create: jest.fn().mockResolvedValue(mockArticle),
            update: jest.fn().mockResolvedValue(mockArticle),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
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
      const article = await service.findOne('1');
      expect(article).toEqual(mockArticle);
    });
  });

  describe('create', () => {
    it('should create a new article', async () => {
      const article = await service.create({ title: 'test', content: 'test' });
      expect(article).toEqual(mockArticle);
    });
  });

  describe('update', () => {
    it('should update an article', async () => {
      const article = await service.update('1', { title: 'test', content: 'test' });
      expect(article).toEqual(mockArticle);
    });
  });

  describe('remove', () => {
    it('should remove an article', () => {
      expect(service.remove('1')).resolves.toEqual({ deleted: true });
    });
  });
});
