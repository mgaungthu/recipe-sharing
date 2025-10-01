import { Test, TestingModule } from '@nestjs/testing';
import { RecipesService } from './recipes.service';
import { PrismaService } from '../prisma.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Prisma } from '@prisma/client';
import { Category, Cuisine, Difficulty } from '@my-nx/share-types';

  type MockPrismaService = {
  recipe: {
    create: jest.Mock;
    findMany: jest.Mock;
    findUnique: jest.Mock;
    update: jest.Mock;
    delete: jest.Mock;
  };
};

type RecipeEntity = Prisma.RecipeGetPayload<{}>;

describe('RecipesService', () => {
  let service: RecipesService;
  let prisma: MockPrismaService;

  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipesService,
        {
          provide: PrismaService,
          useValue: {
            recipe: {
              create: jest.fn(),
              findMany: jest.fn(),
              findUnique: jest.fn(),
              update: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<RecipesService>(RecipesService);
    prisma = module.get(PrismaService) as unknown as MockPrismaService;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a recipe with ingredients', async () => {
      const dto: CreateRecipeDto = {
        title: 'Pasta',
        description: 'Delicious pasta',
        instructions: 'Boil water, add pasta',
        prepTime: 10,
        cookTime: 20,
        servings: 2,
        difficulty: Difficulty.EASY,
        category: Category.BREAKFAST,
        cuisine: Cuisine.AMERICAN,
        images: ['image.png'],
        tags: ['dinner'],
        ingredients: [{ name: 'Pasta', quantity: 200, unit: 'g', notes: '' }],
      };

      const expected = { id: '1', ...dto, ingredients: dto.ingredients };
      prisma.recipe.create.mockResolvedValue(expected as unknown as RecipeEntity);

      const result = await service.create(dto, 'user-1');
      expect(prisma.recipe.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            title: 'Pasta',
            user: { connect: { id: 'user-1' } },
          }),
        }),
      );
      expect(result).toEqual(expected);
    });
  });

  describe('findAll', () => {
    it('should return all recipes', async () => {
      prisma.recipe.findMany.mockResolvedValue([{ id: '1', title: 'Soup' }] as RecipeEntity[]);
      const result = await service.findAll();
      expect(result).toEqual([{ id: '1', title: 'Soup' }]);
    });
  });

  describe('findOne', () => {
    it('should return a recipe by id', async () => {
      prisma.recipe.findUnique.mockResolvedValue({ id: '1', title: 'Salad' } as RecipeEntity);
      const result = await service.findOne('1');
      expect(prisma.recipe.findUnique).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { ingredients: true },
      });
      expect(result).toEqual({ id: '1', title: 'Salad' });
    });
  });

  describe('update', () => {
    it('should update a recipe', async () => {
      const dto: UpdateRecipeDto = {
        title: 'Updated Pasta',
        description: 'New description',
        instructions: 'Cook better',
        prepTime: 15,
        cookTime: 25,
        servings: 3,
        difficulty: Difficulty.MEDIUM,
        category: Category.BREAKFAST,
        cuisine: Cuisine.AMERICAN,
        images: ['updated.png'],
        tags: ['updated'],
        ingredients: [{ name: 'Tomato', quantity: 2, unit: 'pcs', notes: '' }],
      };

      const expected = { id: '1', ...dto, ingredients: dto.ingredients };
      prisma.recipe.update.mockResolvedValue(expected as any);

      const result = await service.update('1', dto, 'user-1');
      expect(prisma.recipe.update).toHaveBeenCalled();
      expect(result).toEqual(expected);
    });
  });

  describe('remove', () => {
    it('should delete a recipe', async () => {
      prisma.recipe.delete.mockResolvedValue({ id: '1', title: 'Deleted Recipe' } as RecipeEntity);
      const result = await service.remove('1');
      expect(prisma.recipe.delete).toHaveBeenCalledWith({
        where: { id: '1' },
        include: { ingredients: true },
      });
      expect(result).toEqual({ id: '1', title: 'Deleted Recipe' });
    });
  });
});