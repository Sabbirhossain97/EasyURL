import { useState } from 'react'
import { handleCopy } from '../../utils/clipboard';
import { deleteUrl } from '../../services/urlService';
import { FaCopy } from "react-icons/fa6";
import toast from 'react-hot-toast';
import ViewUrlModal from "../modals/ViewUrlModal"
import CustomUrlModal from '../modals/CustomUrlModal';

function TableData({ urls, setUrls }) {

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
                <>
                    <h1 className='text-xl'>History ({urls.length}) </h1>
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
                                        <td className="px-6 py-4 text-start">
                                            {item.clickCount}
                                        </td>
                                        <td className="px-6 py-4 ">
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
                </>}
        </div>
    )
}

export default TableData