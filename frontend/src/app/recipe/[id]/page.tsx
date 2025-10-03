import Layout from '@/app/components/Layout';
import RecipeCard from '@/app/components/RecipeCard';
import Image from 'next/image';

export default function RecipePage() {

const OtherRecipes = [
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


  return (
    <Layout>
      <div className="bg-[#fdfcf8] min-h-screen flex justify-center px-6 py-12">
        <div className="max-w-3xl w-full">
          <article className="bg-white rounded-2xl shadow-md overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-72 w-full">
            <Image
              src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
              alt="Recipe Image"
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-8">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Classic Beef Bourguignon
            </h1>

            <p className="text-gray-600 mb-6 leading-relaxed">
              A timeless French classic simmered in red wine, rich beef stock,
              and aromatic herbs. Perfect for a gourmet dinner at home.
            </p>

            {/* Meta Info */}
            <div className="flex items-center gap-6 text-sm text-gray-500 mb-8">
              <span>⏱️ 2 hrs</span>
              <span>👨‍🍳 Medium</span>
              <span>🍽️ 4 Servings</span>
            </div>

            {/* Ingredients */}
            <h2 className="text-2xl font-serif font-semibold mb-3">
              Ingredients
            </h2>
            <ul className="list-disc pl-6 text-gray-700 mb-8 space-y-1">
              <li>500g beef chuck, cubed</li>
              <li>2 carrots, sliced</li>
              <li>1 onion, diced</li>
              <li>2 cups red wine</li>
              <li>Fresh thyme, garlic, salt & pepper</li>
            </ul>

            {/* Instructions */}
            <h2 className="text-2xl font-serif font-semibold mb-3">
              Instructions
            </h2>
            <ol className="list-decimal pl-6 text-gray-700 space-y-3">
              <li>Brown the beef cubes in olive oil.</li>
              <li>Sauté onions and carrots until softened.</li>
              <li>Deglaze with red wine, add stock and herbs.</li>
              <li>Simmer on low heat for 2 hours.</li>
              <li>Serve with mashed potatoes or crusty bread.</li>
            </ol>
          </div>
          </article>
          <div className="mt-12">
            <h2 className="text-2xl font-serif font-semibold mb-6">Other Recipes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {OtherRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
