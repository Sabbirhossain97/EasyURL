import { useState } from "react"
import axios from "axios"
import Navbar from "./components/layouts/Navbar";
import TableData from "./components/TableData";
import toast, { Toaster } from 'react-hot-toast';
import { Spinner } from "./components/svg/SVG";

function App() {

  const [originalUrl, setOriginalUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUrl = async (e) => {
    e.preventDefault();

    if (!originalUrl) {
      toast.error('Enter an URL!', {
        position: 'top-center'
      });
      return
    }

    const allData = JSON.parse(localStorage.getItem("shortUrlData"))
    if (allData.find((item) => item.originalUrl === originalUrl)) {
      toast.error("URL already in use!", {
        position: 'top-center'
      })
      return
    }

    setLoading(true)

    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/shorten`, { originalUrl });
      setTimeout(() => {

        const newShortUrlData = {
          shortUrl: res.data.shortUrl,
          originalUrl: res.data.originalUrl,
          createdAt: res.data.createdAt,
          qrcode: res.data.qrcode
        };
        setLoading(false);
        const existingDate = JSON.parse(localStorage.getItem("shortUrlData")) || [];
        const updatedData = [newShortUrlData, ...existingDate]
        localStorage.setItem("shortUrlData", JSON.stringify(updatedData));
        setOriginalUrl("")
        toast.success("URL added!", {
          position: 'bottom-right'
        });
      }, 1500);

    } catch (err) {
      toast.error(err?.response?.data?.error, {
        position: 'top-center'
      });
      setLoading(false);
    }

  };

  return (
    <>
      <Toaster />
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <div className='flex justify-center mx-auto'>
          <div className="mt-32">
            <h1 className="text-center text-[64px] font-bold leading-[80px] custom-header-text">Shorten your URL here</h1>
            <form onSubmit={handleUrl} className="flex gap-4 mt-10 relative">
              <input
                className="border w-full bg-white dark:bg-[#181E29] border-zinc-200 dark:border-zinc-700 rounded-[48px] p-5"
                placeholder="Enter your long url here..."
                onChange={(e) => setOriginalUrl(e.target.value)}
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
        <TableData />
      </div>
    </>
  )
}

export default App
