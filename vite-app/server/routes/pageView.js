import express from "express";
import createValidationMiddleware from "../middleware/validationMiddleWare.js";
import PageViewDuration from "../models/PageViewDuration.js";

const router = express.Router();

const pageViewValidationMiddleware = createValidationMiddleware('PageViewDuration');
router.post("/page-view", pageViewValidationMiddleware, async (req, res) => {
    try {
        const pageViewDurationData = req.body;
        const createdPageViewObject = await PageViewDuration.create(pageViewDurationData)

        console.log("Successful created Page View");
        res.status(201).json(createdPageViewObject);
    } catch(error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

export default router;