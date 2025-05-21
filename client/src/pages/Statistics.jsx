import { MdVisibility, MdPeopleAlt } from "react-icons/md";
import { RiQrScan2Line } from "react-icons/ri";
import { useSearchParams } from "react-router-dom";
import { fetchUrlStats } from "../services/urlService";
import { useState, useEffect } from "react";
import { LuLink } from "react-icons/lu";
import { HeaderCardSkeleton, SmallCardSkeleton } from "../layouts/StatsSkeleton";
import MapChart from "../utils/MapChart";
import DonutChart from "../utils/DonutChart";

function Statistics() {

    const [searchParams] = useSearchParams();
    const urlId = searchParams.get('id');
    const [urlStats, setUrlsStats] = useState([])
    const [loading, setLoading] = useState(true)

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
        <div className="px-6 md:px-10 xl:px-0 max-w-7xl mx-auto pb-20">
            <div className="text-center mt-30">
                <h1 className="text-4xl font-bold pb-5">Statistics</h1>
            </div>
            <div className="mt-10">
                <div className="grid grid-cols-4 row-span-3 gap-x-6 gap-y-6">
                    {loading ? <HeaderCardSkeleton /> : <div className="bg-[#ecedf0] order-1 dark:bg-white/10 flex flex-col gap-2 py-6 items-center justify-center col-span-4 rows-span-1 h-auto rounded-md">
                        <p className="text-gray-800 dark:text-white text-lg font-bold">Shortened URL</p>
                        <a href={urlStats?.visits?.shortUrl} className="flex text-xl text-gray-500 hover:text-sky-400 dark:hover:text-blue-500 transition duration-300 dark:text-white/30 items-center gap-2 font-semibold"> <LuLink /> {urlStats?.visits?.shortUrl}</a>
                    </div>}
                    {loading ? <SmallCardSkeleton /> : <div className="bg-[#ecedf0] dark:bg-white/10 [@media(max-width:500px)]:col-span-full flex flex-col gap-2 py-8 lg:py-0 items-center justify-center rows-span-1 col-span-2 lg:col-span-1 order-3 lg:order-2 h-auto rounded-md">
                        <p className="text-gray-800 dark:text-white text-3xl font-bold">{urlStats?.stats?.length}</p>
                        <p className="flex text-lg text-gray-500 dark:text-white/30 items-center gap-2 font-semibold"> <MdVisibility /> Total Visits</p>
                    </div>}
                    <div className="row-span-3 col-span-4 order-2 lg:order-3 lg:col-span-2 bg-[#ecedf0] dark:bg-white/10 rounded-md">
                        <MapChart urlStats={urlStats} />
                    </div>
                    {loading ? <SmallCardSkeleton /> : <div className="bg-[#ecedf0] dark:bg-white/10 [@media(max-width:500px)]:col-span-full flex flex-col gap-2 py-8 lg:py-0 items-center justify-center rows-span-1 col-span-2 lg:col-span-1 order-4 h-auto rounded-md">
                        <p className="text-gray-800 dark:text-white text-3xl font-bold">{Math.round(urlStats?.averages?.daily)}</p>
                        <p className="flex text-lg text-gray-500 dark:text-white/30 items-center gap-2 font-semibold"> Daily Average</p>
                    </div>}
                    {loading ? <SmallCardSkeleton /> : <div className="bg-[#ecedf0] dark:bg-white/10 [@media(max-width:500px)]:col-span-full flex flex-col gap-2 py-8 lg:py-0 items-center justify-center rows-span-1 col-span-2 lg:col-span-1 order-5 h-auto rounded-md">
                        <p className="text-gray-800 dark:text-white text-3xl font-bold">0</p>
                        <p className="flex text-lg text-gray-500 dark:text-white/30 items-center gap-2 font-semibold"> <MdPeopleAlt /> Unique Visitors</p>
                    </div>}
                    {loading ? <SmallCardSkeleton /> : <div className="bg-[#ecedf0] dark:bg-white/10 [@media(max-width:500px)]:col-span-full flex flex-col gap-2 py-8 lg:py-0 items-center justify-center rows-span-1 col-span-2 lg:col-span-1 order-6 h-auto rounded-md">
                        <p className="text-gray-800 dark:text-white text-3xl font-bold">{Math.round(urlStats?.averages?.weekly)}</p>
                        <p className="flex text-lg text-gray-500 dark:text-white/30 items-center gap-2 font-semibold"> Weekly Average</p>
                    </div>}
                    {loading ? <SmallCardSkeleton /> : <div className="bg-[#ecedf0] dark:bg-white/10 [@media(max-width:500px)]:col-span-full flex flex-col gap-2 py-8 lg:py-0 items-center justify-center rows-span-1 col-span-2 lg:col-span-1 order-7 h-auto rounded-md">
                        <p className="text-gray-800 dark:text-white text-3xl font-bold">{urlStats?.visits?.qr?.scans}</p>
                        <p className="flex text-lg text-gray-500 dark:text-white/30 items-center gap-2 font-semibold"> <RiQrScan2Line /> QR Scans</p>
                    </div>}
                    {loading ?
                        <SmallCardSkeleton /> : <div className="bg-[#ecedf0] dark:bg-white/10 [@media(max-width:500px)]:col-span-full flex flex-col gap-2 py-8 lg:py-0 items-center justify-center rows-span-2 col-span-2 lg:col-span-1 order-8 h-auto rounded-md">
                            <p className="text-gray-800 dark:text-white text-3xl font-bold">{Math.round(urlStats?.averages?.monthly)}</p>
                            <p className="flex text-lg text-gray-500 dark:text-white/30 items-center gap-2 font-semibold">Monthly Average</p>
                        </div>
                    }
                </div>
                <DonutChart urlStats={urlStats} />
            </div>
        </div>

    )
}

export default Statistics