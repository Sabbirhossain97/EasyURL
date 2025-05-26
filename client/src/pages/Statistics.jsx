import { MdVisibility, MdPeopleAlt } from "react-icons/md";
import { RiQrScan2Line } from "react-icons/ri";
import { useSearchParams, Link } from "react-router-dom";
import { fetchUrlStats } from "../services/urlService";
import { useState, useEffect } from "react";
import { LuLink } from "react-icons/lu";
import { FaArrowLeftLong } from "react-icons/fa6";
import MapChart from "../utils/MapChart";
import DonutChart from "../utils/DonutChart";

function Statistics() {

    const [searchParams] = useSearchParams();
    const urlId = searchParams.get('id');
    const [urlStats, setUrlsStats] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!urlId) return;

        const fetchStats = async () => {
            setLoading(true);
            try {
                const data = await fetchUrlStats(urlId);
                setUrlsStats(data);
            } catch (err) {
                console.error('Failed to fetch stats', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [urlId]);

    return (
        <div className="px-6 md:px-4 xl:px-6 max-w-7xl mx-auto pb-20">
            <div className="mt-24">
                <Link to="/shorten"><h3 className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-500 dark:text-white dark:hover:text-white/40 transition duration-300 cursor-pointer"><FaArrowLeftLong />Back to previous page</h3></Link>
            </div>
            <div className="text-center mt-10">
                <h1 className="text-4xl font-bold pb-5">Statistics</h1>
            </div>
            <div className="py-4">
                <div className="grid grid-cols-4 row-span-3 gap-x-6 gap-y-6">
                    <div className="bg-[#ecedf0] order-1 dark:bg-white/5 flex flex-col gap-2 py-6 items-center justify-center col-span-4 rows-span-1 h-auto rounded-md">
                        <div className="text-gray-800 dark:text-white text-md sm:text-lg font-bold"> {loading ? <div className="bg-gray-300 animate-pulse dark:bg-white/15 text-3xl h-4 w-44 sm:w-64 rounded-md font-bold"></div> : "Shortened URL"}</div>
                        <a
                            href={urlStats?.visits?.shortUrl}
                            className="flex max-w-[400px] px-2 sm:px-0 text-lg sm:text-xl break-words break-all whitespace-normal text-gray-500 hover:text-sky-400 dark:hover:text-blue-500 transition duration-300 dark:text-white/30 items-center gap-2 font-semibold"
                        >
                            {loading ? (
                                <div className="bg-gray-300 animate-pulse dark:bg-white/15 w-64 sm:w-96 h-4 mt-4 rounded-md"></div>
                            ) : (
                                <>
                                    <LuLink className="hidden sm:block" /> {urlStats?.visits?.shortUrl}
                                </>
                            )}
                        </a>
                    </div>
                    <div className="bg-[#ecedf0] dark:bg-white/5 [@media(max-width:500px)]:col-span-full flex flex-col gap-2 py-8 lg:py-0 items-center justify-center rows-span-1 col-span-2 lg:col-span-1 order-3 lg:order-2 h-auto rounded-md">
                        <div className="text-gray-800 dark:text-white text-3xl font-bold">{loading ? <div className="bg-gray-300 animate-pulse dark:bg-white/15 text-3xl h-8 w-8 rounded-md font-bold"></div> : urlStats?.stats?.length}</div>
                        <div className="flex text-lg text-gray-500 dark:text-white/30 items-center gap-2 font-semibold">{loading ? <div className="bg-gray-300 animate-pulse dark:bg-white/15 w-32 h-4 mt-4 rounded-md"></div> : <><MdVisibility /> Total Visits </>}</div>
                    </div>
                    <div className="row-span-3 col-span-4 order-2 lg:order-3 lg:col-span-2 bg-[#ecedf0] dark:bg-white/5 rounded-md">
                        <MapChart urlStats={urlStats} />
                    </div>
                    <div className="bg-[#ecedf0] dark:bg-white/5 [@media(max-width:500px)]:col-span-full flex flex-col gap-2 py-8 lg:py-0 items-center justify-center rows-span-1 col-span-2 lg:col-span-1 order-4 h-auto rounded-md">
                        <div className="text-gray-800 dark:text-white text-3xl font-bold"> {loading ? <div className="bg-gray-300 animate-pulse dark:bg-white/15 text-3xl h-8 w-8 rounded-md font-bold"></div> : Math.round(urlStats?.averages?.daily)}</div>
                        <div className="flex text-lg text-gray-500 dark:text-white/30 items-center gap-2 font-semibold">{loading ? <div className="bg-gray-300 animate-pulse dark:bg-white/15 w-32 h-4 mt-4 rounded-md"></div> : "Daily Average"}</div>
                    </div>
                    <div className="bg-[#ecedf0] dark:bg-white/5 [@media(max-width:500px)]:col-span-full flex flex-col gap-2 py-8 lg:py-0 items-center justify-center rows-span-1 col-span-2 lg:col-span-1 order-5 h-auto rounded-md">
                        <div className="text-gray-800 dark:text-white text-3xl font-bold"> {loading ? <div className="bg-gray-300 animate-pulse dark:bg-white/15 text-3xl h-8 w-8 rounded-md font-bold"></div> : (urlStats?.uniqueVisitors?.length)}</div>
                        <div className="flex text-lg text-gray-500 dark:text-white/30 items-center gap-2 font-semibold">{loading ? <div className="bg-gray-300 animate-pulse dark:bg-white/15 w-32 h-4 mt-4 rounded-md"></div> : <><MdPeopleAlt /> Unique Visitors</>}</div>
                    </div>
                    <div className="bg-[#ecedf0] dark:bg-white/5 [@media(max-width:500px)]:col-span-full flex flex-col gap-2 py-8 lg:py-0 items-center justify-center rows-span-1 col-span-2 lg:col-span-1 order-6 h-auto rounded-md">
                        <div className="text-gray-800 dark:text-white text-3xl font-bold">{loading ? <div className="bg-gray-300 animate-pulse dark:bg-white/15 text-3xl h-8 w-8 rounded-md font-bold"></div> : Math.round(urlStats?.averages?.weekly)}</div>
                        <div className="flex text-lg text-gray-500 dark:text-white/30 items-center gap-2 font-semibold">{loading ? <div className="bg-gray-300 animate-pulse dark:bg-white/15 w-32 h-4 mt-4 rounded-md"></div> : "Weekly Average"}</div>
                    </div>
                    <div className="bg-[#ecedf0] dark:bg-white/5 [@media(max-width:500px)]:col-span-full flex flex-col gap-2 py-8 lg:py-0 items-center justify-center rows-span-1 col-span-2 lg:col-span-1 order-7 h-auto rounded-md">
                        <div className="text-gray-800 dark:text-white text-3xl font-bold">{loading ? <div className="bg-gray-300 animate-pulse dark:bg-white/15 text-3xl h-8 w-8 rounded-md font-bold"></div> : urlStats?.visits?.qr?.scans}</div>
                        <div className="flex text-lg text-gray-500 dark:text-white/30 items-center gap-2 font-semibold">{loading ? <div className="bg-gray-300 animate-pulse dark:bg-white/15 w-32 h-4 mt-4 rounded-md"></div> : <><RiQrScan2Line /> QR Scans</>}</div>
                    </div>
                    <div className="bg-[#ecedf0] dark:bg-white/5 [@media(max-width:500px)]:col-span-full flex flex-col gap-2 py-8 lg:py-0 items-center justify-center rows-span-2 col-span-2 lg:col-span-1 order-8 h-auto rounded-md">
                        <div className="text-gray-800 dark:text-white text-3xl font-bold">{loading ? <div className="bg-gray-300 animate-pulse dark:bg-white/15 text-3xl h-8 w-8 rounded-md font-bold"></div> : Math.round(urlStats?.averages?.monthly)}</div>
                        <div className="flex text-lg text-gray-500 dark:text-white/30 items-center gap-2 font-semibold">{loading ? <div className="bg-gray-300 animate-pulse dark:bg-white/15 w-32 h-4 mt-4 rounded-md"></div> : "Monthly Average"}</div>
                    </div>
                </div>
                <DonutChart urlStats={urlStats} />
            </div>
        </div>

    )
}

export default Statistics