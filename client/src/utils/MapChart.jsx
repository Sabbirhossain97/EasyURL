import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { Tooltip as ReactTooltip } from 'react-tooltip'
import "react-tooltip/dist/react-tooltip.css";

function MapChart({ urlStats }) {
    const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";
    return (
        <div className="relative w-full h-auto">
            <h3 className="absolute text-md font-semibold top-4 left-6">Countries</h3>
            <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                    scale: 100,
                    center: [0, 0],
                }}
                style={{ width: "100%", height: "100%" }}
            >
                <ZoomableGroup
                    zoom={1}
                    minZoom={1}
                    maxZoom={8}
                    center={[0, 0]}

                >
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies.map((geo) => {
                                const findCount = urlStats?.countryStats?.find(country => country._id === geo.properties.name)
                                return (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={findCount && findCount.count > 0 ? "#48A4FD" : "#D4DEED"}
                                        stroke="#9f9fa9"
                                        data-tooltip-id="country-tooltip"
                                        data-tooltip-content={`${geo.properties.name}: ${findCount?.count ? findCount?.count : 0} visit`}
                                        style={{
                                            default: { outline: "none" },
                                            hover: { fill: "#48A4FD", outline: "none" },
                                            pressed: { outline: "none" },
                                        }}
                                    />
                                )
                            }
                            )
                        }
                    </Geographies>
                </ZoomableGroup>
            </ComposableMap>
            <ReactTooltip
                id="country-tooltip"
                place="top"
                effect="solid"
                arrowColor="black"
            />
        </div>
    )
}

export default MapChart