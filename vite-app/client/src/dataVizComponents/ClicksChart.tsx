import { useMemo } from "react";
import { useGetButtonClickQuery } from "../services/api";
import DashboardBox from "../components/DashboardBox";
import BoxHeader from "../components/BoxHeader";

import { 
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,

} from "recharts";

export interface ButtonClicks {
  clicks: number;
  button: string;
}

const projectMapper: Record<string, string> = {
  "analyticsApp": "AA",
  "financeDashboard": "FD",
  "moneymoves": "MM",
  "sportsteammatesforu": "STFU",
  "workoutTracker": "WOT"
}

const projectCodeMapper: Record<string, string> = {
  "AA": "Analytics App",
  "FD": "Finance Dashboard",
  "MM": "Money Moves",
  "STFU": "Sports Teammates For U",
  "WOT": "Workout Tracker"
}

const ClicksChart = () => {
  const { data } = useGetButtonClickQuery();
  
  const totalClicks = useMemo(() => {
    let totals = 0;
    data && data.forEach(({ totalClicks, buttonId }) => {
      if (buttonId.split("-")[0] === "projects") {
        totals += totalClicks
      }
    })

    return totals;
  }, [data])

  const projectPageClicks = useMemo(() => {
    const projectClicks: Array<ButtonClicks> = [];

    data && data.map(({ totalClicks, buttonId }) => {
      if (buttonId.split("-")[0] === "projects") {
        projectClicks.push({
          clicks: totalClicks,
          button: projectMapper[buttonId.split("-")[1]]
        })
        totalClicks += totalClicks;
      }
    });

    return projectClicks;

  }, [data]);
  
  return (
    <>
      <DashboardBox>
        <BoxHeader
          title="Total Project Clicks"
          value={totalClicks}
        />
        <ResponsiveContainer width="100%" height="70%">
          <BarChart
            data={projectPageClicks}
            margin={{
              top: 20,
              right: 0,
              left: 0,
              bottom: -15,
            }}
          >
            <XAxis 
              dataKey="button"
              tickLine={false}
              axisLine={false}
              style={{ fontSize: '9px' }}
            />
            <YAxis 
              hide={true}
              style={{ fontSize: '9px' }}
            />
            <Tooltip
              labelFormatter={(n) => projectCodeMapper[n]}
              cursor={false}
            />
            <Bar 
              dataKey="clicks" 
              fill="#E37400"
              maxBarSize={35}
              background={false}
              animationDuration={1800}
            />
          </BarChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  )
}

export default ClicksChart;