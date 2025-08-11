import { useState } from 'react';
import { Button, Dialog, DialogPanel, DialogBackdrop, DialogTitle } from '@headlessui/react'
import { FaCopy } from "react-icons/fa6";
import { IoMdStats } from "react-icons/io";
import { LuDownload } from "react-icons/lu";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from 'react-share'
import { Spinner } from '../svg/SVG';
import { handleCopy } from '../../utils/clipboard';
import { handleDownloadQR } from '../../utils/downloadQR';
import { useNavigate } from 'react-router-dom';
import { IoWarning } from "react-icons/io5";

function ViewUrlModal({ isUrlViewOpen, setIsUrlViewOpen, viewUrl, setViewUrl }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    function close() {
        setIsUrlViewOpen(false)
        setTimeout(() => {
            setViewUrl({})
        }, 500)
    }

    return (
        <Dialog open={isUrlViewOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
            <DialogBackdrop className="fixed inset-0 backdrop-blur-sm" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-2 sm:p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-[500px] rounded-xl shadow-xl bg-white dark:bg-[#181E29] p-4 sm:p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                        <DialogTitle as="h3" className="text-base/7 font-bold dark:text-white">
                            Your shortened URL
                        </DialogTitle>
                        <div className='mt-2 flex gap-2 items-center w-full'>
                            <h3 className='text-sm w-full px-4 py-1.5 rounded-md bg-gray-200 dark:bg-white/10'>{viewUrl.shortUrl}</h3>
                            <div className='w-full flex gap-2 flex-1'>
                                <Button
                                    type='button'
                                    onClick={() => handleCopy(viewUrl.shortUrl)}
                                    className="inline-flex  justify-center items-center cursor-pointer transition duration-300 gap-2 rounded-md bg-gray-700 dark:bg-white/10 px-3 py-1.5 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                >
                                    <FaCopy />
                                </Button>
                                <Button
                                    type='submit'
                                    onClick={() => navigate(
                                        `/statistics?url=${encodeURIComponent(viewUrl.shortUrl)}&id=${viewUrl._id}`
                                    )}
                                    className="inline-flex justify-center items-center cursor-pointer transition duration-300 gap-2 rounded-md bg-gray-700 dark:bg-white/10 px-3 py-1.5 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                >
                                    <IoMdStats className='text-lg' />
                                </Button>
                            </div>
                        </div>
                        <div className='mt-6'>
                            <h3>Share</h3>
                            {viewUrl.status === 'active' ? <div className="flex gap-2 mt-2">
                                <FacebookShareButton url={viewUrl?.shortUrl}>
                                    <FacebookIcon size={32} round />
                                </FacebookShareButton>

                                <TwitterShareButton url={viewUrl?.shortUrl}>
                                    <TwitterIcon size={32} round />
                                </TwitterShareButton>

                                <LinkedinShareButton url={viewUrl?.shortUrl}>
                                    <LinkedinIcon size={32} round />
                                </LinkedinShareButton>

                                <WhatsappShareButton url={viewUrl?.shortUrl}>
                                    <WhatsappIcon size={32} round />
                                </WhatsappShareButton>
                            </div> : <p className='text-sm mt-2 flex gap-1 items-center'>
                                <IoWarning className='text-lg text-yellow-400' /> <span className='text-gray-600'>You have to activate your link to share them</span>
                            </p>}
                        </div>
                        <div className='mt-10 flex flex-col items-center gap-4 justify-center'>
                            <div>
                                {viewUrl.status === 'active' ? <img src={viewUrl?.qr?.code} alt='qr_code' width="300px" height="300px" /> : 
                                 <div className='h-[300px] w-[300px] border border-dashed border-gray-300 rounded-md dark:border-zinc-700 flex items-center justify-center'>QR not available</div> }
                            </div>
                            <div>
                                {viewUrl.status === 'active' ? <Button
                                    type='button'
                                    disabled
                                    onClick={() => handleDownloadQR(viewUrl, setLoading)}
                                    className="inline-flex items-center cursor-pointer transition duration-300 gap-2 rounded-md bg-gray-700 dark:bg-white/10 px-3 py-1 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                >
                                    {loading ? <Spinner /> : <LuDownload />}
                                    {loading ? "Downloading..." : "Download QR Code"}
                                </Button> : <Button
                                    type='button'
                                    disabled
                                    className="inline-flex items-center cursor-pointer transition duration-300 gap-2 rounded-md bg-gray-700 dark:bg-white/10 px-3 py-1 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                >

                                    <IoWarning className='text-lg text-yellow-400' />Activate your link for download
                                </Button>}
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div >
        </Dialog >
    )
}

export default ViewUrlModal