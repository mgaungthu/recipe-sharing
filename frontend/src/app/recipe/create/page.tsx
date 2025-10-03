"use client";

import { useState } from "react";
import Layout from "../../components/Layout";
import { colors } from "../../theme";

export default function CreateRecipePage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    instructions: "",
    prepTime: 0,
    cookTime: 0,
    servings: 1,
    difficulty: "",
    category: "",
    cuisine: "",
  });

  const [images, setImages] = useState<string[]>([""]);
  const [tags, setTags] = useState<string[]>([""]);
  const [ingredients, setIngredients] = useState<string[]>([""]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  // Handlers for dynamic arrays
  const handleArrayChange = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    value: string
  ) => {
    setter((prev) => {
      const newArr = [...prev];
      newArr[index] = value;
      return newArr;
    });
  };

  const handleAddField = (setter: React.Dispatch<React.SetStateAction<string[]>>) => {
    setter((prev) => [...prev, ""]);
  };

  const handleRemoveField = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) => {
    setter((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: connect to backend API
    const finalData = {
      ...formData,
      images: images.filter((img) => img.trim() !== ""),
      tags: tags.filter((tag) => tag.trim() !== ""),
      ingredients: ingredients.filter((ing) => ing.trim() !== ""),
    };
    console.log("Submit Recipe:", finalData);
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
                <option value="Dessert">Dessert</option>
                <option value="Main Course">Main Course</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Salad">Salad</option>
                <option value="Soup">Soup</option>
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
                <div key={index} className="flex mb-2 gap-2">
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
                    className="px-3 py-2 bg-red-500 text-white rounded-md disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddField(setImages)}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Add Image
              </button>
            </div>

            {/* Tags */}
            <div>
              <label className="block mb-2 font-medium" style={{ color: colors.textPrimary }}>
                Tags
              </label>
              {tags.map((tag, index) => (
                <div key={index} className="flex mb-2 gap-2">
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
                    className="px-3 py-2 bg-red-500 text-white rounded-md disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddField(setTags)}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Add Tag
              </button>
            </div>

            {/* Ingredients */}
            <div>
              <label className="block mb-2 font-medium" style={{ color: colors.textPrimary }}>
                Ingredients
              </label>
              {ingredients.map((ing, index) => (
                <div key={index} className="flex mb-2 gap-2">
                  <textarea
                    value={ing}
                    onChange={(e) => handleArrayChange(setIngredients, index, e.target.value)}
                    rows={2}
                    placeholder="1 cup flour, 2 eggs..."
                    className="flex-grow px-4 py-2 border rounded-md focus:outline-none focus:ring-2"
                    style={{ borderColor: colors.primary }}
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField(setIngredients, index)}
                    disabled={ingredients.length === 1}
                    className="px-3 py-2 bg-red-500 text-white rounded-md disabled:opacity-50"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddField(setIngredients)}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Add Ingredient
              </button>
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
              className="w-full py-2 rounded-md font-semibold text-white transition"
              style={{ backgroundColor: colors.primary }}
            >
              Save Recipe
            </button>
          </form>

          {/* Future AI Generator */}
          {/* <div className="mt-8 text-center">
            <button
              type="button"
              className="px-6 py-2 rounded-md font-semibold text-white"
              style={{ backgroundColor: colors.secondary }}
              onClick={() => alert("AI Recipe Generator Coming Soon!")}
            >
              Generate with AI 🤖
            </button>
          </div> */}
        </div>
      </div>
    </Layout>
  );
}