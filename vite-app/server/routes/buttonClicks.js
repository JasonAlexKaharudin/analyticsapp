import express from "express";
import createValidationMiddleware from "../middleware/validationMiddleWare.js";
import ButtonClick from "../models/ButtonClick.js";

const router = express.Router();

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

export default router;