import { IsString, IsOptional, IsNumber } from 'class-validator';

export class IngredientDto {
  @IsString()
  name!: string;

  @IsNumber()
  quantity!: number;

  @IsString()
  unit!: string;

  @IsOptional()
  @IsString()
  notes?: string;
}