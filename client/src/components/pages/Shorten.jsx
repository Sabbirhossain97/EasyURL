import { useState, useEffect } from "react"
import axios from "axios"
import TableData from "../components/table/TableData";
import toast from 'react-hot-toast';
import { Spinner } from "../components/svg/SVG"

function Shorten() {

    const [originalUrl, setOriginalUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [urls, setUrls] = useState([])

    const getUrls = async () => {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/shorten`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        if (res) {
            setUrls(res.data);
        }
    };

    useEffect(() => {
        getUrls();
    }, []);

    const handleUrl = async (e) => {
        e.preventDefault();

        if (!originalUrl) {
            toast.error('Enter an URL!', { position: 'top-center' });
            return;
        }

        if (urls.find((item) => item.longUrl === originalUrl)) {
            toast.error("URL already in use!", { position: 'top-center' });
            return;
        }

        setLoading(true);

        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/shorten`, { originalUrl }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            await getUrls();
            setOriginalUrl("");
            toast.success("URL added!", { position: 'bottom-right' });
        } catch (err) {
            toast.error(err?.response?.data?.error, { position: 'top-center' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="max-w-7xl mx-auto pb-20">
                <div className='flex justify-center mx-auto'>
                    <div className="mt-44">
                        <h1 className="text-center text-[64px] font-bold leading-[80px] custom-header-text">Shorten your URL here</h1>
                        <form onSubmit={handleUrl} className="flex gap-4 mt-10 relative">
                            <input
                                className="border focus:border-sky-400 dark:focus:border-blue-500 transition duration-300 outline-none w-full bg-white dark:bg-[#181E29] border-zinc-200 dark:border-zinc-700 rounded-[48px] p-5"
                                placeholder="Enter your long url here..."
                                onChange={(e) => setOriginalUrl(e.target.value)}
                                type="url"
                                value={originalUrl}
                            />
                            <button type="submit" className={`${loading ? 'bg-blue-500' : 'bg-sky-400 dark:bg-blue-600'} text-white cursor-pointer transition duration-300 hover:bg-blue-500 absolute w-[150px] right-2 top-2 bottom-2 px-4 rounded-[48px]`}>
                                {loading ? (
                                    <div className='flex items-center gap-2'>
                                        <div role="status">
                                            <Spinner />
                                        </div> Shortening...
                                    </div>
                                ) : (
                                    "Shorten"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
                <TableData urls={urls} setUrls={setUrls} />
            </div>
        </>
    )
}

export default Shorten