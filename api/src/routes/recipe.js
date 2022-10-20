const { Router } = require("express");
const { Recipe, Diets } = require("../db");
const router = Router();
const { getAll, getIdRecipes } = require("../controller/recipes");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {
  const { name } = req.query;
  const dbRecipes = await getAll();
  try {
    if (name) {
      const resultFind = dbRecipes.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );
      if (resultFind.length === 0) {
        return res.status(404).send({ message: "No recipes found" });
      }
      return res.send(resultFind);
    } else {
      return res.send(dbRecipes);
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const idRecipes = await getIdRecipes(id);
  return res.send(idRecipes);
});

router.post("/", async (req, res) => {
  const {
    name,
    summary,
    readyInMinutes,
    cuisines,
    dishTypes,
    steps,
    healthScore,
    image,
    diets,
  } = req.body;

  try {
    const newRecipe = await Recipe.create({
      name,
      summary,
      readyInMinutes,
      steps,
      cuisines,
      dishTypes,
      healthScore,
      image,
    });
    let getDiets = await Diets.findAll({
      where: {
        name: diets,
      },
    });
    if (!name)
      return res
        .status(400)
        .send({ error: "You must complete the required fields" });
    if (!summary)
      return res
        .status(400)
        .send({ error: "You must complete the required fields" });

    newRecipe.addDiet(getDiets);
    return res.status(201).send(newRecipe);
  } catch (error) {
    console.log(error);
  }
});
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Recipe.destroy({
    where: {
      id,
    },
  })
    .then(() => {
      res.send("Recipe deleted");
    })
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;
