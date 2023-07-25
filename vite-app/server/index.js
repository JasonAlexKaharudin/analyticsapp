import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import mongoose from "mongoose";

import buttonClicksRoutes from "./routes/buttonClicks.js";
import pageViewRoutes from "./routes/pageView.js";
import browserInfoRoutes from "./routes/browserInfo.js";

// CONFIGS
dotenv.config();
const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cors());

/* ROUTES */
const API_PREFIX = "/api/analytics";

app.use(`${API_PREFIX}`, buttonClicksRoutes);
app.use(`${API_PREFIX}`, pageViewRoutes);
app.use(`${API_PREFIX}`, browserInfoRoutes);

const PORT = process.env.PORT || 9000;
mongoose
    .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(async () => {
        app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));

    })
    .catch((error) => console.log(`${error} did not connect`));
