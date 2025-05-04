import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";
dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 8000;

connectDB()
.then(() => {
    app.on("error", (error) => {
      throw error;
    });
    
    app.listen(PORT, () => {
      console.log("server is running at PORT: ", PORT);
    });

  })
  .catch((error) => {
    console.log("mongo db connection faild:", error);
  });
