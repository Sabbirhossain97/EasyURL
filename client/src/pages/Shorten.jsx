import { useState, useEffect } from "react"
import toast from 'react-hot-toast';
import { Spinner } from "../components/svg/SVG"
import TableData from "../components/table/TableData";
import { fetchUrls, createUrls } from "../services/urlService";
import { RiSendPlaneFill } from "react-icons/ri";

function Shorten() {

    const [originalUrl, setOriginalUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [urls, setUrls] = useState([])
    const [sortBy, setSortBy] = useState({
        slug: "createdAt_desc",
        field: "Date ( newest )"
    });

    const getUrls = async (sortBy) => {
        const data = await fetchUrls(sortBy);
        if (data) {
            setUrls(data);
        }
    };

    useEffect(() => {
        getUrls(sortBy);
    }, [sortBy]);

    const createUrl = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createUrls(originalUrl);
            setTimeout(async () => {
                toast.success("URL added!", { position: 'bottom-right' });
                await getUrls(sortBy);
                setOriginalUrl("");
                setLoading(false);
            }, 2000)
        } catch (err) {
            setTimeout(() => {
                toast.error(err?.error, { position: 'top-center' });
                setLoading(false);
            }, 1500);
        }
    };

    return (
        <div className="max-w-7xl mx-auto pb-20 px-6 md:px-10 xl:px-0">
            <div className='flex justify-center'>
                <div className="mt-44 w-full lg:w-3/4">
                    <h1 className="text-center text-[42px] sm:text-[52px] md:text-[64px] font-bold leading-[52px] custom-header-text">Shorten Your URL here</h1>
                    <form onSubmit={createUrl} className="flex gap-4 mt-4 md:mt-10 relative">
                        <input
                            className="border focus:border-sky-400 dark:focus:border-blue-500 transition duration-300 outline-none w-full bg-white dark:bg-[#181E29] border-zinc-200 dark:border-zinc-700 rounded-[48px] p-5"
                            placeholder="Enter your long url here..."
                            onChange={(e) => setOriginalUrl(e.target.value)}
                            value={originalUrl}
                        />
                        <button type="submit" className={`${loading ? 'bg-blue-500' : 'bg-sky-400 dark:bg-blue-600'} text-white cursor-pointer transition duration-300 hover:bg-blue-500 absolute w-[50px] sm:w-[150px] right-2 top-2 bottom-2 px-4 rounded-[48px]`}>
                            {loading ? (
                                <div className='flex items-center gap-2'>
                                    <div role="status">
                                        <Spinner />
                                    </div> <span className="hidden md:block">Shortening...</span>
                                </div>
                            ) : (
                                <p>
                                    <span className="hidden sm:block">Shorten</span>
                                    <span className="block sm:hidden"><RiSendPlaneFill /></span>
                                </p>
                            )}
                        </button>
                    </form>
                </div>
            </div>
            <TableData
                urls={urls}
                setUrls={setUrls}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
        </div>
    )
}

export default Shorten