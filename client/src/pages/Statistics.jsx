import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

function Statistics() {

    const visitorStats = {
        US: 120,
        IN: 90,
        DE: 40,
        BD: 65,
    };

    const geoUrl =
        "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

    const getColor = (isoCode) => {
        const max = Math.max(...Object.values(visitorStats));
        const count = visitorStats[isoCode] || 0;
        const intensity = count / max;
        return `rgba(111, 111, 111, ${intensity})`;
    };

    return (
        <div>
            <div class="mt-44 grid max-w-7xl mx-auto grid-cols-4 row-span-3 gap-x-8 gap-y-4">
                <div class="border rows-span-1 h-auto rounded-md">01</div>
                <div className="row-span-3 col-span-2 border rounded-md">
                    <div className="w-full h-auto">
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
                                enableZoom={true}
                                enablePan={true}
                            >
                                <Geographies geography={geoUrl}>
                                    {({ geographies }) =>
                                        geographies.map((geo) => {
                                            const isoCode = geo.properties.ISO_A2;
                                            return (
                                                <Geography
                                                    key={geo.rsmKey}
                                                    geography={geo}
                                                    fill={getColor(isoCode)}
                                                    stroke="#DDD"
                                                    style={{
                                                        default: { outline: "none" },
                                                        hover: { fill: "#FF5722", outline: "none" },
                                                        pressed: { outline: "none" },
                                                    }}
                                                />
                                            );
                                        })
                                    }
                                </Geographies>
                            </ZoomableGroup>
                        </ComposableMap>
                    </div>
                </div>
                <div class="border rounded-md rows-span-1">03</div>
                <div class="border rounded-md rows-span-1">04</div>
                <div class="border rounded-md rows-span-1">05</div>
                <div class="border rounded-md rows-span-1">06</div>
                <div class="border rounded-md rows-span-1">07</div>
            </div>
        </div>
    )
}

export default Statistics