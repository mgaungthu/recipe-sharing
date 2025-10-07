import Layout from "@/app/components/Layout";

export default function ContactPage() {
  return (
    <Layout>
      <div className="bg-[#fdfcf8] min-h-screen flex justify-center px-6 py-12">
        <div className="max-w-xl w-full bg-white rounded-2xl shadow-md p-10 text-center">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-gray-700 mb-4">
            We'd love to hear from you! Reach out to us at:
          </p>
          <a
            href="mailto:hello@recipesite.com"
            className="text-lg font-semibold text-indigo-600 hover:underline"
          >
            hello@recipesite.com
          </a>
        </div>
      </div>
    </Layout>
  );
}