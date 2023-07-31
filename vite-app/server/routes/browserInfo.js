import express from "express";
import BrowserInfo from "../models/BrowserInformation.js";
import validateStartDate from "../middleware/validateStartDate.js";
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

router.get('/browser-statistics', validateStartDate, async (req, res) => {
    try {
      const startDate = new Date(req.query.startDate || Date.now() - 7 * 24 * 60 * 60 * 1000);

      const browserInfos = await BrowserInfo.find({ timestamp: { $gte: startDate } });
      const numberOfSessions = browserInfos.length;
  
      const usersPerLocation = {};
      const usersPerBrowserName = {};
      const usersPerDevice = {};
      const sessionTimestamps = {};

      for (const info of browserInfos) {
        const { timezone, browserName, device, userID, timestamp } = info;
  
        usersPerLocation[timezone] = (usersPerLocation[timezone] || 0) + 1;
        usersPerBrowserName[browserName] = (usersPerBrowserName[browserName] || 0) + 1;
        usersPerDevice[device] = (usersPerDevice[device] || 0) + 1;
        if (!sessionTimestamps[userID]) {
          sessionTimestamps[userID] = [];
        }
        sessionTimestamps[userID].push(timestamp);
      }
  
      const userAnalytics = {
        numberOfSessions: numberOfSessions,
        usersPerLocation,
        usersPerBrowserName,
        usersPerDevice,
        sessionTimestamps
      };
  
      res.status(200).json(userAnalytics);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

export default router;