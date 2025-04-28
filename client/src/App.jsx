import { useState } from "react"
import axios from "axios"
import Navbar from "./components/layouts/Navbar";
import TableData from "./components/layouts/TableData";

function App() {

  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrlData, setShortUrlData] = useState({
    shortUrl: "",
    originalUrl: "",
    createdAt: "",
    qrcode: ""
  });

  const handleUrl = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/shorten`, { originalUrl });
    setShortUrlData({
      shortUrl: res.data.shortUrl,
      originalUrl: res.data.originalUrl,
      createdAt: res.data.createdAt,
      qrcode: res.data.qrcode
    });
  };

  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <div className='flex justify-center mx-auto'>
          <div className="mt-32">
            <h1 className="text-center text-[64px] font-bold leading-[80px] custom-header-text">Shorten your URL here</h1>
            <form onSubmit={handleUrl} className="flex gap-4 mt-10 relative">
              <input
                className="border w-full bg-[#181E29] border-zinc-700 rounded-[48px] p-5"
                placeholder="Enter your long url here..."
                onChange={(e) => setOriginalUrl(e.target.value)}
                value={originalUrl}
              />
              <button type="submit" className="bg-blue-600 cursor-pointer transition duration-300 hover:bg-blue-500 absolute w-[150px] right-2 top-2 bottom-2 px-4 rounded-[48px]">Shorten</button>
            </form>
            {shortUrlData && <div className="mt-6">
              <p className="text-center">Your generated short url is: <a href={shortUrlData.shortUrl}>{shortUrlData.shortUrl} </a></p>
            </div>}
          </div>
        </div>
        <TableData data={shortUrlData} />
      </div>

    </>
  )
}

export default App
