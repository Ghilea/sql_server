export const getUser = async (knex, res, id) => {
  try {
    await knex
      .select(
        "username",
        "email",
        "password",
        "lastLogin"
      )
      .where("id", id)
      .from("users")
      .then((query) => {
        return res.code(200).send(query);
      });
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

export const getUsers = async (knex, res) => {
  try {
    await knex
      .select("username", "email", "lastLogin")
      .from("users")
      .then((query) => {
        return res.code(200).send(query);
      });
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
        lastLogin: req.body.lastLogin
      })
      .into("users")
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
        password: req.body.password
      })
      .where({ id: req.body.id })
      .into("users")
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
