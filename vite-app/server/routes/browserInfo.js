import express from "express";
import BrowserInfo from "../models/BrowserInformation.js";
import createValidationMiddleware from "../middleware/validationMiddleWare.js";

const router = express.Router();

const browserInfoValidationMiddleware = createValidationMiddleware('BrowserInfo');
router.post("/browser-info", browserInfoValidationMiddleware, async (req, res) => {
    try{
        const newBrowserData = req.body;
        const createdBrowserInfo = await BrowserInfo.create(newBrowserData);
        console.log("BrowserInfo created successfully");

        res.status(201).json(createdBrowserInfo);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

export default router;