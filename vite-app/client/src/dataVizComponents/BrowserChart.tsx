import { useMemo } from "react";
import { useGetBrowserStatsQuery } from "../services/api";
import DashboardBox from "../components/DashboardBox";
import BoxHeader from "../components/BoxHeader";
import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";

const BrowserChart = () => {
    const { data } = useGetBrowserStatsQuery();
    const pieColors = ["#BD6100", "#D86F01", "#F77E00", "#F1902A", "#FFAE59"];

    const deviceData = useMemo(() => {
        if (data && data.usersPerDevice) {
          const deviceObject = data.usersPerDevice;
          const sortedDeviceArray = Object.entries(deviceObject).sort((a, b) => b[1] - a[1]);
      
          return sortedDeviceArray.map(([device, count]) => ({ device, count }));
        }

        return [];
    }, [data]);

    return (
        <> 
            <DashboardBox>
                <BoxHeader
                    title="User Devices"
                />
                <ResponsiveContainer width="100%" height="85%">
                    <PieChart
                        width={100}
                        height={100}
                        margin={{
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0
                        }}
                    >
                        <Pie
                            stroke="none"
                            data={deviceData}
                            innerRadius={38}
                            outerRadius={90}
                            fill="#BD6100"
                            paddingAngle={-0.5}
                            dataKey="count"
                            animationDuration={1800}
                        >
                            {deviceData?.map((_entry, index) =>  ( 
                                <Cell key={`cell-${index}`} fill={pieColors[index]} />
                            ))}
                        </Pie>
                        <Legend
                            formatter={(v) => deviceData[v]["device"]}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </DashboardBox>
        </>
    )
}

export default BrowserChart