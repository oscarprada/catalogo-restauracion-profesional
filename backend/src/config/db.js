import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "albanta26",
  database: "catalogo_restauracion",
});

export async function query(text, params) {
  return pool.query(text, params);
}

export default pool;
