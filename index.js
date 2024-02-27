import express from "express";
import bodyParser from "body-parser";
import { config as dotenvConfig } from "dotenv";
import router from "./Routes/index.js";
import connect  from "./Config/db.js";


// Configure Server
dotenvConfig();
connect();

// Create Server
const app = express();
app.use(bodyParser.json());
app.use("/api", router);


// Connect Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Your app is running on PORT ${PORT}`);
});