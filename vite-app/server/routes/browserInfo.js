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
      for (const info of browserInfos) {
        const timezone = info.timezone;
        usersPerLocation[timezone] = (usersPerLocation[timezone] || 0) + 1;
      }
   
      const usersPerBrowserName = {};
      for (const info of browserInfos) {
        const browserName = info.browserName;
        usersPerBrowserName[browserName] = (usersPerBrowserName[browserName] || 0) + 1;
      }
  
      const usersPerDevice = {};
      for (const info of browserInfos) {
        const device = info.device;
        usersPerDevice[device] = (usersPerDevice[device] || 0) + 1;
      }
  
      const userAnalytics = {
        numberOfSessions: numberOfSessions,
        usersPerLocation,
        usersPerBrowserName,
        usersPerDevice,
      };
  
      res.status(200).json(userAnalytics);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

export default router;