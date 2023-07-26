import express from "express";
import createValidationMiddleware from "../middleware/validationMiddleWare.js";
import validateStartDate from "../middleware/validateStartDate.js";
import ButtonClick from "../models/ButtonClick.js";

const router = express.Router();
const defualtDays = 7;

const buttonClickValidationMiddleware = createValidationMiddleware('ButtonClick');
router.post("/button-click", buttonClickValidationMiddleware, async (req, res) => {
    try{
        const clickData = req.body;
        const createdButtonClickObject = await ButtonClick.create(clickData)

        console.log("successfull create buttonClick");
        res.status(201).json(createdButtonClickObject);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get("/button-clicks", validateStartDate, async (req, res) => {
    try{
        const startDate = new Date(req.query.startDate || Date.now() - defualtDays * 24 * 60 * 60 * 1000);

        const buttonClicks = await ButtonClick.aggregate([
            {
              $unwind: '$clicks',
            },
            {
              $match: {
                'clicks.timestamp': { $gte: startDate },
              },
            },
          ]);

        res.status(200).json(buttonClicks);
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

export default router;