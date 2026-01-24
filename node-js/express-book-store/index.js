import db from "./src/index.js";
import { usersTable } from "./src/db/schema.js";

const createUser = async ({ id, name, age, email }) => {
  await db.insert(usersTable).values({
    name,
    age,
    email,
  });
};

await createUser({ name: "shivanand", age: 28, email: "shivanand@gmail.com" });
await createUser({ name: "neha", age: 26, email: "neha@gmail.com" });

const getAllUsers = async () => {
  const users = await db.select().from(usersTable);
  console.log("users: ", users);
};

await getAllUsers();
