import express from "express";
import mongoose from "mongoose";
import router from "./router.js";
import config from "./config.js";
import cors from "cors";

const applicationPort = process.env.PORT || config.port;
const databaseUrl = config.db_url;

const app = express();

app.use(express.json());
app.use(cors());
app.use("/app", router);

async function startApp() {
    try {
        await mongoose.connect(databaseUrl, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        app.listen(applicationPort, () => console.log("started on port " + applicationPort));
    } catch (error) {
        console.log(error);
    }
}

startApp();
