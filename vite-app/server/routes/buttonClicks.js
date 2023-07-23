import express from "express";

const router = express.Router();

router.get("/button-clicks", async (req, res) => {
    res.send("you are in button-clicks");
    res.status(200);
});

export default router;