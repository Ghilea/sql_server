import Fastify from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { FetchApi } from "./server/Api.js";
import fs from "fs";

dotenv.config();

const app = Fastify({
  logger: false,
  https: {
    key: fs.readFileSync("./cert/privkey.pem", "utf8"),
    cert: fs.readFileSync("./cert/cert.pem", "utf8"),
    ca: fs.readFileSync("./cert/chain.pem", "utf8"),
  },
});

await app.register(cors, {});

FetchApi(app);

const startServer = async () => {

  process.env.TZ = "Europe/Stockholm";

  try {
    await app
      .listen({ port: process.env.PORT, host: "0.0.0.0" })
      .then((address) => {
        const nDate = new Date().toLocaleString("sv-SE", {
          timeZone: "Europe/Stockholm",
        });
        console.log(`Server listening at: ${address} (${nDate})`);
      });
  } catch (err) {
    console.error(`Error: ${err}`);
    process.exit(1);
  }
};

startServer();
