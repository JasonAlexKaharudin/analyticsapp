import { useMemo } from "react";
import { useGetAveragePageViewQuery } from "../services/api";
import DashboardBox from "../components/DashboardBox";
import BoxHeader from "../components/BoxHeader";

const pathMapper: Record<string, string> = {
    "/": "/",
    "/projects": "/projects",
    "/projects/financeDashboard": "/financeDashboard",
    "/projects/analyticsApp": "/analyticsApp",
    "/projects/moneymoves": "/moneymoves",
    "/projects/sportsteammatesforu": "/sportsteammatesforu",
    "/projects/workoutTracker": "/workoutTracker"
}

const PageViewTable = () => {
    const { data } = useGetAveragePageViewQuery();

    const pageViewDurations = useMemo(() => {
        return data && data.data.slice(0, 5)
    }, [data]);

    return (
        <DashboardBox>
            <BoxHeader
                title="Average Page View"
            />
            <div>
                <div className="flex justify-between mx-3 pt-3 pb-2 text-md text-[#828282]">
                    <p>Path</p>
                    <p>Seconds</p>
                </div>

                { pageViewDurations?.map((item, index) => (
                    <div key={index} className="flex justify-between mx-3 pt-3 pb-2 text-[#828282] text-sm border-b-[0.2rem] border-[#f8efdc]">
                        <p>{pathMapper[item.pageURL]}</p>
                        <p>{item.averageDuration}</p>
                    </div>
                ))}
            </div>
        </DashboardBox>
    )
}

export default PageViewTable;