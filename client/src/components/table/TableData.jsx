import { useState } from 'react'
import { handleCopy } from '../../utils/clipboard';
import { FaCopy } from "react-icons/fa6";
import DeleteConfirmModal from '../modals/DeleteConfirmModal';
import ViewUrlModal from "../modals/ViewUrlModal"
import CustomUrlModal from '../modals/CustomUrlModal';
import SortFilter from '../filters/SortFilter';

function TableData({ urls, setUrls, sortBy, setSortBy }) {

    let [isCustomUrlModalOpen, setIsCustomUrlModalOpen] = useState(false);
    let [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    let [isUrlViewOpen, setIsUrlViewOpen] = useState(false)
    let [viewUrl, setViewUrl] = useState({});
    let [customUrl, setCustomUrl] = useState({
        id: null,
        name: ""
    });
    const [selectedId, setSelectedId] = useState(null)

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
            <DeleteConfirmModal
                isDeleteModalOpen={isDeleteModalOpen}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                setUrls={setUrls}
            />

            {urls?.length > 0 &&
                <div className='flex flex-col'>
                    <div className='flex justify-between'>
                        <div>
                            <h1 className='text-xl'>History ({urls.length}) </h1>
                        </div>
                        <SortFilter
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                        />
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
                                    <th scope="col" className="px-6 py-3">
                                        QR Scans
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
                                        <td className="px-6 py-4 text-start">
                                            {item.qr.scans}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {new Date(item.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-4 flex items-center gap-2">
                                            <button
                                                onClick={() => {
                                                    setSelectedId(item._id)
                                                    setIsDeleteModalOpen(true)
                                                }}
                                                className="px-2 py-1 transition duration-300 hover:bg-red-600 rounded-md bg-red-500 font-medium text-white cursor-pointer">
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