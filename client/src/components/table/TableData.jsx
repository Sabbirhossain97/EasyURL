import { useState } from 'react'
import { handleCopy } from '../../utils/clipboard';
import { FaCopy } from "react-icons/fa6";
import { BiShow } from "react-icons/bi";
import { IoMdStats } from "react-icons/io";
import { LiaEditSolid } from "react-icons/lia";
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { useNavigate } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
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
        <div>
            <div className="relative overflow-hidden mt-16 lg:mt-20 xl:mt-24">
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
                        <div className='flex [@media(max-width:400px)]:justify-end justify-between'>
                            <h3 className='text-sm [@media(max-width:400px)]:hidden block text-gray-600 dark:text-gray-400 mt-4'>Showing {urls?.length} results</h3>
                            <div className='flex gap-4 items-center pb-4'>
                                <div className='flex items-center gap-4'>
                                    {
                                        selectedUrlId.length > 0 &&
                                        <div>
                                            <button onClick={() => setIsDeleteModalOpen(true)} className="px-2 py-1.5 transition duration-300 bg-red-500 hover:bg-red-400 text-white font-medium flex cursor-pointer group w-full items-center gap-1 rounded-lg">
                                                <MdDelete className='text-lg' /> <span className='hidden sm:block'>Delete</span> {selectedUrlId.length > 0 ? `(${selectedUrlId.length})` : ""}
                                            </button>
                                        </div>
                                    }
                                </div>
                                <SortFilter
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                />
                            </div>
                        </div>
                        <div className="w-full max-h-[420px] overflow-y-auto overflow-x-auto overflow-hidden mt-0 rounded-xl bg-white dark:bg-[#101522]">
                            <table className="w-full text-sm text-left rtl:text-right border-collapse ">
                                <thead className="text-md sticky z-10 top-0 left-0 rounded-t-xl bg-zinc-200 dark:bg-[#181E29] text-zinc-600 dark:text-white">
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
                                            Status
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Created At
                                        </th>
                                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                            Updated At
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
                                            className={`${selectedUrlId.includes(item._id) ? "bg-blue-300/40 divide-none transition duration-300 ease-in-out" : `${index === urls.length - 1 ? 'border-none' : 'border-b border-zinc-300/40 dark:border-gray-700/40'} `}`}
                                        >
                                            <td className='px-6 py-6'>
                                                <input
                                                    id="checkbox-all"
                                                    type="checkbox"
                                                    onChange={(e) => handleCheckboxChange(item._id, e.target.checked)}
                                                    checked={selectedUrlId.includes(item._id)}
                                                    className="w-[14px] h-[14px]" />
                                            </td>
                                            <td data-tooltip-id="my-tooltip" data-tooltip-content={item.shortUrl} className="px-6 w-1/5 py-4 font-medium whitespace-nowrap">
                                                <div className="flex items-center gap-2 ">
                                                    <span className='truncate max-w-[350px]'>{item.shortUrl}</span>
                                                    <span onClick={() => handleCopy(item.shortUrl)} className='cursor-pointer p-2 transition duration-300 bg-zinc-100 hover:bg-zinc-200 dark:bg-[#1C283FB0] dark:hover:bg-white/5 rounded-full'>
                                                        <FaCopy className='text-gray-500 dark:text-white' />
                                                    </span>
                                                </div>
                                            </td>
                                            <td data-tooltip-id="my-tooltip" data-tooltip-content={item.longUrl} className="px-6 py-4 truncate max-w-[250px]">
                                                {item.longUrl}
                                            </td>
                                            <td className="px-6 py-4 text-start">
                                                {item.clickCount}
                                            </td>
                                            <td className="px-6 py-4 text-start">
                                                {item.qr.scans}
                                            </td>
                                            <td className="px-6 py-4 text-start flex gap-2 items-center">
                                                <p>{item.status === 'active' ? "Active" : "Inactive"}</p>
                                                {item.status === 'active' ?
                                                    <span className="relative flex items-center z-0 size-2">
                                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                                                        <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
                                                    </span> :
                                                    <span className='h-2 w-2 bg-red-500 rounded-full'></span>
                                                }
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {new Date(item.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ""}
                                            </td>
                                            <td className="px-6 py-6 flex items-center gap-2">
                                                <button
                                                    onClick={() => {
                                                        setIsUrlViewOpen(true)
                                                        setViewUrl(item)
                                                    }}
                                                    className="px-2 inline-flex gap-1 items py-1 transition text-[12px] duration-300 rounded-md bg-zinc-200 hover:bg-zinc-100 dark:bg-[#1C283FB0] dark:hover:bg-white/10 font-medium items-center cursor-pointer">
                                                    <BiShow className='text-[16px] text-gray-700 dark:text-white' />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setIsCustomUrlModalOpen(true);
                                                        setCustomUrl({ id: item.shortId, name: item.customName })
                                                    }}
                                                    className="px-2 py-1 inline-flex gap-1 text-[12px] transition duration-300 bg-zinc-200 hover:bg-zinc-100 dark:bg-[#1C283FB0] dark:hover:bg-white/10 rounded-md text-white font-medium items-center cursor-pointer">
                                                    <LiaEditSolid className='text-[16px] text-gray-700 dark:text-white' />
                                                </button>
                                                <button
                                                    onClick={() => navigate(
                                                        `/statistics?url=${encodeURIComponent(item.shortUrl)}&id=${item._id}`
                                                    )}
                                                    className="px-2 py-1 inline-flex gap-1 text-[12px] transition duration-300 bg-zinc-200 hover:bg-zinc-100 dark:bg-[#1C283FB0] dark:hover:bg-white/10 rounded-md text-white font-medium items-center cursor-pointer"
                                                >
                                                    <IoMdStats className='text-[16px] text-gray-700 dark:text-white' />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <h3 className='text-sm text-center [@media(min-width:400px)]:hidden text-gray-600 dark:text-gray-400 mt-4'>Showing {urls?.length} results</h3>
                    </div>
                }
            </div>
            <ReactTooltip
                id="my-tooltip"
                place="top"
                arrowColor="black"
                className="max-w-[500px] break-words whitespace-pre-wrap z-[1000]"
            />
        </div>
    )
}

export default TableData