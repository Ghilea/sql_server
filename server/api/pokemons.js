export const getPokemon = async (knex, req) => {
  try {
    return await knex
      .select(
        "pokemonId",
        "name",
        "image",
        "weight",
        "height",
        "abilities",
        "stats",
        "type"
      )
      .where("pokemonId", req.query.pokemonId)
      .from("pokemons");
  } catch (err) {
    console.log(`Error getPokemon: ${err}`);
  }
};

export const getPokemons = async (knex, req) => {
  try {
    const offset = (req.query.page > 0 ? (req.query.page - 1) : 0) * 10;
    
    return await knex
      .select(
        "pokemonId",
        "name",
        "image",
        "weight",
        "height",
        "abilities",
        "stats",
        "type"
      )
      .where("name", "like", `%${req.query.search}%`)
      .orWhere("pokemonId", "like", `%${req.query.search}%`)
      .from("pokemons")
      .orderBy(`${req.query.sort}`, `${req.query.order}`)
      .offset(Number(offset))
      .limit(10);
  } catch (err) {
    console.log(`Error getPokemons: ${err}`);
  }
};

export const getAllPokemons = async (knex) => {
  try {
    return await knex.select("pokemonId").from("pokemons");
  } catch (err) {
    console.log(`Error getPokemons: ${err}`);
  }
};

export const addPokemons = async (knex, req) => {
  try {
    await knex
      .insert({
        pokemonId: req.body.pokemonId,
        name: req.body.name,
        image: req.body.image,
        height: req.body.height,
        weight: req.body.weight,
        abilities: req.body.abilities,
        stats: req.body.stats,
        type: req.body.type,
      })
      .whereNot("name", req.body.name)
      .into("pokemons");
  } catch (err) {
    console.log(`Error addPokemons: ${err}`);
  }
};
