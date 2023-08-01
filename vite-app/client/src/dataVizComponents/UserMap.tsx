import DashboardBox from "../components/DashboardBox";
import BoxHeader from "../components/BoxHeader";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

const UserMap = () => {
  return (
    <>
        <DashboardBox>
            <BoxHeader
                title="Sessions by Country"
            />

            <ComposableMap>
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                    geographies.map((geo) => (
                        <Geography key={geo.rsmKey} geography={geo} />
                    ))
                }
                </Geographies>
            </ComposableMap>
        </DashboardBox>
    </>
  )
}

export default UserMap;