import { useState, useCallback } from 'react'
import { FaCopy } from "react-icons/fa6";
import toast from 'react-hot-toast';
import { Button, Dialog, DialogPanel, DialogBackdrop, DialogTitle } from '@headlessui/react'

function TableData({ urls, setUrls }) {

    let [isOpen, setIsOpen] = useState(true)
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

    const handleDelete = useCallback((id) => {
        const filteredUrlData = urls.filter((item) => item.id !== id);
        localStorage.setItem("shortUrlData", JSON.stringify(filteredUrlData));
        setUrls(filteredUrlData);
    }, [urls]);

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
        const { id } = url;
        setCustomUrl({ ...customUrl, id: id })
    }

    const handleCustomUrl = (e) => {
        e.preventDefault()
        const updatedUrl = urls.map((item) => item.id === customUrl.id ? { ...item, shortUrl: item.shortUrl.replace(`${item.shortId}`, customUrl.name) } : item)
        setUrls(updatedUrl)
    }

    return (
        <div className="relative overflow-hidden mt-24 ">
            {urls?.length > 0 &&
                <>
                    <h1 className='text-xl'>History ({urls.length}) </h1>
                    <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
                        <DialogBackdrop className="fixed inset-0 backdrop-blur-sm" />
                        <form onSubmit={handleCustomUrl}>
                            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4">
                                    <DialogPanel
                                        transition
                                        className="w-full max-w-md rounded-xl bg-white dark:bg-[#181E29] p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
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
                    <table className="w-full mt-6 overflow-hidden rounded-xl text-sm text-left shadow-xl bg-white dark:bg-[#101522] rtl:text-right">

                        <thead className="text-md rounded-xl bg-zinc-200 dark:bg-[#181E29] text-zinc-600 dark:text-white">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Short Link
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Original Link
                                </th>
                                {/* <th scope="col" className="px-6 py-3">
                                    QR Code
                                </th> */}
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
                                        {item.originalUrl}
                                    </td>
                                    {/* <td className="px-6 py-4 w-[150px]">
                                        <img src={item.qrcode} className='w-6 h-6' />
                                    </td> */}
                                    <td className="px-6 py-4 ">
                                        {item.createdAt}
                                    </td>
                                    <td className="px-6 py-4 flex items-center gap-2">
                                        <button onClick={() => handleDelete(item.id)} className="border px-1 rounded-md dark:bg-[#181E29] font-medium dark:text-red-500 cursor-pointer">
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
                </>}
        </div>
    )
}

export default TableData