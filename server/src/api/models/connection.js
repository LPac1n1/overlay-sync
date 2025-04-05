import pkg from "pg";
const { Client } = pkg;

import dotenv from "dotenv";
dotenv.config();

const client = new Client({
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
});

client
  .connect()
  .then(() => console.log("Conectado ao PostgreSQL!"))
  .catch((err) => console.error("Erro ao conectar ao PostgreSQL:", err));

export default client;
