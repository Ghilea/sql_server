export const getLike = async (knex, res, id) => {
  try {
    await knex
      .select(
        "user_id",
        "pokemon_id",
        "added",
      )
      .where("user_id", userId, "pokemon_id", pokemon_id)
      .from("likes")
      .then((query) => {
        return res.code(200).send(query);
      });
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

export const getLikes = async (knex, res) => {
  try {
    await knex
      .select("user_id", "pokemon_id", "added")
      .from("likes")
      .then((query) => {
        return res.code(200).send(query);
      });
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

export const addLike = async (knex, req) => {
  try {
    await knex
      .insert({
        user_id: req.body.userId,
        pokemon_id: req.body.pokemon_id,
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