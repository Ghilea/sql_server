import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { FetchApi } from "./Api.js";

dotenv.config();

const app = Fastify({ logger: false });

await app.register(cors, {});

FetchApi(app);

const startServer = async () => {
  try {
    await app.listen({ port: process.env.PORT }).then((address) => {
      console.log(`Server listening at: ${address}`);
    });
  } catch (err) {
    console.error(`Error: ${err}`);
    process.exit(1);
  }
};

startServer();