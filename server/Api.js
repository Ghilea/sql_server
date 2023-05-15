import Knex from "knex";
import {
  getUser,
  getUsers,
  createAccount,
  updateUser,
  updateLoginDate,
} from "./api/users.js";
import { getLike, getLikes, getOtherLikes, deleteLike, addLike } from "./api/likes.js";
import {
  getNotification,
  addNotification,
  deleteNotification,
  updateNotification,
} from "./api/notification.js";
import { getPokemon, getPokemons, addPokemons, getAllPokemons } from "./api/pokemons.js";

export const FetchApi = (app) => {
  try {
    //create connection
    const knex = Knex({
      client: "mysql2",
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
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
      return getUsers(knex, res);
    });

    app.get("/getUser", (req, res) => {
      return getUser(knex, req);
    });

    app.patch("/updateLoginDate", (req, res) => {
      updateLoginDate(knex, req);
    });

    //pokemons
    app.get("/getPokemons", async (req, res) => {
      return getPokemons(knex, req);
    });

    app.get("/getPokemon", async (req, res) => {
      return getPokemon(knex, req);
    });

    app.get("/getAllPokemons", async (req, res) => {
      return getAllPokemons(knex, req);
    });

    app.post("/addPokemons", async (req, res) => {
      addPokemons(knex, req);
    });

    //Likes
    app.post("/addLike", (req, res) => {
      addLike(knex, req);
    });

    app.delete("/deleteLike", (req, res) => {
      deleteLike(knex, req);
    });

    app.get("/getLike", (req, res) => {
      return getLike(knex, req);
    });

    app.get("/getLikes", (req, res) => {
      return getLikes(knex, req);
    });

    app.get("/getOtherLikes", (req, res) => {
      return getOtherLikes(knex, req);
    });

    //notification
    app.post("/addNotification", (req, res) => {
      addNotification(knex, req);
    });

    app.delete("/deleteNotification", (req, res) => {
      deleteNotification(knex, req);
    });

    app.get("/getNotification", (req, res) => {
      return getNotification(knex, req);
    });

    app.patch("/updateNotification", (req) => {
      updateNotification(knex, req);
    });
  } catch (err) {
    console.error(`Error: ${err}`);
    process.exit(1);
  }
};
