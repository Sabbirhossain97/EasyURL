import { useState } from 'react';
import { Button, Dialog, DialogPanel, DialogBackdrop, DialogTitle } from '@headlessui/react'
import { FaCopy } from "react-icons/fa6";
import { IoMdStats } from "react-icons/io";
import { LuDownload } from "react-icons/lu";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, WhatsappShareButton, FacebookIcon, TwitterIcon, LinkedinIcon, WhatsappIcon } from 'react-share'
import { Spinner } from '../svg/SVG';
import { handleCopy } from '../../utils/clipboard';
import { handleDownloadQR } from '../../utils/downloadQR';

function ViewUrlModal({ isUrlViewOpen, setIsUrlViewOpen, viewUrl, setViewUrl }) {

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
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-[500px] rounded-xl shadow-xl bg-white dark:bg-[#181E29] p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                        <DialogTitle as="h3" className="text-base/7 font-bold dark:text-white">
                            Your shortened URL
                        </DialogTitle>
                        <div className='mt-2 flex [@media(max-width:530px)]:flex-col sm:flex-row gap-2 items-center'>
                            <h3 className='text-sm w-full px-6 py-1.5 rounded-md bg-gray-200 dark:bg-white/10'>{viewUrl.shortUrl}</h3>
                            <div className='w-full flex gap-2'>
                                <Button
                                    type='button'
                                    onClick={() => handleCopy(viewUrl.shortUrl)}
                                    className="inline-flex w-1/2 [@media(min-width:530px)]:w-full justify-center items-center cursor-pointer transition duration-300 gap-2 rounded-md bg-gray-700 dark:bg-white/10 px-3 py-1 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                >
                                    <FaCopy />
                                    Copy
                                </Button>
                                <Button
                                    type='submit'
                                    className="inline-flex w-1/2 [@media(min-width:530px)]:w-full justify-center items-center cursor-pointer transition duration-300 gap-2 rounded-md bg-gray-700 dark:bg-white/10 px-3 py-1 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                >
                                    <IoMdStats className='text-lg' />
                                    Statistics
                                </Button>
                            </div>
                        </div>
                        <div className='mt-6'>
                            <h3>Share</h3>
                            <div className="flex gap-2 mt-2">
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
                            </div>
                        </div>
                        <div className='mt-10 flex flex-col items-center gap-4 justify-center'>
                            <div>
                                <img src={viewUrl.qrCode} width="300px" height="300px" />
                            </div>
                            <div>
                                <Button
                                    type='button'
                                    onClick={() => handleDownloadQR(viewUrl, setLoading)}
                                    className="inline-flex items-center cursor-pointer transition duration-300 gap-2 rounded-md bg-gray-700 dark:bg-white/10 px-3 py-1 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700"
                                >
                                    {loading ? <Spinner /> : <LuDownload />}
                                    {loading ? "Downloading..." : "Download QR Code"}
                                </Button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default ViewUrlModal