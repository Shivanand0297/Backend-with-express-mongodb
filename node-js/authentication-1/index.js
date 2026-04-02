import express from "express";
import userRouter from "./routes/user.route.js";

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const port = process.env.PORT ?? 8000;

app.get("/", (_req, res) => {
  return res.json({
    status: "Server is up and running",
  });
});

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});

app.use("/user", userRouter);
