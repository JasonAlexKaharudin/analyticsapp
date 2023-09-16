import { useMemo } from "react";
import { useGetBrowserStatsQuery } from "../services/api";
import DashboardBox from "../components/DashboardBox";
import BoxHeader from "../components/BoxHeader";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

interface LocationData {
    location: string;
    visitors: number;
}

const UserLocationChart = () => {
    const { data } = useGetBrowserStatsQuery();

    const locationData = useMemo(() => {
        let formattedData: LocationData[] = [];

        if (data && data.usersPerLocation){
            const locationObject = data.usersPerLocation
            const locationEntries = Object.entries(locationObject);

            formattedData = locationEntries.map(([location, count]) => {
                const locationSplit = location.split("/")[1]
                 if (locationSplit === undefined) {
                    return {
                        location: "Unknown",
                        visitors: count
                    }
                } else {
                    return {
                        location: locationSplit,
                        visitors: count
                    }
                }
            });
        }
            
        return formattedData.reverse();
      }, [data]);

    return (
        <>
            <DashboardBox>
                <BoxHeader
                    title="Location by Country"
                />
                <ResponsiveContainer width="100%" height="80%">
                    <BarChart
                        data={locationData}
                        margin={{
                            top: 20,
                            right: 0,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <XAxis 
                            dataKey="location"
                            tickLine={false}
                            axisLine={false}
                            style={{ fontSize: '10px' }}
                        />
                        <Bar 
                            dataKey="visitors" 
                            fill="#F1902A"
                            maxBarSize={25}
                            background={false}
                            animationDuration={1800}
                        />
                        <Tooltip
                            cursor={false}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </DashboardBox>
        </>
    )
}

export default UserLocationChart;