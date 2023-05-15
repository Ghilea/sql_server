export const getPokemon = async (knex, req) => {
  try {
    return await knex
      .select(
        "id",
        "name",
        "image",
        "weight",
        "height",
        "abilities",
        "stats",
        "type"
      )
      .where("id", req.query.pokemonId)
      .from("pokemons");
  } catch (err) {
    console.log(`Error getPokemon: ${err}`);
  }
};

export const getPokemons = async (knex, req) => {
  try {
    return await knex
      .select(
        "id",
        "name",
        "image",
        "weight",
        "height",
        "abilities",
        "stats",
        "type"
      )
      .where("name", "like", `%${req.query.search}%`)
      .orWhere("id", "like", `%${req.query.search}%`)
      .from("pokemons")
      .orderBy(`${req.query.sort}`, `${req.query.order}`);
  } catch (err) {
    console.log(`Error getPokemons: ${err}`);
  }
};

export const addPokemons = async (knex, req) => {
  try {
    await knex
      .insert({
        name: req.body.name,
        image: req.body.image,
        height: req.body.height,
        weight: req.body.weight,
        abilities: req.body.abilities,
        stats: req.body.stats,
        type: req.body.type,
      })
      .into("pokemons");
  } catch (err) {
    console.log(`Error addPokemons: ${err}`);
  }
};
