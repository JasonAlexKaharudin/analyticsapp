import { useMemo } from "react";
import { useGetButtonActivityQuery } from "../services/api";
import DashboardBox from "../components/DashboardBox";
import BoxHeader from "../components/BoxHeader";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const UserActivity = () => {
    const { data } = useGetButtonActivityQuery(); 

    const userActivity = useMemo(() => {
        return (
            data && data[0].activity
          )
    }, [data])

    return (
        <>
            <DashboardBox>
                <BoxHeader
                    title="User Actvitity"
                />

            <ResponsiveContainer width="100%" height="80%">
                <LineChart
                    width={500}
                    height={300}
                    data={userActivity}
                    margin={{
                        top: 20,
                        right: 50,
                        left: -10,
                        bottom: -10,
                    }}
                >
                    <XAxis dataKey="date" style={{ fontSize: "12px" }} tickLine={false}/>
                    <YAxis style={{ fontSize: "11px" }} tickLine={false} />
                    <Tooltip 
                        labelFormatter={(n) => [n]}
                    />
                    <Line dataKey="activityCount" stroke="#D86F01" dot={false} strokeWidth={4} />
                </LineChart>
            </ResponsiveContainer>
            </DashboardBox>
        </>
    )
}

export default UserActivity;