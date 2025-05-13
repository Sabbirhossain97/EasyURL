import { useState } from 'react'
import axios from "axios"
import { FaCopy } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { Button, Dialog, DialogPanel, DialogBackdrop, DialogTitle } from '@headlessui/react'

function TableData({ urls, setUrls }) {

    let [isOpen, setIsOpen] = useState(false)
    let [customUrl, setCustomUrl] = useState({
        id: null,
        name: ""
    });

    const handleCopy = (url) => {
        navigator.clipboard.writeText(url)
            .then(() => {
                toast.success('url copied to clipboard!', {
                    position: 'bottom-right'
                });
            }).catch((err) => {
                console.error('Failed to copy!', err)
            })
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/${id}`)
            setUrls(prev => prev.filter(url => url._id !== id))
        } catch (error) {
            console.error('Delete failed:', error);
        }
    }

    const handleDownloadQR = (qrDataUrl, shortUrl) => {
        const link = document.createElement('a');
        link.href = qrDataUrl;
        link.download = `${shortUrl.replace(/https?:\/\//, '')}-qr.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link)
    }

    function close() {
        setIsOpen(false)
        setCustomUrl({
            id: null,
            name: ""
        })
    }

    const handleCustomize = (url) => {
        setIsOpen(true)
        const { shortId } = url;
        setCustomUrl({ ...customUrl, id: shortId })
    }

    const handleCustomUrlName = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.patch(`${import.meta.env.VITE_BASE_URL}/shorten/${customUrl.id}`, { customName: customUrl.name }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setUrls(res?.data?.updatedUrl)
            toast.success("URL customized!", { position: 'bottom-right' });
        } catch (err) {
            toast.error(err.response.data.error, { position: 'top-center' });
        } finally {
            close()
        }
    }

    return (
        <div className="relative overflow-hidden mt-24">
            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <DialogBackdrop className="fixed inset-0 backdrop-blur-sm" />
                <form onSubmit={handleCustomUrlName}>
                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4">
                            <DialogPanel
                                transition
                                className="w-full max-w-md rounded-xl shadow-xl bg-white dark:bg-[#181E29] p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                            >
                                <DialogTitle as="h3" className="text-base/7 font-medium dark:text-white">
                                    Customize your URL
                                </DialogTitle>
                                <input
                                    className="border w-full mt-2 placeholder:text-[14px] bg-white dark:bg-[#181E29] border-zinc-200 dark:border-zinc-700 rounded-md p-2"
                                    placeholder="Enter your custom name here..."
                                    onChange={(e) => setCustomUrl({ ...customUrl, name: e.target.value })}
                                    value={customUrl.name}
                                />
                                <div className="mt-4">
                                    <Button
                                        type='submit'
                                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </DialogPanel>
                        </div>
                    </div>
                </form>
            </Dialog>
            {urls?.length > 0 &&
                <>
                    <h1 className='text-xl'>History ({urls.length}) </h1>
                    <div className="w-full max-h-[420px] overflow-y-auto mt-2 rounded-xl shadow-xl bg-white dark:bg-[#101522]">
                        <table className="w-full text-sm text-left rtl:text-right">
                            <thead className="text-md rounded-xl bg-zinc-200 dark:bg-[#181E29] text-zinc-600 dark:text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Short Link
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Original Link
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Clicks
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Created At
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='dark:text-[#b2b6bd]'>
                                {urls.map((item, index) => (
                                    <tr key={index} className="border-b border-zinc-100 dark:border-gray-700/40">
                                        <td className="px-6 w-1/5 py-4 flex items-center gap-2 font-medium whitespace-nowrap">
                                            {item.shortUrl}
                                            <span onClick={() => handleCopy(item.shortUrl)} className='cursor-pointer p-2 bg-zinc-100 dark:bg-[#1C283FB0] rounded-full'><FaCopy className='text-gray-500 dark:text-white' /></span>
                                        </td>
                                        <td className="px-6 py-4 truncate max-w-[250px]">
                                            {item.longUrl}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {item.clickCount}
                                        </td>
                                        <td className="px-6 py-4 ">
                                            {new Date(item.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-4 flex items-center gap-2">
                                            <button onClick={() => handleDelete(item._id)} className="border px-1 rounded-md dark:bg-[#181E29] font-medium dark:text-red-500 cursor-pointer">
                                                delete
                                            </button>
                                            <button onClick={() => handleDownloadQR(item.qrcode, item.shortUrl)} className="border px-1 rounded-md dark:bg-[#181E29] dark:text-green-500 font-medium flex items-center cursor-pointer">
                                                <span> Download QR</span>
                                            </button>
                                            <button onClick={() => handleCustomize(item)} className="border px-1 rounded-md dark:bg-[#181E29] dark:text-blue-500 font-medium flex items-center cursor-pointer">
                                                <span> Customize</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>}
        </div>
    )
}

export default TableData