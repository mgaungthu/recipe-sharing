"use client";

import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import Layout from "../../components/Layout";
import { colors } from "../../theme";
import axiosInstance from "@/lib/axios"; 
import { ROUTES } from "@/utils/routes";

export default function CreateRecipePage() {
  const [formData, setFormData] = useState({
    title: "Spaghetti Carbonara",
    description:
      "A classic Italian pasta dish with creamy egg sauce, pancetta, and parmesan.",
    instructions:
      "1. Cook pasta until al dente.\n2. Fry pancetta until crispy.\n3. Mix eggs and cheese in a bowl.\n4. Toss pasta with pancetta, then stir in egg mixture.\n5. Serve with extra parmesan and black pepper.",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    difficulty: "Medium",
    category: "Dinner",
    cuisine: "Italian",
  });

  const [images, setImages] = useState<string[]>([
    "https://example.com/carbonara1.jpg",
  ]);
  const [tags, setTags] = useState<string[]>(["pasta", "italian"]);
  const [ingredients, setIngredients] = useState([
    { name: "Spaghetti", quantity: 400, unit: "g", notes: "" },
    { name: "Pancetta", quantity: 150, unit: "g", notes: "" },
    { name: "Eggs", quantity: 2, unit: "pcs", notes: "" },
    { name: "Parmesan cheese", quantity: 50, unit: "g", notes: "Grated" },
  ]);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleArrayChange = (
    setter: React.Dispatch<React.SetStateAction<any[]>>,
    index: number,
    value: any
  ) => {
    setter((prev) => {
      const newArr = [...prev];
      newArr[index] = value;
      return newArr;
    });
  };

  const handleAddField = (setter: React.Dispatch<React.SetStateAction<any[]>>, initial: any = "") => {
    setter((prev) => [...prev, initial]);
  };

  const handleRemoveField = (
    setter: React.Dispatch<React.SetStateAction<any[]>>,
    index: number
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const cleanImages = images.filter((img) => img.trim() !== "");
    const cleanTags = tags.filter((tag) => tag.trim() !== "");
    const payload = {
      title: formData.title,
      description: formData.description,
      instructions: formData.instructions,
      prepTime: Number(formData.prepTime),
      cookTime: Number(formData.cookTime),
      servings: Number(formData.servings),
      difficulty: formData.difficulty || "Easy",
      category: formData.category,
      cuisine: formData.cuisine,
      images: cleanImages,
      tags: cleanTags,
      ingredients: ingredients.map((i) => ({
        name: i.name,
        quantity: Number(i.quantity),
        unit: i.unit,
        notes: i.notes || "",
      })),
    };

    try {
      const { data } = await axiosInstance.post(ROUTES.RECIPE.CREATE, payload);
      alert("✅ Recipe created successfully!");
      console.log("Recipe created:", data);
    } catch (error: any) {
      console.error("❌ Create recipe error:", error);
      const message =
        error.response?.data?.message ||
        error.message ||
        "Unknown error occurred.";
      alert("Failed to create recipe: " + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[70vh] px-6 pt-10">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
          <h2
            className="text-2xl font-bold text-center mb-6"
            style={{ color: colors.primary }}
          >
            Create a Recipe
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block mb-2 font-medium" style={{ color: colors.textPrimary }}>
                Recipe Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ borderColor: colors.primary }}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 font-medium" style={{ color: colors.textPrimary }}>
                Short Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ borderColor: colors.primary }}
              />
            </div>

            {/* Prep Time */}
            <div>
              <label className="block mb-2 font-medium" style={{ color: colors.textPrimary }}>
                Prep Time (minutes)
              </label>
              <input
                type="number"
                name="prepTime"
                value={formData.prepTime}
                onChange={handleChange}
                min={0}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ borderColor: colors.primary }}
              />
            </div>

            {/* Cook Time */}
            <div>
              <label className="block mb-2 font-medium" style={{ color: colors.textPrimary }}>
                Cook Time (minutes)
              </label>
              <input
                type="number"
                name="cookTime"
                value={formData.cookTime}
                onChange={handleChange}
                min={0}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ borderColor: colors.primary }}
              />
            </div>

            {/* Servings */}
            <div>
              <label className="block mb-2 font-medium" style={{ color: colors.textPrimary }}>
                Servings
              </label>
              <input
                type="number"
                name="servings"
                value={formData.servings}
                onChange={handleChange}
                min={1}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ borderColor: colors.primary }}
              />
            </div>

            {/* Difficulty */}
            <div>
              <label className="block mb-2 font-medium" style={{ color: colors.textPrimary }}>
                Difficulty
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ borderColor: colors.primary }}
              >
                <option value="">Select difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            {/* Category */}
            <div>
              <label className="block mb-2 font-medium" style={{ color: colors.textPrimary }}>
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ borderColor: colors.primary }}
              >
                <option value="">Select category</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Snack">Snack</option>
                <option value="Dessert">Dessert</option>
                <option value="Drink">Drink</option>
              </select>
            </div>

            {/* Cuisine */}
            <div>
              <label className="block mb-2 font-medium" style={{ color: colors.textPrimary }}>
                Cuisine
              </label>
              <select
                name="cuisine"
                value={formData.cuisine}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ borderColor: colors.primary }}
              >
                <option value="">Select cuisine</option>
                <option value="Italian">Italian</option>
                <option value="Chinese">Chinese</option>
                <option value="Mexican">Mexican</option>
                <option value="Indian">Indian</option>
                <option value="French">French</option>
              </select>
            </div>

            {/* Images */}
            <div>
              <label className="block mb-2 font-medium" style={{ color: colors.textPrimary }}>
                Images (URLs)
              </label>
              {images.map((img, index) => (
                <div key={index} className="flex mb-2 gap-2 items-center">
                  <input
                    type="text"
                    value={img}
                    onChange={(e) => handleArrayChange(setImages, index, e.target.value)}
                    placeholder="https://img.jpg"
                    className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.primary }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField(setImages, index)}
                    disabled={images.length === 1}
                    className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-md disabled:opacity-50"
                  >
                    <FaTrash />
                  </button>
                  {index === images.length - 1 && (
                    <button
                      type="button"
                      onClick={() => handleAddField(setImages)}
                      className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-md"
                    >
                      <FaPlus />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Tags */}
            <div>
              <label className="block mb-2 font-medium" style={{ color: colors.textPrimary }}>
                Tags
              </label>
              {tags.map((tag, index) => (
                <div key={index} className="flex mb-2 gap-2 items-center">
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => handleArrayChange(setTags, index, e.target.value)}
                    placeholder="vegetarian"
                    className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.primary }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField(setTags, index)}
                    disabled={tags.length === 1}
                    className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-md disabled:opacity-50"
                  >
                    <FaTrash />
                  </button>
                  {index === tags.length - 1 && (
                    <button
                      type="button"
                      onClick={() => handleAddField(setTags)}
                      className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-md"
                    >
                      <FaPlus />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Ingredients */}
            <div>
              <label className="block mb-2 font-medium" style={{ color: colors.textPrimary }}>
                Ingredients
              </label>
              <div className="space-y-2">
                {ingredients.map((ing, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <input
                      type="text"
                      value={ing.name}
                      onChange={(e) =>
                        handleArrayChange(
                          setIngredients,
                          index,
                          { ...ing, name: e.target.value }
                        )
                      }
                      placeholder="Ingredient name"
                      className="px-2 py-1 border rounded-md w-[30%] focus:outline-none focus:ring-2"
                      style={{ borderColor: colors.primary }}
                    />
                    <input
                      type="number"
                      value={ing.quantity}
                      min={0}
                      onChange={(e) =>
                        handleArrayChange(
                          setIngredients,
                          index,
                          { ...ing, quantity: e.target.value }
                        )
                      }
                      placeholder="Qty"
                      className="px-2 py-1 border rounded-md w-[15%] focus:outline-none focus:ring-2"
                      style={{ borderColor: colors.primary }}
                    />
                    <input
                      type="text"
                      value={ing.unit}
                      onChange={(e) =>
                        handleArrayChange(
                          setIngredients,
                          index,
                          { ...ing, unit: e.target.value }
                        )
                      }
                      placeholder="Unit"
                      className="px-2 py-1 border rounded-md w-[15%] focus:outline-none focus:ring-2"
                      style={{ borderColor: colors.primary }}
                    />
                    <input
                      type="text"
                      value={ing.notes}
                      onChange={(e) =>
                        handleArrayChange(
                          setIngredients,
                          index,
                          { ...ing, notes: e.target.value }
                        )
                      }
                      placeholder="Notes"
                      className="px-2 py-1 border rounded-md w-[25%] focus:outline-none focus:ring-2"
                      style={{ borderColor: colors.primary }}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveField(setIngredients, index)}
                      disabled={ingredients.length === 1}
                      className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-md disabled:opacity-50"
                    >
                      <FaTrash />
                    </button>
                    {index === ingredients.length - 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          handleAddField(setIngredients, {
                            name: "",
                            quantity: "",
                            unit: "",
                            notes: "",
                          })
                        }
                        className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-md"
                      >
                        <FaPlus />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div>
              <label className="block mb-2 font-medium" style={{ color: colors.textPrimary }}>
                Instructions
              </label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                rows={5}
                placeholder="Step 1: Mix flour and eggs..."
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                style={{ borderColor: colors.primary }}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 rounded-md font-semibold text-white transition"
              style={{
                backgroundColor: loading ? "#ccc" : colors.primary,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Saving..." : "Save Recipe"}
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
}