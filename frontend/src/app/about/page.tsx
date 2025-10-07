import Layout from "@/app/components/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <div className="bg-[#fdfcf8] min-h-screen flex justify-center px-6 py-12">
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md p-10">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-6">
            About Us
          </h1>
          <p className="text-gray-700 leading-relaxed mb-6">
            Welcome to our Recipe Sharing platform — a place crafted with love
            for foodies, chefs, and anyone who believes that great meals bring
            people together. Our mission is simple: to inspire your cooking
            journey with carefully curated recipes from around the world.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            Whether you are a passionate home cook or just starting out, we aim
            to provide easy-to-follow recipes, classic gourmet dishes, and tips
            that make your kitchen experience joyful and rewarding.
          </p>
          <p className="text-gray-700 leading-relaxed mb-6">
            We believe in community-driven creativity, where sharing your own
            recipes can inspire others to try something new. Together, we
            celebrate the art of cooking and the joy of delicious food.
          </p>

          <h2 className="text-2xl font-serif font-semibold mt-10 mb-4">
            Our Vision
          </h2>
          <p className="text-gray-700 leading-relaxed">
            To create a classic, premium platform for food lovers — where every
            recipe tells a story, every dish inspires connection, and every
            foodie feels at home.
          </p>
        </div>
      </div>
    </Layout>
  );
}