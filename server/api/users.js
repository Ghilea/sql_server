export const getUser = async (knex, req) => {
  try {
    return await knex
      .select("id", "username", "email", "password", "lastLogin")
      .where("id", req.query.userId)
      .from("users");
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

export const getUsers = async (knex, res) => {
  try {
    return await knex
      .select("id", "username", "email", "password", "lastLogin")
      .from("users")
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

export const createAccount = async (knex, req) => {
  try {
    await knex
      .insert({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        lastLogin: req.body.lastLogin,
      })
      .into("users");
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

export const updateUser = async (knex, req, res) => {
  try {
    await knex
      .update({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      })
      .where({ id: req.body.id })
      .into("users");
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

export const updateLoginDate = async (knex, req, res) => {
  try {
    await knex
      .update({
        lastLogin: req.body.lastLogin,
      })
      .where({ id: req.body.id })
      .into("users");
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};
