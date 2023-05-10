export const getLike = async (knex, req) => {
  try {
   return await knex
     .select("user_id", "pokemon_id", "added")
     .where("user_id", req.query.userId, "pokemon_id", req.query.pokemonId)
     .from("likes")
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

export const getOwntLikes = async (knex, req) => {
  try {
    return await knex
      .select("user_id", "pokemon_id", "added")
      .where("user_id", req.query.userId)
      .from("likes");
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

export const getLikes = async (knex, req) => {
  try {

    const ownLikes = await getOwntLikes(knex, req);

    console.log(ownLikes)

    return await knex
      .select("user_id", "pokemon_id", "added")
      .whereNot("user_id", req.query.userId)
      .where()
      .from("likes");
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

export const addLike = async (knex, req) => {
  try {
    await knex
      .insert({
        user_id: req.body.userId,
        pokemon_id: req.body.pokemonId,
        added: req.body.added
      })
      .into("likes");
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

export const deleteLike = async (knex, req, res) => {
  try {
    await knex
      .delete()
      .where({ id: req.body.id })
      .into("likes")
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};