import { useState } from 'react'
import { handleCopy } from '../../utils/clipboard';
import { deleteUrl } from '../../services/urlService';
import { FaCopy } from "react-icons/fa6";
import toast from 'react-hot-toast';
import ViewUrlModal from "../modals/ViewUrlModal"
import CustomUrlModal from '../modals/CustomUrlModal';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { IoFilterSharp } from "react-icons/io5";

function TableData({ urls, setUrls, sortBy, setSortBy }) {

    let [isCustomUrlModalOpen, setIsCustomUrlModalOpen] = useState(false)
    let [customUrl, setCustomUrl] = useState({
        id: null,
        name: ""
    });
    let [isUrlViewOpen, setIsUrlViewOpen] = useState(false)
    let [viewUrl, setViewUrl] = useState({});


    const handleDelete = async (id) => {
        try {
            const data = await deleteUrl(id)
            setUrls(prev => prev.filter(url => url._id !== id))
            toast.success(data?.message, {
                position: 'bottom-right'
            });
        } catch (err) {
            toast.success(err?.error, {
                position: 'bottom-right'
            });
        }
    }

    return (
        <div className="relative overflow-hidden mt-24">
            <ViewUrlModal
                isUrlViewOpen={isUrlViewOpen}
                setIsUrlViewOpen={setIsUrlViewOpen}
                viewUrl={viewUrl}
                setViewUrl={setViewUrl}
            />
            <CustomUrlModal
                isCustomUrlModalOpen={isCustomUrlModalOpen}
                setIsCustomUrlModalOpen={setIsCustomUrlModalOpen}
                customUrl={customUrl}
                setCustomUrl={setCustomUrl}
                setUrls={setUrls}
            />
            {urls?.length > 0 &&
                <div className='flex flex-col'>
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='text-xl'>History ({urls.length}) </h1>
                        </div>
                        <div className='flex gap-2'>
                            <div className='flex'>
                                <h3 className='flex items-center gap-2'><IoFilterSharp /> <span>Filter By</span></h3>
                            </div>
                            <Menu>
                                <MenuButton className="inline-flex items-center gap-2 rounded-md bg-sky-400 data-hover:bg-sky-500 dark:bg-white/10 px-3 py-1.5 text-sm/6 font-semibold text-white transition duration-300 cursor-pointer focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white dark:data-hover:bg-white/15 data-open:bg-sky-500 dark:data-open:bg-white/15">
                                    {sortBy.field}
                                </MenuButton>
                                <MenuItems
                                    transition
                                    anchor="bottom end"
                                    className="w-52 origin-top-right shadow-xl rounded-xl border border-white/5 bg-white dark:bg-gray-900 p-1 text-sm/6 text-gray-900 dark:text-white transition duration-100 ease-out [--anchor-gap:--spacing(1)] focus:outline-none data-closed:scale-95 data-closed:opacity-0"
                                >
                                    <MenuItem>
                                        <button onClick={() => setSortBy({ slug: 'clickCount_desc', field: 'Clicks ( most )' })} className="group cursor-pointer flex w-full items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800/50">
                                            Clicks ( most )
                                        </button>
                                    </MenuItem>
                                    <MenuItem>
                                        <button onClick={() => setSortBy({ slug: 'clickCount_asc', field: 'Clicks ( least )' })} className="group cursor-pointer flex w-full items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800/50">
                                            Clicks ( least )
                                        </button>
                                    </MenuItem>
                                    <MenuItem>
                                        <button onClick={() => setSortBy({ slug: 'createdAt_desc', field: 'Date ( newest )' })} className="group cursor-pointer flex w-full items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800/50">
                                            Date Added ( newest )
                                        </button>
                                    </MenuItem>
                                    <MenuItem>
                                        <button onClick={() => setSortBy({ slug: 'createdAt_asc', field: 'Date ( oldest )' })} className="group cursor-pointer flex w-full items-center gap-2 rounded-lg px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800/50">
                                            Date Added ( oldest )
                                        </button>
                                    </MenuItem>
                                </MenuItems>
                            </Menu>
                        </div>
                    </div>
                    <div className="w-full max-h-[420px] overflow-y-auto mt-4 rounded-xl shadow-xl bg-white dark:bg-[#101522]">
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
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
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
                                        <td className="px-6 py-4 text-start">
                                            {item.clickCount}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {new Date(item.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-4 flex items-center gap-2">
                                            <button onClick={() => handleDelete(item._id)} className="px-2 py-1 transition duration-300 hover:bg-red-600 rounded-md bg-red-500 font-medium text-white cursor-pointer">
                                                Delete
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsUrlViewOpen(true)
                                                    setViewUrl(item)
                                                }}
                                                className="px-2 py-1 transition duration-300 hover:bg-green-600 rounded-md bg-green-500 text-white font-medium flex items-center cursor-pointer">
                                                <span> View </span>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsCustomUrlModalOpen(true);
                                                    setCustomUrl({ ...customUrl, id: item.shortId })
                                                }}
                                                className="px-2 py-1 transition duration-300 hover:bg-blue-600 rounded-md bg-blue-500 text-white font-medium flex items-center cursor-pointer">
                                                <span> Customize</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>}
        </div>
    )
}

export default TableData