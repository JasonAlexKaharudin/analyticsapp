import express from "express";
import ButtonClick from "../models/ButtonClick.js";

const router = express.Router();

const calculateBounceRate = (clicks) => {
    const totalVisits = clicks.length;
    const singlePageVisits = clicks.filter((click) => click.totalClicks === 1).length;
    return totalVisits > 0 ? singlePageVisits / totalVisits : 0;
};

// TO DO: not working right
router.get("/user-engagement", async (req, res) => {
    try{
        const buttonClicks = await ButtonClick.find({});
        const bounceRates = {};

        for (const buttonClick of buttonClicks) {
            const { clicks } = buttonClick;
            const pageURLs = [...new Set(clicks.map((click) => click.pageURL))];
            console.log(pageURLs);
            
            for (const pageURL of pageURLs) {
                if (!bounceRates[pageURL]) {
                    bounceRates[pageURL] = calculateBounceRate(clicks.filter((click) => click.pageURL === pageURL));
                }
            }
        }

        res.status(200).json(bounceRates);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

export default router;