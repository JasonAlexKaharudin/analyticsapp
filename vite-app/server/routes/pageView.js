import express from "express";

const router = express.Router();

router.get("/page-view", async (req, res) => {
    res.send("you are in page-view");
    res.status(200);
});

export default router;