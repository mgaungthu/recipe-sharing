import { colors } from "../theme";

export default function CategoryCard({ name }: { name: string }) {
  return (
    <div
      className="bg-white shadow rounded-lg p-6 text-center hover:shadow-md cursor-pointer transition"
      style={{ color: colors.primary }}
    >
      {name}
    </div>
  );
}