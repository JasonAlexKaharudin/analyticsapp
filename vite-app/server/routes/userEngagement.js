import express from "express";

const router = express.Router();

const calculateBounceRate = (buttonClicks) => {
    const totalVisits = buttonClicks.length;
    const singlePageVisits = buttonClicks.filter((click) => click.totalClicks === 1).length;
    return totalVisits > 0 ? singlePageVisits / totalVisits : 0;
  };

router.get("/user-engagement", async (req, res) => {
    try{
        res.status(201).json({ message: "hi" });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

export default router;