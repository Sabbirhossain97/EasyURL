import { useState } from 'react'
import { Button, Dialog, DialogPanel, DialogBackdrop, DialogTitle } from '@headlessui/react'
import { Spinner } from '../svg/SVG';
import { customizeUrl } from '../../services/urlService';
import toast from 'react-hot-toast';

function CustomUrlModal({ isCustomUrlModalOpen, setIsCustomUrlModalOpen, customUrl, setCustomUrl, setUrls }) {

    const [loading, setLoading] = useState(false)

    function close() {
        setIsCustomUrlModalOpen(false)
        setCustomUrl({
            id: null,
            name: ""
        })
    }

    const handleCustomUrlName = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const data = await customizeUrl(customUrl);
            setTimeout(() => {
                setUrls(data?.updatedUrl)
                toast.success("URL customized!", { position: 'bottom-right' });
                setLoading(false)
                close()
            }, 2000)

        } catch (err) {
            setTimeout(() => {
                toast.error(err?.error, { position: 'top-center' });
                setLoading(false);
            }, 2000);
        }
    }

    return (
        <Dialog open={isCustomUrlModalOpen} as="div" transition className="relative z-10 focus:outline-none" onClose={close}>
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
                                className="border focus:border-sky-400 dark:focus:border-blue-500 transition duration-300 outline-none w-full mt-2 placeholder:text-[14px] bg-white dark:bg-[#181E29] border-zinc-200 dark:border-zinc-700 rounded-md p-2"
                                placeholder="Enter your custom name here..."
                                onChange={(e) => setCustomUrl({ ...customUrl, name: e.target.value })}
                                value={customUrl.name}
                                required
                            />
                            <div className="mt-4">
                                <Button
                                    type='submit'
                                    className="inline-flex cursor-pointer transition duration-300 items-center gap-2 rounded-md bg-sky-400 dark:bg-white/10 px-3 py-1.5 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-sky-500 dark:data-hover:bg-white/15 data-open:bg-gray-700"
                                >
                                    {loading ? <><Spinner /> Processing...</> : "Update"}
                                </Button>
                            </div>
                        </DialogPanel>
                    </div>
                </div>
            </form>
        </Dialog>
    )
}

export default CustomUrlModal