import { useState } from 'react'
import { Button, Dialog, DialogPanel, DialogBackdrop, DialogTitle, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Spinner } from '../svg/SVG';
import { FaChevronDown } from "react-icons/fa";
import { customizeUrl } from '../../services/urlService';
import { IoMdClose } from "react-icons/io";
import toast from 'react-hot-toast';

function CustomUrlModal({ isCustomUrlModalOpen, setIsCustomUrlModalOpen, customUrl, setCustomUrl, setUrls }) {

    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState(customUrl.name)

    function close() {
        setIsCustomUrlModalOpen(false)
        setTimeout(() => {
            setCustomUrl({
                id: null,
                name: ""
            })
        }, 1000)
    }

    const handleCustomUrlName = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const data = await customizeUrl(customUrl, status);
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
                <div className="fixed inset-0 z-[1000] w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md relative rounded-xl shadow-xl bg-white dark:bg-[#181E29] p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base/7 font-medium dark:text-white">
                                Customize your URL
                            </DialogTitle>
                            <IoMdClose onClick={close} className='absolute transition duration-300 hover:text-gray-400 dark:hover:text-white/50 cursor-pointer text-lg top-4 right-4' />
                            <input
                                className="border focus:border-sky-400 dark:focus:border-blue-500 transition duration-300 outline-none w-full mt-2 placeholder:text-[14px] bg-white dark:bg-[#181E29] border-zinc-200 dark:border-zinc-700 rounded-md p-2"
                                placeholder="Enter your custom name here..."
                                onChange={(e) => setCustomUrl({ ...customUrl, name: e.target.value.toLowerCase() })}
                                value={customUrl.name}
                            />
                            <div className='mt-4 w-full relative'>
                                <DialogTitle as="h3" className="text-base/7 font-medium dark:text-white">
                                    Set status
                                </DialogTitle>
                                <Menu>
                                    {({ open }) => (
                                        <>
                                            <MenuButton className="inline-flex relative cursor-pointer mt-2 w-full border border-zinc-300 dark:border-zinc-700 items-center gap-2 rounded-md px-3 py-1.5 text-sm/6 font-semibold text-gray-600 dark:text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white">
                                                {status === 'active' ? 'Active' : 'Inactive'}
                                                <FaChevronDown className={`size-3 transition duration-300  ${open ? 'rotate-180' : ''
                                                    } absolute right-4 top-3 dark:fill-white/60`} />
                                            </MenuButton>
                                            <MenuItems
                                                transition
                                                anchor="bottom end"
                                                className="min-w-[400px] z-[1500] rounded-xl border border-zinc-300 dark:border-none bg-white dark:bg-zinc-900 shadow-xl p-1 text-sm/6 transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                                            >
                                                <MenuItem>
                                                    <button onClick={() => setStatus('active')} className="group cursor-pointer transition duration-300 flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-zinc-100 dark:data-focus:bg-zinc-800">
                                                        Active
                                                    </button>
                                                </MenuItem>
                                                <MenuItem>
                                                    <button onClick={() => setStatus('inactive')} className="group cursor-pointer transition duration-300 flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-zinc-100 dark:data-focus:bg-zinc-800">
                                                        Inactive
                                                    </button>
                                                </MenuItem>
                                            </MenuItems>
                                        </>
                                    )}
                                </Menu>
                            </div>
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