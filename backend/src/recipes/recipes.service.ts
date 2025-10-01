import { Injectable } from '@nestjs/common';

import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RecipesService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateRecipeDto, userId: string) {
    return this.prisma.recipe.create({
      data: {
        title: dto.title,
        description: dto.description,
        instructions: dto.instructions,
        prepTime: dto.prepTime,
        cookTime: dto.cookTime,
        servings: dto.servings,
        difficulty: dto.difficulty,
        category: dto.category,
        cuisine: dto.cuisine,
        images: dto.images ?? [],
        tags: dto.tags ?? [],
        user: { connect: { id: userId } },
        ingredients: {
          create: dto.ingredients.map((i) => ({
            name: i.name,
            quantity: i.quantity,
            unit: i.unit,
            notes: i.notes,
          })),
        },
      },
      include: { ingredients: true },
    });
  }

  findAll() {
    return this.prisma.recipe.findMany({
      include: { ingredients: true },
    });
  }

  findOne(id: string) {
    return this.prisma.recipe.findUnique({
      where: { id },
      include: { ingredients: true },
    });
  }

  update(id: string, dto: UpdateRecipeDto, userId: string) {
    return this.prisma.recipe.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        instructions: dto.instructions,
        prepTime: dto.prepTime,
        cookTime: dto.cookTime,
        servings: dto.servings,
        difficulty: dto.difficulty,
        category: dto.category,
        cuisine: dto.cuisine,
        images: dto.images,
        tags: dto.tags,
        user: { connect: { id: userId } },
        ingredients: dto.ingredients
          ? {
              deleteMany: {}, // clear old ingredients
              create: dto.ingredients.map((i) => ({
                name: i.name,
                quantity: i.quantity,
                unit: i.unit,
                notes: i.notes,
              })),
            }
          : undefined,
      },
      include: { ingredients: true },
    });
  }

  remove(id: string) {
    return this.prisma.recipe.delete({
      where: { id },
      include: { ingredients: true },
    });
  }
}