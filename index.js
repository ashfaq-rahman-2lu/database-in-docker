import pg from "pg";

const { Client } = pg;

const client = new Client({
  host: "localhost",
  port: 5433,
  user: "appuser",
  password: "apppassword",
  database: "appdb",
});

async function runCrudDemo() {
  await client.connect();
  console.log("Connected to PostgreSQL on localhost:5433\n");

  // CREATE
  const insertResult = await client.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    ["Charlie", "charlie@example.com"]
  );
  console.log("CREATE:", insertResult.rows[0]);

  // READ
  const readResult = await client.query(
    "SELECT id, name, email, created_at FROM users ORDER BY id"
  );
  console.log("\nREAD:", readResult.rows);

  // UPDATE
  const updateResult = await client.query(
    "UPDATE users SET name = $1 WHERE email = $2 RETURNING *",
    ["Charlie Updated", "charlie@example.com"]
  );
  console.log("\nUPDATE:", updateResult.rows[0]);

  // DELETE
  const deleteResult = await client.query(
    "DELETE FROM users WHERE email = $1 RETURNING *",
    ["charlie@example.com"]
  );
  console.log("\nDELETE:", deleteResult.rows[0]);

  await client.end();
  console.log("\nConnection closed.");
}

runCrudDemo().catch((error) => {
  console.error("Error:", error.message);
  process.exit(1);
});
