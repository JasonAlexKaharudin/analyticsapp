import { useMemo } from "react";
import { useGetBrowserStatsQuery } from "../services/api";
import DashboardBox from "../components/DashboardBox";
import BoxHeader from "../components/BoxHeader";
import { Cell, Pie, PieChart, Sector, Tooltip } from "recharts";

const BrowserChart = () => {
    const { data } = useGetBrowserStatsQuery();
    const pieColors = ["#BD6100", "#D86F01", "#F77E00", "#F1902A", "#FFAE59"];

    const deviceData = useMemo(() => {
        if (data && data[0].usersPerDevice) {
          const deviceObject = data[0].usersPerDevice;
          const sortedDeviceArray = Object.entries(deviceObject).sort((a, b) => b[1] - a[1]);
      
          return sortedDeviceArray.map(([device, count]) => ({ device, count }));
        }
      
        return [];
      }, [data]);

    console.log(deviceData);



    return (
        <> 
            <DashboardBox>
                <div>
                    <div className="w-full h-full">
                        <BoxHeader
                            title="User Devices"
                        />
                        <PieChart
                            width={300}
                            height={150}
                            margin={{
                                top: 1,
                                left: 0,
                                right: 10,
                                bottom: 0
                            }}
                        >
                            <Pie
                                stroke="none"
                                data={deviceData}
                                innerRadius={28}
                                outerRadius={60}
                                fill="#BD6100"
                                paddingAngle={-0.5}
                                animationDuration={1800}
                                dataKey="count"
                                nameKey="count"
                            >
                                {deviceData?.map((_entry, index) => (
                                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                                ))}
                            </Pie>
                            <Tooltip/>
                        </PieChart>
                    </div>
                </div>
            </DashboardBox>
        </>
    )
}

export default BrowserChart