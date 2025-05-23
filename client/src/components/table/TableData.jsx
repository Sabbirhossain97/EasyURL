import { useState } from 'react'
import { handleCopy } from '../../utils/clipboard';
import { FaCopy } from "react-icons/fa6";
import { BiShow } from "react-icons/bi";
import { IoMdStats } from "react-icons/io";
import { LiaEditSolid } from "react-icons/lia";
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { useNavigate } from 'react-router-dom';
import DeleteConfirmModal from '../modals/DeleteConfirmModal';
import ViewUrlModal from "../modals/ViewUrlModal"
import CustomUrlModal from '../modals/CustomUrlModal';
import SortFilter from '../filters/SortFilter';

function TableData({ urls, setUrls, sortBy, setSortBy }) {
    const navigate = useNavigate();
    let [isCustomUrlModalOpen, setIsCustomUrlModalOpen] = useState(false);
    let [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    let [isUrlViewOpen, setIsUrlViewOpen] = useState(false)
    let [viewUrl, setViewUrl] = useState({});
    let [selectedUrlId, setSelectedUrlId] = useState([])
    let [customUrl, setCustomUrl] = useState({
        id: null,
        name: ""
    });

    const handleCheckboxChange = (urlId, isChecked) => {
        setSelectedUrlId((prevSelectedIds) => isChecked ? [...prevSelectedIds, urlId] : prevSelectedIds.filter((itemId) => itemId !== urlId))
    }

    const handleSelectAll = (isChecked) => {
        if (isChecked) {
            setSelectedUrlId(urls?.map((url) => url._id));
        } else {
            setSelectedUrlId([]);
        }
    };

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
                urls={urls}
                setUrls={setUrls}
                selectedUrlId={selectedUrlId}
                setSelectedUrlId={setSelectedUrlId}
            />
            {urls?.length > 0 &&
                <div className='flex flex-col'>
                    <div className='flex justify-end gap-4'>
                        <div className='flex items-center gap-4'>
                            {
                                selectedUrlId.length > 0 &&
                                <div>
                                    <button onClick={() => setIsDeleteModalOpen(true)} className="px-6 py-1.5 transition duration-300 bg-red-500 hover:bg-red-400 text-white font-medium flex cursor-pointer group w-full items-center gap-2 rounded-lg">
                                        Delete {selectedUrlId.length > 0 ? `(${selectedUrlId.length})` : ""}
                                    </button>
                                </div>
                            }
                        </div>
                        <SortFilter
                            sortBy={sortBy}
                            setSortBy={setSortBy}
                        />
                    </div>
                    <div className="w-full max-h-[420px] overflow-y-auto overflow-x-auto overflow-hidden mt-4 rounded-xl bg-white dark:bg-[#101522]">
                        <table className="w-full text-sm text-left rtl:text-right border-collapse">
                            <thead className="text-md rounded-t-xl bg-zinc-200 dark:bg-[#181E29] text-zinc-600 dark:text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-4 flex items-center">
                                        <input
                                            id="checkbox-all"
                                            type="checkbox"
                                            onChange={(e) => handleSelectAll(e.target.checked)}
                                            checked={selectedUrlId.length === urls?.length}
                                            className="w-[14px] h-[14px]" />
                                    </th>
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
                                    <tr
                                        key={index}
                                        className={`${selectedUrlId.includes(item._id) ? "bg-blue-300/40 divide-none" : "divide-y divide-zinc-300/40 dark:divide-gray-700/40"}`}
                                 >
                                        <td className='px-6 py-6'>
                                            <input
                                                id="checkbox-all"
                                                type="checkbox"
                                                onChange={(e) => handleCheckboxChange(item._id, e.target.checked)}
                                                checked={selectedUrlId.includes(item._id)}
                                                className="w-[14px] h-[14px]" />
                                        </td>
                                        <td className="px-6 w-1/5 py-4 font-medium whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                {item.shortUrl}
                                                <span onClick={() => handleCopy(item.shortUrl)} className='cursor-pointer p-2 bg-zinc-100 dark:bg-[#1C283FB0] rounded-full'>
                                                    <FaCopy className='text-gray-500 dark:text-white' />
                                                </span>
                                            </div>
                                        </td>
                                        <td data-tooltip-id="my-tooltip" data-tooltip-content={item.longUrl} className="px-6 py-4 truncate max-w-[250px]">
                                            <ReactTooltip
                                                id="my-tooltip"
                                                place="top"
                                                arrowColor="black"
                                            />
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
                                                    setIsUrlViewOpen(true)
                                                    setViewUrl(item)
                                                }}
                                                className="px-2 inline-flex gap-1 items py-1 transition text-[12px] duration-300 rounded-md bg-sky-400 hover:bg-sky-500 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-medium items-center cursor-pointer">
                                                <BiShow className='text-[14px]' />
                                                <span> View </span>
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setIsCustomUrlModalOpen(true);
                                                    setCustomUrl({ ...customUrl, id: item.shortId })
                                                }}
                                                className="px-2 py-1 inline-flex gap-1 text-[12px] transition duration-300 bg-sky-400 hover:bg-sky-500 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-md text-white font-medium items-center cursor-pointer">
                                                <LiaEditSolid className='text-[14px]' />
                                                <span> Edit</span>
                                            </button>
                                            <button
                                                onClick={() => navigate(
                                                    `/statistics?url=${encodeURIComponent(item.shortUrl)}&id=${item._id}`
                                                )}
                                                className="px-2 py-1 inline-flex gap-1 text-[12px] transition duration-300 bg-sky-400 hover:bg-sky-500 dark:bg-blue-600 dark:hover:bg-blue-500 rounded-md text-white font-medium items-center cursor-pointer"
                                            >
                                                <IoMdStats className='text-[14px]' />
                                                <span>Statistics</span>
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