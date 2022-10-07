const { Router } = require("express");
const { Op, Character, Role } = require("../db");
const router = Router();

router.post("/", async (req, res) => {
  try {
    const { code, name, age, race, hp, mana, date_added } = req.body;

    if (!code || !name || !hp || !mana) {
      return res.status(404).send("Falta enviar datos obligatorios");
    }

    const newCharacter = await Character.create({
      code,
      name,
      age,
      race,
      hp,
      mana,
      date_added,
    });
    res.status(201).send(newCharacter);
  } catch (error) {
    res.status(404).send("Error en alguno de los datos provistos");
  }
});
router.get("/", async (req, res) => {
  try {
    const { race, name, hp, age } = req.query;

    const condition = {};
    const where = {};
    if (race) where.race = race;
    if (name) where.name = name;
    if (hp) where.hp = hp;
    if (age) where.age = age;
    condition.where = where;

    if (name || hp) {
      const characters = await Character.findAll({
        attributes: ["name", "hp"],
      });
      return res.status(200).send(characters);
    }

    const characters = await Character.findAll(condition);
    res.status(200).send(characters);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
router.get("/young", async (req, res) => {
  try {
    const youngs = await Character.findAll({
      where: {
        age: {
          [Op.lt]: 25,
        },
      },
    });
    res.status(200).send(youngs);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
router.get("/:code", async (req, res) => {
  try {
    const { code } = req.params;
    const character = await Character.findByPk(code);

    if (!character)
      throw new Error(
        `El código ${code} no corresponde a un personaje existente`
      );

    res.status(200).send(character);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
router.put("/:attribute", async (req, res) => {
  const { attribute } = req.params;
  const { value } = req.query;
  try {
    await Character.update(
      { [attribute]: value },
      { where: { [attribute]: null } }
    );
    res.status(201).send("Personajes actualizados");
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
