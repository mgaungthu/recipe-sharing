export interface Recipe {
  id: number;
  title: string;
  description: string;
  instructions: string;
  ingredients: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: Difficulty;
  category?: Category;
  cuisine?: Cuisine;
  images?: string[];
  author?: string;
  tags?: string[];
}

export enum Difficulty {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

export enum Category {
  BREAKFAST = 'Breakfast',
  LUNCH = 'Lunch',
  DINNER = 'Dinner',
  SNACK = 'Snack',
  DESSERT = 'Dessert',
  DRINK = 'Drink',
}

export enum Cuisine {
  THAI = 'Thai',
  INDIAN = 'Indian',
  CHINESE = 'Chinese',
  JAPANESE = 'Japanese',
  ITALIAN = 'Italian',
  FRENCH = 'French',
  AMERICAN = 'American',
  OTHER = 'Other',
}
