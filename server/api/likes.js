export const getLike = async (knex, req) => {
  try {
    return await knex
      .select("id", "user_id", "pokemon_id", "added")
      .where("user_id", req.query.userId)
      .andWhere("pokemon_id", req.query.pokemonId)
      .from("likes");
  } catch (err) {
    console.log(`Error getLike: ${err}`);
  }
};

export const getLikes = async (knex, req) => {
  try {
    return await knex
      .select("user_id", "pokemon_id", "added")
      .where("user_id", req.query.userId)
      .from("likes");
  } catch (err) {
    console.log(`Error getLikes: ${err}`);
  }
};

export const getOtherLikes = async (knex, req) => {
  try {
    return await knex
      .raw(
        `SELECT other.id, other.user_id, other.pokemon_id, other.added FROM pokedex.likes as user
          INNER JOIN pokedex.likes as other ON other.user_id != ${req.query.userId}
        WHERE user.pokemon_id = other.pokemon_id AND user.added >= '${req.query.lastLogin}'`
      )
  } catch (err) {
    console.log(`Error getOtherLikes: ${err}`);
  }
};

export const addLike = async (knex, req) => {
  try {
    await knex
      .insert({
        user_id: req.body.userId,
        pokemon_id: req.body.pokemonId,
        added: req.body.added,
      })
      .whereNot("user_id", req.body.userId)
      .andWhereNot("pokemon_id", req.body.pokemonId)
      .into("likes");
  } catch (err) {
    console.log(`Error addLike: ${err}`);
  }
};

export const deleteLike = async (knex, req) => {
  try {
    await knex.delete().where({ id: req.query.id }).into("likes");
  } catch (err) {
    console.log(`Error deleteLike: ${err}`);
  }
};
