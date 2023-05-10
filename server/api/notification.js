export const getNotification = async (knex, req) => {
  try {
    return await knex
      .select(
        "likes",
        "added",
      )
      .where("user_id", req.query.userId)
      .from("notification")
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

export const addNotification = async (knex, req) => {
  try {
    await knex
      .insert({
        user_id: req.body.userId,
        likes: req.body.likes,
        added: req.body.added,
      })
      .into("notification");
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

export const updateNotification = async (knex, req, res) => {
  try {
    await knex
      .update({
        user_id: req.body.userId,
        likes: req.body.likes,
        added: req.body.added
      })
      .where({ id: req.body.id })
      .into("notification")
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

export const deleteNotification = async (knex, req, res) => {
  try {
    await knex
      .delete()
      .where({ id: req.body.id })
      .into("notification");
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};
