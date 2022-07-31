import * as coda from "@codahq/packs-sdk";

export const RecipeSchema = coda.makeObjectSchema({
  properties: {
    recipeId: { type: coda.ValueType.String, fromKey: "idMeal" },
    name: { type: coda.ValueType.String, fromKey: "strMeal" },
    instructions: { type: coda.ValueType.String, fromKey: "strInstructions" },
    ingredients: { type: coda.ValueType.String, fromKey: "strIngredients" },
    category: { type: coda.ValueType.String, fromKey: "strCategory" },
    area: { type: coda.ValueType.String, fromKey: "strArea" },
    youtube: { type: coda.ValueType.String, fromKey: "strYoutube" },
    source: { type: coda.ValueType.String, fromKey: "strSource" },
    image: { type: coda.ValueType.String, fromKey: "strImageSource" },
    thumbnail: { type: coda.ValueType.String, fromKey: "strMealThumb" },
    tags: { type: coda.ValueType.String, fromKey: "strTags" },
  },
  displayProperty: "name",
  idProperty: "recipeId",
  featuredProperties: ["instructions", "category", "area"],
});

export const CategorySchema = coda.makeObjectSchema({
  properties: {
    categoryId: { type: coda.ValueType.String, fromKey: "idCategory" },
    name: { type: coda.ValueType.String, fromKey: "strCategory" },
    thumbnail: { type: coda.ValueType.String, fromKey: "strCategoryThumb" },
    description: { type: coda.ValueType.String, fromKey: "strCategoryDescription" },
  },
  displayProperty: "name",
  idProperty: "categoryId",
  featuredProperties: ["description", "thumbnail"],
});

export const AreaSchema = coda.makeObjectSchema({
  properties: {
    name: { type: coda.ValueType.String, fromKey: "strArea" },
  },
  displayProperty: "name",
});

export const IngredientSchema = coda.makeObjectSchema({
  properties: {
    ingredientId: { type: coda.ValueType.String, fromKey: "idIngredient" },
    name: { type: coda.ValueType.String, fromKey: "strIngredient" },
    description: { type: coda.ValueType.String, fromKey: "strDescription" },
  },
  displayProperty: "name",
  idProperty: "ingredientId",
  featuredProperties: ["description"],
});
