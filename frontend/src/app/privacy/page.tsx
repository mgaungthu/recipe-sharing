import Layout from "@/app/components/Layout";

export default function PrivacyPolicyPage() {
  return (
    <Layout>
      <div className="bg-[#fdfcf8] min-h-screen flex justify-center px-6 py-12">
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md p-10">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-6">
            Privacy Policy
          </h1>

          <p className="text-gray-700 leading-relaxed mb-6">
            At Recipe Sharing, your privacy is important to us. This Privacy
            Policy explains how we collect, use, and protect your information
            when you use our website and services.
          </p>

          <h2 className="text-2xl font-serif font-semibold mb-3">Information We Collect</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            We may collect information such as your name, email address, and
            browsing behavior when you use our platform. This helps us improve
            your experience and provide better content.
          </p>

          <h2 className="text-2xl font-serif font-semibold mb-3">How We Use Your Information</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            The information collected is used to enhance your user experience,
            send updates, and ensure the security of our platform. We do not
            sell your information to third parties.
          </p>

          <h2 className="text-2xl font-serif font-semibold mb-3">Your Rights</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            You have the right to access, update, or delete your personal data
            at any time. Please contact us if you would like to exercise these
            rights.
          </p>

          <h2 className="text-2xl font-serif font-semibold mb-3">Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions about this Privacy Policy, please reach
            out to us at{" "}
            <a
              href="mailto:hello@recipesite.com"
              className="text-indigo-600 hover:underline"
            >
              hello@recipesite.com
            </a>
            .
          </p>
        </div>
      </div>
    </Layout>
  );
}