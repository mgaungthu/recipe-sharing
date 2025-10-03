"use client";

import Link from "next/link";
import { colors } from "../theme";

type Recipe = {
  id: string;
  title: string;
  description: string;
  image: string;
};

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
    e.currentTarget.src = "/placeholder.png"; // fallback to local placeholder
  }

  return (
    <div className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-48 object-cover"
        onError={handleImgError}
      />
      <div className="p-4">
        <h3 className="font-sans text-xl font-semibold mb-2">{recipe.title}</h3>
        <p className="text-gray-600 mb-4">{recipe.description}</p>
        <Link
          href={`/recipe/${recipe.id}`}
          className="font-medium hover:underline"
          style={{ color: colors.primary }}
        >
          View Recipe →
        </Link>
      </div>
    </div>
  );
}