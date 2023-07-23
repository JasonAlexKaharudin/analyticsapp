import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// CONFIGS
dotenv.config();
const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(cors());

const API_PREFIX = "/api/analytics";

/* ROUTES */
app.get("/", async (req, res) => {
    res.send("Hello BE Server");
})

app.post(`${API_PREFIX}/button-click`, async (req, res) => {
    const { buttonId } = req.body;
    console.log(`Server happily accepts that ${buttonId} has been clicked.`);

    res.json({ success: true });
})

app.get(`${API_PREFIX}/page-view`, async (req, res) => {
    res.send("hello page-view");
})

const PORT = process.env.PORT;
app.listen(PORT, ()  => console.log(`Server running at port: ${PORT}`));