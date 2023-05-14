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
    console.log(`Error getNotification: ${err}`);
  }
};

export const addNotification = async (knex, req) => {
  try {
    await knex
      .insert({
        user_id: req.body.userId,
        likes: {},
        added: req.body.added,
      })
      .into("notification");
  } catch (err) {
    console.log(`Error addNotificiation: ${err}`);
  }
};

export const updateNotification = async (knex, req) => {
  try {
    await knex
      .update({
        likes: req.body.likes,
        added: req.body.added,
      })
      .where({ user_id: req.body.userId })
      .into("notification");
  } catch (err) {
    console.log(`Error updateNotification: ${err}`);
  }
};

export const deleteNotification = async (knex, req) => {
  try {
    await knex
      .delete()
      .where({ user_id: req.query.userId })
      .into("notification");
  } catch (err) {
    console.log(`Error deleteNotification: ${err}`);
  }
};
