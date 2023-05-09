import Knex from "knex";
import {
  getUser,
  getUsers,
  createAccount,
  updateUser,
  updateLoginDate
} from "./api/users.js";
import { getLike, getLikes, deleteLike, addLike } from "./api/likes.js";
import { getNotification, addNotification, deleteNotification, updateNotification } from "./api/notification.js";
import { getPokemon, getPokemons, addPokemons } from "./api/pokemons.js";

export const FetchApi = (app) => {
  try {
    //create connection
    const knex = Knex({
      client: "mysql2",
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE
      },
    });

    //get
    app.get("/", () => {
      return `| Api server up and running |`;
    });

    //users
    app.post("/createAccount", (req, res) => {
      createAccount(knex, req);
    });

    app.get("/getUsers", (req, res) => {
      getUsers(knex, res);
    });

    app.get("/getUser", (req, res) => {
      getUser(knex, res);
    });

    app.put("/updateLoginDate", (req, res) => {
      updateLoginDate(knex, req, res);
    });

    //pokemons
    app.get("/getPokemons", (req, res) => {
      getPokemons(knex, res);
      res.json({message: "Pokemons fetched"})
    });

    app.post("/getPokemon", (req, res) => {
      getPokemon(knex, res);
    });

    app.get("/addPokemons", (req, res) => {
      addPokemons(knex, req);
    });

    //Likes
    app.post("/addLike", (req, res) => {
      addLike(knex, req);
    });

    app.put("/deleteLike", (req, res) => {
      deleteLike(knex, req, res);
    });

    app.get("/getLike", (req, res) => {
      getLike(knex, res);
    });

    app.get("/getLikes", (req, res) => {
      getLikes(knex, res);
    });

    //notification
    app.post("/addNotification", (req, res) => {
      addNotification(knex, req);
    });

    app.put("/deleteNotification", (req, res) => {
      deleteNotification(knex, req, res);
    });

    app.get("/getNotification", (req, res) => {
      getNotification(knex, res);
    });

    app.get("/updateNotification", (req, res) => {
      updateNotification(knex, res);
    });
  } catch (err) {
    console.error(`Error: ${err}`);
    process.exit(1);
  }
};
