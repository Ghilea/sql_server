export const getPokemon = async (knex, res, id) => {
  try {
    await knex
      .select(
        "id",
        "name",
        "image",
        "weight",
        "abilities",
        "stats",
        "type"
      )
      .where("id", id)
      .from("pokemons")
      .then((query) => {
        return res.code(200).send(query);
      });
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

export const getPokemons = async (knex, res) => {
  try {
    await knex
      .select("id", "name", "image", "weight", "abilities", "stats", "type")
      .from("pokemons")
      .then((query) => {
        return res.code(200).send(query);
      });
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

export const addPokemons = async (knex, req) => {
  console.log(req)
  try {
    await knex
      .insert({
        name: req.body.name,
        image: req.body.image,
        weight: req.body.weight,
        abilities: req.body.abilities,
        stats: req.body.stats,
        type: req.body.type
      })
      .into("pokemons");
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};