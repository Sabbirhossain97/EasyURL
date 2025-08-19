import { useState } from 'react'
import { Button, Dialog, DialogPanel, DialogBackdrop, DialogTitle } from '@headlessui/react'
import { IoWarning } from "react-icons/io5";
import { Spinner } from '../svg/SVG';
import { deleteUrls } from '../../services/urlService';
import toast from 'react-hot-toast';

function DeleteConfirmModal({ isDeleteModalOpen, setIsDeleteModalOpen, setUrls, selectedUrlId, setSelectedUrlId }) {

    const [loading, setLoading] = useState(false);

    function close() {
        setIsDeleteModalOpen(false)
    }

    const handleMultiDelete = async () => {
        setLoading(true)
        try {
            const data = await deleteUrls(selectedUrlId);
            setTimeout(() => {
                setUrls(prev => prev.filter(url => !selectedUrlId.includes(url._id)))
                setSelectedUrlId([])
                toast.success(data?.message, {
                    position: 'bottom-right'
                });
                setLoading(false)
                close()
            }, 1000)

        } catch (err) {
            setTimeout(() => {
                toast.error(err?.error, { position: 'top-center' });
                setLoading(false);
                close()
            }, 1000);
        }
    }

    return (
        <Dialog open={isDeleteModalOpen} as="div" transition className="relative z-10 focus:outline-none" onClose={close}>
            <DialogBackdrop className="fixed inset-0 backdrop-blur-sm" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-md rounded-xl shadow-xl bg-white dark:bg-[#181E29] p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                        <DialogTitle as="h3" className="text-base/7 flex justify-center font-medium text-center dark:text-white">
                            <IoWarning className='text-5xl text-yellow-400' />
                        </DialogTitle>
                        <h3 className='text-center py-4'>Are you sure you want to delete these {selectedUrlId.length > 0 ? " URLs" : "URL"}?</h3>
                        <div className="mt-2 flex justify-center gap-4">
                            <Button
                                type='button'
                                onClick={() => setIsDeleteModalOpen(false)}
                                className="inline-flex cursor-pointer transition duration-300 items-center gap-2 rounded-md bg-sky-400 dark:bg-white/10 px-3 py-1.5 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-sky-500 dark:data-hover:bg-white/15 data-open:bg-gray-700"
                            >
                                Cancel
                            </Button>
                            <Button
                                type='button'
                                onClick={() => handleMultiDelete()}
                                className="inline-flex cursor-pointer transition duration-300 items-center gap-2 rounded-md bg-sky-400 dark:bg-white/10 px-3 py-1.5 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-sky-500 dark:data-hover:bg-white/15 data-open:bg-gray-700"
                            >
                                {loading ? <><Spinner /> Processing...</> : "Delete"}
                            </Button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}

export default DeleteConfirmModal