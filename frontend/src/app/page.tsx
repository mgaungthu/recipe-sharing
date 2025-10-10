import Link from "next/link";
import { colors } from "./theme";
import Layout from "./components/Layout";
import RecipeCard from "./components/RecipeCard";
import CategoryCard from "./components/CategoryCard";

const recipes = [
  {
    id: "1",
    title: "Pasta",
    description: "Delicious homemade pasta.",
    image: "https://placehold.co/400x300?text=Recipe",
  },
  {
    id: "2",
    title: "Soup",
    description: "Warm and comforting soup.",
    image: "https://placehold.co/400x300?text=Recipe",
  },
];

export default function HomePage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section
        className="text-white py-20 px-6 text-center"
        style={{
          background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`,
        }}
      >
        <h2 className="font-sans text-4xl font-bold mb-4">Discover & Share Recipes</h2>
        <p className="text-lg mb-6">
          Explore amazing recipes from around the world. Share your own when you
          log in!
        </p>
        <Link
          href="/recipe/create"
          className="bg-white px-6 py-3 rounded-md font-semibold shadow hover:bg-gray-100"
          style={{ color: colors.primary }}
        >
          Create Recipe
        </Link>
      </section>
        
      {/* Featured Categories */}
      <section className="container mx-auto py-12 px-6">
        <h2 className="font-sans text-2xl font-bold mb-6">Explore Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {["Breakfast", "Lunch", "Desserts", "Vegan"].map((cat) => (
            <CategoryCard key={cat} name={cat} />
          ))}
        </div>
      </section>

      {/* Recipe Listing */}
      <main className="container mx-auto py-12 px-6 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </main>
    </Layout>
  );
}