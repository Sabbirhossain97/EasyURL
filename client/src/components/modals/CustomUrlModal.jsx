import { useState, useEffect } from 'react'
import { Button, Dialog, DialogPanel, DialogBackdrop, DialogTitle, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Spinner } from '../svg/SVG';
import { FaChevronDown } from "react-icons/fa";
import { customizeUrl } from '../../services/urlService';
import { IoMdClose } from "react-icons/io";
import toast from 'react-hot-toast';
import { Tooltip } from 'react-tooltip'
import { RiInformationLine } from "react-icons/ri";

function CustomUrlModal({ isCustomUrlModalOpen, setIsCustomUrlModalOpen, customUrl, setCustomUrl, setUrls }) {

    const [loading, setLoading] = useState(false)
    const [_, setStatus] = useState(customUrl?.status || 'active')

    function close() {
        setIsCustomUrlModalOpen(false)
        setTimeout(() => {
            setCustomUrl({
                id: null,
                name: "",
                status: ""
            })
        }, 500)
    }

    useEffect(() => {
        if (customUrl?.status) {
            setStatus(customUrl.status);
        }
    }, [customUrl?.status]);

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
                <div className="fixed inset-0 z-[1000] w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md relative rounded-xl shadow-xl bg-white dark:bg-[#181E29] p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                        >
                            <DialogTitle as="h3" className="text-base/7 font-medium dark:text-white flex items-center gap-2">
                                Customize your URL
                                <span data-tooltip-id="my-tooltip"><RiInformationLine className='text-gray-500 dark:text-white' /></span>
                                <Tooltip id="my-tooltip" place="right" effect="solid">
                                    <div style={{ maxWidth: "250px" }}>
                                        <p>Conditions:</p>
                                        <ul style={{ margin: 0 }}>
                                            <li>✅ Must contain at least one letter</li>
                                            <li>✅ Can include letters, numbers, hyphens (-), underscores (_)</li>
                                            <li>✅ Cannot be numbers only</li>
                                            <li>✅ Length: 4–30 characters</li>
                                        </ul>
                                    </div>
                                </Tooltip>
                            </DialogTitle>
                            <IoMdClose onClick={close} className='absolute transition duration-300 hover:text-gray-400 dark:hover:text-white/50 cursor-pointer text-lg top-4 right-4' />
                            <input
                                className="border focus:border-sky-400 dark:focus:border-blue-500 transition duration-300 outline-none w-full mt-2 placeholder:text-[14px] bg-white dark:bg-[#181E29] border-zinc-200 dark:border-zinc-700 rounded-md p-2"
                                placeholder="Enter your custom name here..."
                                onChange={(e) => setCustomUrl({ ...customUrl, name: e.target.value.toLowerCase() })}
                                value={customUrl.name}
                            />
                            <div className="mt-4 w-full">
                                <DialogTitle as="h3" className="text-base/7 font-medium dark:text-white">
                                    Set status
                                </DialogTitle>

                                <Menu>
                                    {({ open }) => (
                                        <div className="relative w-full">
                                            <MenuButton className="inline-flex cursor-pointer mt-2 w-full border border-zinc-300 dark:border-zinc-700 items-center gap-2 rounded-md px-3 py-1.5 text-sm/6 font-semibold text-gray-600 dark:text-white">
                                                {customUrl.status === 'active' ? 'Active' : 'Inactive'}
                                                <FaChevronDown
                                                    className={`size-3 transition duration-300 absolute right-4 top-5 dark:fill-white/60 ${open ? 'rotate-180' : ''
                                                        }`}
                                                />
                                            </MenuButton>

                                            <MenuItems
                                                transition
                                                className="absolute left-0 top-full mt-1 w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-[#181E29] shadow-xl p-1 text-sm/6 transition duration-100 ease-out focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                                            >
                                                <MenuItem>
                                                    {({ close }) => (
                                                        <button
                                                            type='button'
                                                            onClick={() => {
                                                                if (customUrl.status !== 'active') {
                                                                    setCustomUrl((prev) => ({
                                                                        ...prev,
                                                                        status: 'active',
                                                                    }));
                                                                }
                                                                close();
                                                            }}
                                                            className="group cursor-pointer flex w-full items-center gap-2 transition duration-300 rounded-lg px-3 py-1.5 data-focus:bg-zinc-100 dark:data-focus:bg-white/10"
                                                        >
                                                            Active
                                                        </button>
                                                    )}
                                                </MenuItem>
                                                <MenuItem>
                                                    {({ close }) => (
                                                        <button
                                                            type='button'
                                                            onClick={() => {
                                                                if (customUrl.status !== 'inactive') {
                                                                    setCustomUrl((prev) => ({
                                                                        ...prev,
                                                                        status: 'inactive',
                                                                    }));
                                                                }
                                                                close();
                                                            }}
                                                            className="group cursor-pointer flex w-full items-center gap-2 transition duration-300 rounded-lg px-3 py-1.5 data-focus:bg-zinc-100 dark:data-focus:bg-white/10"
                                                        >
                                                            Inactive
                                                        </button>
                                                    )}
                                                </MenuItem>
                                            </MenuItems>
                                        </div>
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