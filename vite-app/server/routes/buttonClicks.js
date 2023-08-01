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
});

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

        const responsePayload = {
          totalObjects: buttonClicks.length,
          data: buttonClicks
        }

        res.status(200).json(responsePayload);
    } catch(error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get("/button-clicks-stats", validateStartDate, async (req, res) => {
    try {
        const startDate = new Date(req.query.startDate || Date.now() - defualtDays * 24 * 60 * 60 * 1000);
    
        const statistics = await ButtonClick.aggregate([
          {
            $unwind: '$clicks',
          },
          {
            $match: {
              'clicks.timestamp': { $gte: startDate },
            },
          },
          {
            $group: {
              _id: '$clicks.buttonId',
              totalClicks: { $sum: 1 },
            },
          },
          {
            $project: {
              buttonId: '$_id',
              _id: 0,
              totalClicks: 1,
            },
          },
          {
            $sort: {
              buttonId: 1,
            },
          },
        ]);
    
        res.status(200).json(statistics);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }
});

router.get("/button-clicks-activity", validateStartDate, async (req, res) => {
  try{
      const startDate = new Date(req.query.startDate || Date.now() - defualtDays * 24 * 60 * 60 * 1000);

      const data = await ButtonClick.aggregate([
          {
            $unwind: '$clicks',
          },
          {
            $match: {
              'clicks.timestamp': { $gte: startDate },
            },
          },
      ]);

      const currentDate = new Date();

      const last7Days = Array.from({ length: 7 }, (_, index) => {
        const date = new Date(currentDate);
        date.setDate(date.getDate() - index);
      
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
      
        return `${day}/${month}`;
      });
 
      const groupedData = last7Days.map(date => {
        const activityCount = data.reduce((count, item) => {
          const itemDate = item.clicks.timestamp;
          const itemDay = String(itemDate.getDate()).padStart(2, "0");
          const itemMonth = String(itemDate.getMonth() + 1).padStart(2, "0");
      
          const formattedDate = `${itemDay}/${itemMonth}`;
          return formattedDate === date ? count + 1 : count;
        }, 0);
      
        return {
          date,
          activityCount,
        };
      });

      const responsePayload = {
        totalObjects: data.length,
        activity: groupedData.reverse()
      }

      res.status(200).json([responsePayload]);
  } catch(error) {
      console.log(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;