const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipesRouter = require("./recipe.js");
const dietRouter = require("./diets.js");

const router = Router();
router.use("/recipes", recipesRouter);
router.use("/diets", dietRouter);
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
