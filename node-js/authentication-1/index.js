import express from "express";
import userRouter from "./routes/user.route.js";
import db from "./src/index.js";
import { sessionTable, usersTable } from "./src/db/schema.js";
import { eq } from "drizzle-orm";

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const port = process.env.PORT ?? 8000;

// middleware to find the current logged in user
app.use(async (req, _res, next) => {
  const sessionId = req.headers["x-session-id"];
  if (!sessionId) {
    return next();
  }

  const [data] = await db
    .select({
      id: sessionTable.id,
      userId: usersTable.id,
      name: usersTable.name,
      email: usersTable.email,
    })
    .from(sessionTable)
    .rightJoin(usersTable, eq(usersTable.id, sessionTable.userId))
    .where((table) => eq(sessionId, table.id));

  if (!data) {
    return next();
  }

  req.user = data;
  return next();
});

app.get("/", (_req, res) => {
  return res.json({
    status: "Server is up and running",
  });
});

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});

app.use("/user", userRouter);
