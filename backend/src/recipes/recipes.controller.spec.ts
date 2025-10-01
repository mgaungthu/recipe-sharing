import { Test, TestingModule } from '@nestjs/testing';
import { RecipesController } from './recipes.controller';
import { RecipesService } from './recipes.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ExecutionContext } from '@nestjs/common';

describe('RecipesController', () => {
  let controller: RecipesController;
  let service: RecipesService;

  const mockRecipesService = {
    findAll: jest.fn().mockResolvedValue([{ id: '1', title: 'Recipe 1' }]),
    findOne: jest.fn().mockResolvedValue({ id: '1', title: 'Recipe 1' }),
    create: jest.fn().mockResolvedValue({ id: '1', title: 'New Recipe' }),
    update: jest.fn().mockResolvedValue({ id: '1', title: 'Updated Recipe' }),
    remove: jest.fn().mockResolvedValue({ success: true }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RecipesController],
      providers: [
        { provide: RecipesService, useValue: mockRecipesService },
      ],
    })
      .overrideGuard(JwtAuthGuard) // ✅ bypass JwtAuthGuard for testing
      .useValue({
        canActivate: (context: ExecutionContext) => true,
      })
      .compile();

    controller = module.get<RecipesController>(RecipesController);
    service = module.get<RecipesService>(RecipesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all recipes', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([{ id: '1', title: 'Recipe 1' }]);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single recipe', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual({ id: '1', title: 'Recipe 1' });
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('create', () => {
    it('should create a recipe', async () => {
      const dto = { title: 'New Recipe', description: 'test', ingredients: [] };
      const req = { user: { id: 'user-1' } };
      const result = await controller.create(dto as any, req);
      expect(result).toEqual({ id: '1', title: 'New Recipe' });
      expect(service.create).toHaveBeenCalledWith(dto, 'user-1');
    });
  });

  describe('update', () => {
    it('should update a recipe', async () => {
      const dto = { title: 'Updated Recipe' };
      const req = { user: { id: 'user-1' } };
      const result = await controller.update('1', dto as any, req);
      expect(result).toEqual({ id: '1', title: 'Updated Recipe' });
      expect(service.update).toHaveBeenCalledWith('1', dto, 'user-1');
    });
  });

  describe('remove', () => {
    it('should remove a recipe', async () => {
      const req = { user: { id: 'user-1' } };
      const result = await controller.remove('1', req);
      expect(result).toEqual({ success: true });
      expect(service.remove).toHaveBeenCalledWith('1', 'user-1');
    });
  });
});