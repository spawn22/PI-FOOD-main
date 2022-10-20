const { Router } = require("express");
const { Diets } = require("../db");
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", async (req, res) => {
  try {
    let typesDiet = await Diets.findAll();
    // console.log(typesDiet);
    res.status(200).json(typesDiet);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
