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

function formatDate(timestamp) {
  const date = timestamp.getDate().toString();
  const month = (timestamp.getMonth() + 1).toString();
  const formattedDate = date + "/" + month

  return formattedDate
}

function generateLast7Dates() {
  const datesArray = [];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() - i);

    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}`;
    datesArray.push({ date: formattedDate });
  }

  return datesArray;
}

function transformVisitsData(visitsData) {
  const transformedData = [];

  const datesArray = generateLast7Dates();

  for (const dateObj of datesArray) {
    const date = dateObj.date;
    const visits = visitsData[date] || 0;
    transformedData.push({ date, visits });
  }

  return transformedData.reverse();
}

router.get('/browser-statistics', validateStartDate, async (req, res) => {
  const startDate = new Date(req.query.startDate || Date.now() - 7 * 24 * 60 * 60 * 1000);

  try {
    const browserInfos = await BrowserInfo.find({ timestamp: { $gte: startDate } });
    const numberOfSessions = browserInfos.length;

    const usersPerLocation = {};
    const usersPerBrowserName = {};
    const usersPerDevice = {};
    const sessionCounts = {};
    let sessionCountsPerDay = [];

    for (const info of browserInfos) {
      const { timezone, browserName, device, timestamp } = info;

      usersPerLocation[timezone] = (usersPerLocation[timezone] || 0) + 1;
      usersPerBrowserName[browserName] = (usersPerBrowserName[browserName] || 0) + 1;
      usersPerDevice[device] = (usersPerDevice[device] || 0) + 1;

      sessionCounts[formatDate(timestamp)] = (sessionCounts[formatDate(timestamp)] || 0) + 1;
    }

    sessionCountsPerDay = transformVisitsData(sessionCounts);

    const userAnalytics = {
      numberOfSessions: numberOfSessions,
      usersPerLocation,
      usersPerBrowserName,
      usersPerDevice,
      sessionCountsPerDay
    };

    res.status(200).json([userAnalytics]);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Internal Server Error' });
  }
  });

export default router;