const axios = require("axios");
const { Recipe, Diets } = require("../db");
const { API_KEY } = process.env;

const getApiInfo = () => {
  return (
    axios
      //.get(
      //`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`
      //)

      .get(`https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`)
      .then((apiInfo) => {
        const resultFilter = apiInfo.data.results.map((e) => {
          return {
            id: e.id,
            name: e.title,
            summary: e.summary,
            readyInMinutes: e.readyInMinutes,
            cuisines: e.cuisines?.map((element) => element),
            dishTypes: e.dishTypes?.map((element) => element),
            image: e.image,
            healthScore: e.healthScore,
            steps: e.analyzedInstructions[0]?.steps.map((e) => {
              return {
                number: e.number,
                step: e.step,
              };
            }),
            diets: e.diets,
          };
        });
        return resultFilter;
      })
      .catch((error) => {
        console.error(error);
        return [];
      })
  );
};

const getDBInfo = async () => {
  try {
    const dataDB = await Recipe.findAll({
      include: {
        model: Diets,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    const resultFilter = dataDB.map((e) => {
      return {
        id: e.id,
        name: e.name,
        summary: e.summary,
        readyInMinutes: e.readyInMinutes,
        healthScore: e.healthScore,
        cuisines: e.cuisines?.map((element) => element),
        image: e.image,
        dishTypes: e.dishTypes?.map((element) => element),
        diets: e.diets.map((e) => e.name),
        steps: e.steps,
        created: e.created,
      };
    });
    return resultFilter;
  } catch (error) {
    console.error(error);
  }
};

const getIdRecipes = async (id) => {
  if (id.length > 15) {
    try {
      const resultFind = await Recipe.findByPk(id, {
        include: {
          model: Diets,
          attributes: ["name"],
        },
      });
      return {
        name: resultFind.name,
        summary: resultFind.summary,
        readyInMinutes: resultFind.readyInMinutes,
        healthScore: resultFind.healthScore,
        cuisines: resultFind.cuisines?.map((element) => element),
        dishTypes: resultFind.dishTypes?.map((e) => e),
        diets: resultFind.diets?.map((e) => e.name),
        steps: resultFind.steps,
        image: resultFind.image,
      };
    } catch (error) {
      console.error(error);
      return "error";
    }
  } else {
    try {
      const recipeIdApi = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`
      );
      return {
        name: recipeIdApi.data.title,
        summary: recipeIdApi.data.summary,
        readyInMinutes: recipeIdApi.data.readyInMinutes,
        cuisines: recipeIdApi.data.cuisines?.map((element) => element),
        dishTypes: recipeIdApi.data.dishTypes?.map((element) => element),
        healthScore: recipeIdApi.data.healthScore,
        diets: recipeIdApi.data.diets,
        steps: recipeIdApi.data.analyzedInstructions[0]?.steps.map((e) => {
          return {
            number: e.number,
            step: e.step,
          };
        }),
        image: recipeIdApi.data.image,
      };
    } catch (error) {
      console.error(error);
      return "error";
    }
  }
};

const getAll = async () => {
  const apiInfo = await getApiInfo();
  const dbRecipes = await getDBInfo();
  const concat = apiInfo.concat(dbRecipes);
  return concat;
};

module.exports = {
  getAll,
  getIdRecipes,
};
