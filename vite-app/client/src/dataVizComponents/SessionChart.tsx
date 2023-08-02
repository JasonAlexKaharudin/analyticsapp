import { useMemo } from "react";
import { useGetBrowserStatsQuery } from "../services/api";
import DashboardBox from "../components/DashboardBox";
import BoxHeader from "../components/BoxHeader";

// import { BsArrowUpShort } from "react-icons/bs";
import { 
  ResponsiveContainer, 
  Area, 
  AreaChart, 
  CartesianGrid, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

const SessionChart = () => {
    const { data } = useGetBrowserStatsQuery();
    console.log(data)
  
    const sessionCounts = useMemo(() => {
      return (
        data && data[0].sessionCountsPerDay
      )
    }, [data])

    console.log(sessionCounts);

    const todaysSessions = useMemo(() => {
      return (
        data && data[0].sessionCountsPerDay[data[0].sessionCountsPerDay.length - 1]['visits']
      )
    }, [data])

    return (
        <>
          <DashboardBox>
            <div className="flex">
              <BoxHeader
                title="Sessions"
                value={data && data[0].numberOfSessions}
                secondHeader={true}
                secondTitle="Today"
                secondValue={todaysSessions}
              />


            </div>
            
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart
                data={sessionCounts}
                margin={{
                  top:15,
                  right: -35,
                  left: 17,
                  bottom: -8,
                }}
              >
                <CartesianGrid
                  strokeDasharray={0.2}
                  fillOpacity={0.1}
                  vertical={false} 
                />
                <XAxis 
                  dataKey="date"
                  tickLine={false}
                  style={{ fontSize: '10px' }}
                />
                <YAxis 
                  orientation="right"
                  tickLine={false}
                  axisLine={false}
                  style={{ fontSize: '10px' }}
                />
                <Tooltip
                />
                <Area 
                  type="monotone" 
                  dataKey="visits" 
                  strokeWidth={3}
                  stroke="#E37400" 
                  fill="#FDF4EB"
                  animationDuration={1800}
                />
              </AreaChart>
            </ResponsiveContainer>
          </DashboardBox>
        </>
    )
}

export default SessionChart;