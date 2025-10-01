import {
  IsString,
  IsOptional,
  IsArray,
  IsNumber,
  Min,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { Difficulty, Category, Cuisine } from '@my-nx/share-types';
import { IngredientDto } from './ingredient.dto';
import { Type } from 'class-transformer';

export class CreateRecipeDto {
  @IsString()
  title!: string; // required

  @IsString()
  description!: string; // required

  @IsOptional()
  @IsString()
  instructions: string = 'No instructions yet'; // optional with default

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => IngredientDto)
  ingredients!: IngredientDto[];

  @IsNumber()
  @Min(1)
  prepTime!: number; // required

  @IsNumber()
  @Min(1)
  cookTime!: number; // required

  @IsNumber()
  @Min(1)
  servings!: number; // required

  @IsEnum(Difficulty)
  difficulty: Difficulty = Difficulty.EASY; // required with default

  @IsOptional()
  @IsEnum(Category)
  category?: Category; // optional

  @IsOptional()
  @IsEnum(Cuisine)
  cuisine?: Cuisine; // optional

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[]; // optional

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[]; // optional
}
