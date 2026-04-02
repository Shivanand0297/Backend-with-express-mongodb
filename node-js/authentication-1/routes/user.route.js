import express from "express";
import db from "../src/index.js";
import { sessionTable, usersTable } from "../src/db/schema.js";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "node:crypto";

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  const sessionId = req.headers["x-session-id"];
  console.log(sessionId);

  if (!sessionId) {
    return res.status(401).json({
      success: false,
      message: "Not logged in",
    });
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
    return res.status(401).json({
      success: false,
      message: "Invalid session id",
    });
  }

  return res.status(200).json({
    success: true,
    data,
  });
});

userRouter.post("/signup", async (req, res) => {
  // take input from the user
  const { name, email, password } = req.body;

  // sanitize the user inputs;

  // check if user is already present in the database

  const [alreadyPresent] = await db
    .select()
    .from(usersTable)
    .where((table) => eq(table.email, email));

  if (alreadyPresent?.id) {
    return res.json({
      error: `User with ${email} already present`,
    });
  }

  // create salt and store the password
  const secretSalt = randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", secretSalt).update(password).digest("hex");
  // if not present then create the user

  const [user] = await db
    .insert(usersTable)
    .values({
      name,
      email,
      password: hashedPassword,
      salt: secretSalt,
    })
    .returning({
      id: usersTable.id,
    });

  return res.status(201).json({
    status: "success",
    data: {
      userId: user.id,
    },
  });
});

userRouter.post("/login", async (req, res) => {
  // extract user input
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(401).json({
      error: "Please fill user and password",
    });
  }

  // check if user exists or not
  const [existingUser] = await db
    .select({ email: usersTable.email, salt: usersTable.salt })
    .from(usersTable)
    .where((table) => eq(table.email, email));

  if (!existingUser) {
    return res.status(401).json({
      error: `User with ${email} does not exists`,
    });
  }

  // making hashedPassword using the existingUser salt so that we can match with the db user
  const hashedPassword = createHmac("sha256", existingUser.salt).update(password).digest("hex");

  const [user] = await db
    .select()
    .from(usersTable)
    .where((table) => eq(table.password, hashedPassword));

  if (!user) {
    return res.status(401).json({
      error: "Password is incorrect",
    });
  }

  // create user session
  const [session] = await db
    .insert(sessionTable)
    .values({
      userId: user.id,
    })
    .returning({
      id: sessionTable.id,
    });

  return res.status(200).json({
    status: "success",
    message: "You have been logged in successfully !",
    session: session,
  });
});

export default userRouter;
