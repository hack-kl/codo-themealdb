import * as coda from "@codahq/packs-sdk";
import * as schemas from "./schemas";

export const pack = coda.newPack();

pack.addNetworkDomain("themealdb.com");

pack.addFormula({
  name: "RandomRecipe",
  description: "Lookup a single random meal.",
  parameters: [
    coda.makeParameter({
      type: coda.ParameterType.Date,
      name: "date",
      description: "The date of the random recipe.",
    }),
  ],
  cacheTtlSecs: 60,
  resultType: coda.ValueType.Object,
  schema: schemas.RecipeSchema,
  execute: async function ([], context) {
    let response = await context.fetcher.fetch({
      method: "GET",
      url: "https://www.themealdb.com/api/json/v1/1/random.php",
      cacheTtlSecs: 0,
    });
    let recipe = response.body.meals[0];

    let ingredients = "";
    for (let i = 1; i < 20; i++) {
      if (recipe["strMeasure" + i].trim() == "") break;
      if (i > 1) ingredients += ", ";
      ingredients += recipe["strMeasure" + i] + " " + recipe["strIngredient" + i];
    }
    recipe.strIngredients = ingredients;

    return recipe;
  },
});

pack.addFormula({
  name: "Categories",
  description: "List all meal categories.",
  parameters: [],
  cacheTtlSecs: 60,
  resultType: coda.ValueType.Array,
  items: schemas.CategorySchema,
  execute: async function ([], context) {
    let response = await context.fetcher.fetch({
      method: "GET",
      url: "https://www.themealdb.com/api/json/v1/1/categories.php",
    });
    let categories = response.body.categories;
    return categories;
  },
});

pack.addFormula({
  name: "Area",
  description: "List all area.",
  parameters: [],
  cacheTtlSecs: 60,
  resultType: coda.ValueType.Array,
  items: schemas.AreaSchema,
  execute: async function ([], context) {
    let response = await context.fetcher.fetch({
      method: "GET",
      url: "https://www.themealdb.com/api/json/v1/1/list.php?a=list",
    });
    let area = response.body.meals;
    return area;
  },
});

pack.addFormula({
  name: "Ingredients",
  description: "List all ingredients.",
  parameters: [],
  cacheTtlSecs: 60,
  resultType: coda.ValueType.Array,
  items: schemas.IngredientSchema,
  execute: async function ([], context) {
    let response = await context.fetcher.fetch({
      method: "GET",
      url: "https://www.themealdb.com/api/json/v1/1/list.php?i=list",
    });
    let ingredients = response.body.meals;
    return ingredients;
  },
});

pack.addColumnFormat({
  name: "Random Recipe",
  instructions:
    "Shows a random recipe of a date.",
  formulaName: "RandomRecipe",
});
