
import { useState, useMemo, useEffect } from 'react'
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
import { TbExternalLink } from "react-icons/tb";
import { IoPricetagSharp } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { MdDelete, MdTableRows, MdGridView } from "react-icons/md";
import CardView from '../card/CardView';
import { IoIosSearch } from "react-icons/io";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
function TableData({ urls, setUrls, sortBy, setSortBy }) {

    const navigate = useNavigate();
    const [isCustomUrlModalOpen, setIsCustomUrlModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isUrlViewOpen, setIsUrlViewOpen] = useState(false);
    const [viewUrl, setViewUrl] = useState({});
    const [selectedUrlId, setSelectedUrlId] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [viewMode, setViewMode] = useState("table");
    const [currentPage, setCurrentPage] = useState(1);
    const CARDS_PER_PAGE = 8;
    const [customUrl, setCustomUrl] = useState({
        id: null,
        name: "",
        status: "",
        tags: []
    });

    const filteredUrls = useMemo(() => {

        const query = searchQuery.trim().toLowerCase();

        if (!query) {
            return urls;
        }

        const searchTerms = query.split(/\s+/);

        return urls.filter((url) => {

            const searchableText = [
                url.customName,
                ...(url.tags || []),
                url.shortUrl,
                url.longUrl
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return searchTerms.every((term) =>
                searchableText.includes(term)
            );
        });

    }, [urls, searchQuery]);

    const handleCheckboxChange = (urlId, isChecked) => {

        setSelectedUrlId((prevSelectedIds) =>
            isChecked
                ? [...prevSelectedIds, urlId]
                : prevSelectedIds.filter((itemId) => itemId !== urlId)
        );

    };

    const handleSelectAll = (isChecked) => {

        if (isChecked) {
            setSelectedUrlId(
                filteredUrls.map((url) => url._id)
            );

        } else {
            setSelectedUrlId([]);
        }

    };

    const allVisibleSelected =
        filteredUrls.length > 0 &&
        filteredUrls.every((url) =>
            selectedUrlId.includes(url._id)
        );

    const totalPages = Math.ceil(filteredUrls.length / CARDS_PER_PAGE);

    const paginatedUrls = useMemo(() => {
        const startIndex = (currentPage - 1) * CARDS_PER_PAGE;

        return filteredUrls.slice(
            startIndex,
            startIndex + CARDS_PER_PAGE
        );
    }, [filteredUrls, currentPage]);

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    useEffect(() => {
        setCurrentPage((page) =>
            Math.min(
                page,
                Math.max(totalPages, 1)
            )
        );
    }, [totalPages]);

    return (
        <div>

            <div className="relative overflow-hidden mt-16 lg:mt-20 xl:mt-24 mx-auto">

                {/* VIEW URL MODAL */}
                <ViewUrlModal
                    isUrlViewOpen={isUrlViewOpen}
                    setIsUrlViewOpen={setIsUrlViewOpen}
                    viewUrl={viewUrl}
                    setViewUrl={setViewUrl}
                />

                {/* CUSTOM URL MODAL */}
                <CustomUrlModal
                    isCustomUrlModalOpen={isCustomUrlModalOpen}
                    setIsCustomUrlModalOpen={setIsCustomUrlModalOpen}
                    customUrl={customUrl}
                    setCustomUrl={setCustomUrl}
                    setUrls={setUrls}
                />

                {/* DELETE MODAL */}
                <DeleteConfirmModal
                    isDeleteModalOpen={isDeleteModalOpen}
                    setIsDeleteModalOpen={setIsDeleteModalOpen}
                    setUrls={setUrls}
                    selectedUrlId={selectedUrlId}
                    setSelectedUrlId={setSelectedUrlId}
                />

                {urls?.length > 0 && (

                    <div className='flex flex-col'>
                        <div className='flex mx-auto pb-4 lg:w-5/6 [@media(max-width:400px)]:justify-end justify-between'>
                            <div className='flex items-center gap-4'>
                                <div className="flex items-center gap-1 p-1 rounded-lg bg-zinc-200 dark:bg-[#181E29]">
                                    <button
                                        onClick={() => setViewMode("table")}
                                        className={`p-1.5 cursor-pointer rounded-md transition duration-300
                                                 ${viewMode === "table"
                                                ? "bg-white dark:bg-[#1C283F] shadow-sm text-sky-400 dark:text-blue-500"
                                                : "text-gray-500 hover:text-gray-700 dark:hover:text-white"
                                            }`}
                                    >
                                        <MdTableRows className="text-lg" />
                                    </button>

                                    <button
                                        onClick={() => setViewMode("card")}
                                        className={`p-1.5 cursor-pointer rounded-md transition duration-300
                                            ${viewMode === "card"
                                                ? "bg-white dark:bg-[#1C283F] shadow-sm text-sky-400 dark:text-blue-500"
                                                : "text-gray-500 hover:text-gray-700 dark:hover:text-white"
                                            } `}
                                    >
                                        <MdGridView className="text-lg" />
                                    </button>

                                </div>
                              {viewMode === 'table' && <div>
                                    <h3 className='text-sm [@media(max-width:400px)]:hidden block text-gray-600 dark:text-gray-400 '>
                                        Showing <span className='text-sky-400 dark:text-blue-500 font-semibold'>{filteredUrls.length}</span> of {urls.length} results
                                    </h3>
                                </div>}
                            </div>

                            <div className='flex gap-4 items-center'>
                                <div className='flex items-center gap-4'>
                                    {selectedUrlId.length > 0 && (
                                        <div>
                                            <button
                                                onClick={() => setIsDeleteModalOpen(true)}
                                                className="px-2 py-1.5 transition duration-300 bg-red-500 hover:bg-red-400 text-white font-medium flex cursor-pointer group w-full items-center gap-1 rounded-lg"
                                            >

                                                <MdDelete className='text-lg' />
                                                <span className='hidden sm:block'>
                                                    Delete
                                                </span>
                                                ({selectedUrlId.length})
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className='relative w-[280px] lg:w-[320px]'>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="indent-9 pr-[25px] border placeholder:text-gray-400 placeholder:text-[13px] focus:border-sky-400 min-h-[38px] dark:focus:border-blue-500 overflow-hidden transition duration-300 outline-none w-full bg-white dark:bg-[#181E29] border-zinc-200 dark:border-zinc-700 rounded-lg"
                                        placeholder='Search by Custom Name, Tags, or URLs...'
                                    />

                                    <span className='absolute left-2 top-2.5'>
                                        <IoIosSearch className='w-[20px] h-[20px] text-sky-400 dark:text-blue-500' />
                                    </span>

                                    {searchQuery && (
                                        <button
                                            type="button"
                                            onClick={() => setSearchQuery("")}
                                            className="absolute right-2 top-1 text-red-400 hover:text-red-600 dark text-[20px] cursor-pointer"
                                            aria-label="Clear search"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>

                                {/* SORT */}
                                <SortFilter
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                />
                            </div>
                        </div>

                        {viewMode === 'table' ? (
                            <div className="w-full mx-auto lg:w-5/6 max-h-[420px] overflow-auto mt-0 rounded-xl bg-white dark:bg-[#101522]">
                                <table className="min-w-max w-full text-sm text-left rtl:text-right border-collapse">
                                    <thead className="sticky top-0 z-[3] bg-zinc-200 dark:bg-[#181E29] text-zinc-600 dark:text-white">
                                        <tr>
                                            {/* CHECKBOX */}

                                            <th
                                                scope="col"
                                                className="px-6 py-4 w-[20px]"
                                            >
                                                <input
                                                    id="checkbox-all"
                                                    type="checkbox"
                                                    onChange={(e) =>
                                                        handleSelectAll(e.target.checked)
                                                    }
                                                    checked={allVisibleSelected}
                                                    className="w-[14px] h-[14px]"
                                                />

                                            </th>

                                            {/* SHORT LINK */}

                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left w-[300px] min-w-[300px]"
                                            >
                                                Short Link
                                            </th>

                                            {/* ORIGINAL LINK */}

                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-left w-[300px] min-w-[300px]"
                                            >
                                                Original Link
                                            </th>

                                            {/* TAGS */}

                                            <th
                                                scope="col"
                                                className="px-6 py-3"
                                            >
                                                Tags
                                            </th>

                                            {/* STATUS */}

                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Status
                                            </th>

                                            {/* CREATED AT */}

                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Created At
                                            </th>

                                            {/* UPDATED AT */}

                                            <th
                                                scope="col"
                                                className="px-6 py-3 whitespace-nowrap"
                                            >
                                                Updated At
                                            </th>

                                            {/* ACTION */}

                                            <th
                                                scope="col"
                                                className="sticky w-[80px] min-w-[80px] right-0 top-0 z-[3] px-6 py-3 whitespace-nowrap bg-zinc-200 dark:bg-[#181E29] shadow-[-6px_0_10px_-8px_rgba(0,0,0,0.45)] dark:shadow-[-6px_0_10px_-8px_rgba(0,0,0,0.8)]"
                                            >
                                                Action
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="dark:text-[#b2b6bd]">

                                        {filteredUrls.length > 0 ? (
                                            filteredUrls.map((item, index) => (
                                                <tr
                                                    key={item._id}
                                                    className={
                                                        selectedUrlId.includes(item._id)
                                                            ? "bg-blue-300/40 transition duration-300 ease-in-out"
                                                            : `${index === filteredUrls.length - 1
                                                                ? "border-none"
                                                                : "border-b border-zinc-300/40 dark:border-gray-700/40"
                                                            } `
                                                    }
                                                >

                                                    {/* CHECKBOX */}

                                                    <td className="px-6 py-6 w-[20px]">
                                                        <input
                                                            id={`checkbox - ${item._id} `}
                                                            type="checkbox"
                                                            onChange={(e) =>
                                                                handleCheckboxChange(
                                                                    item._id,
                                                                    e.target.checked
                                                                )
                                                            }
                                                            checked={selectedUrlId.includes(item._id)}
                                                            className="w-[14px] h-[14px] cursor-pointer"
                                                        />
                                                    </td>

                                                    {/* SHORT LINK */}

                                                    <td className="px-6 py-4 w-[300px] min-w-[350px]">
                                                        <div className="flex items-center gap-2 min-w-0">
                                                            <span
                                                                data-tooltip-id="my-tooltip"
                                                                data-tooltip-content={item.shortUrl}
                                                                className="block w-[260px] truncate whitespace-nowrap"
                                                            >
                                                                {item.shortUrl}
                                                            </span>

                                                            {/* COPY */}

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleCopy(item.shortUrl)
                                                                }
                                                                className="shrink-0 cursor-pointer p-2 transition duration-300 bg-zinc-100 hover:bg-zinc-200 dark:bg-[#1C283FB0] dark:hover:bg-white/5 rounded-full"
                                                            >
                                                                <FaCopy className="text-gray-500 dark:text-white" />
                                                            </button>

                                                            {/* OPEN */}

                                                            <a
                                                                href={item.shortUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="shrink-0 cursor-pointer p-2 transition duration-300 bg-zinc-100 hover:bg-zinc-200 dark:bg-[#1C283FB0] dark:hover:bg-white/5 rounded-full"
                                                            >
                                                                <TbExternalLink className="text-gray-500 dark:text-white text-[16px]" />
                                                            </a>
                                                        </div>
                                                    </td>

                                                    {/* ORIGINAL LINK */}

                                                    <td className="px-6 py-4 w-[300px] min-w-[350px]">
                                                        <div className="flex items-center gap-2 min-w-0">
                                                            <span
                                                                data-tooltip-id="my-tooltip"
                                                                data-tooltip-content={item.longUrl}
                                                                className="block w-[260px] truncate whitespace-nowrap"
                                                            >
                                                                {item.longUrl}
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleCopy(item.longUrl)
                                                                }
                                                                className="shrink-0 cursor-pointer p-2 transition duration-300 bg-zinc-100 hover:bg-zinc-200 dark:bg-[#1C283FB0] dark:hover:bg-white/5 rounded-full"
                                                            >
                                                                <FaCopy className="text-gray-500 dark:text-white" />
                                                            </button>
                                                        </div>
                                                    </td>

                                                    {/* TAGS */}

                                                    <td className="px-6 py-4 text-start max-w-[250px]">

                                                        <div className="flex flex-wrap gap-2">
                                                            {item.tags?.length > 0 ? item.tags?.map((tag, index) => (
                                                                <span
                                                                    key={index}
                                                                    className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-[#1C283F] text-gray-600 dark:text-gray-200"
                                                                >

                                                                    <IoPricetagSharp className="text-gray-500 dark:text-gray-400" />

                                                                    {tag}
                                                                </span>
                                                            )) : '-'}
                                                        </div>
                                                    </td>

                                                    {/* STATUS */}

                                                    <td className="px-6 py-4 text-start">
                                                        <div className="flex gap-2 items-center">

                                                            <p>
                                                                {item.status === "active"
                                                                    ? "Active"
                                                                    : "Inactive"}
                                                            </p>


                                                            {item.status === "active" ? (

                                                                <span className="relative flex items-center z-0 size-2">
                                                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                                                                    <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
                                                                </span>

                                                            ) : (
                                                                <span className="h-2 w-2 bg-red-500 rounded-full"></span>

                                                            )}
                                                        </div>
                                                    </td>

                                                    {/* CREATED AT */}

                                                    <td className="px-6 py-4 whitespace-nowrap">

                                                        {new Date(item.createdAt).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                year: "numeric",
                                                                month: "short",
                                                                day: "numeric"
                                                            }
                                                        )}
                                                    </td>

                                                    {/* UPDATED AT */}

                                                    <td className="px-6 py-4 whitespace-nowrap">

                                                        {item.updatedAt
                                                            ? new Date(item.updatedAt).toLocaleDateString(
                                                                "en-US",
                                                                {
                                                                    year: "numeric",
                                                                    month: "short",
                                                                    day: "numeric"
                                                                }
                                                            )
                                                            : ""
                                                        }
                                                    </td>

                                                    {/* STICKY ACTION */}

                                                    <td
                                                        className={`sticky right-0 z-[2] px-6 py-6 whitespace-nowrap shadow-[-6px_0_10px_-8px_rgba(0, 0, 0, 0.45)] dark: shadow-[-6px_0_10px_-8px_rgba(0, 0, 0, 0.8)]

                                                    ${selectedUrlId.includes(item._id)
                                                                ? "bg-blue-300/40"
                                                                : "bg-white dark:bg-[#101522]"
                                                            } `
                                                        }
                                                    >

                                                        <div className="flex items-center gap-2">

                                                            {/* VIEW */}
                                                            <button
                                                                onClick={() => {
                                                                    setIsUrlViewOpen(true);
                                                                    setViewUrl(item);
                                                                }}
                                                                data-tooltip-id="action-tooltip"
                                                                data-tooltip-content="Details"
                                                                className="px-2 py-1 inline-flex gap-1 text-[12px] transition duration-300 rounded-md bg-zinc-200 hover:bg-zinc-100 dark:bg-[#1C283FB0] dark:hover:bg-white/10 font-medium items-center cursor-pointer"
                                                            >

                                                                <BiShow className="text-[16px] text-gray-700 dark:text-white" />

                                                            </button>


                                                            {/* EDIT */}

                                                            <button
                                                                data-tooltip-id="action-tooltip"
                                                                data-tooltip-content="Customize"

                                                                onClick={() => {

                                                                    setIsCustomUrlModalOpen(true);
                                                                    setCustomUrl({
                                                                        ...customUrl,
                                                                        id: item.shortId,
                                                                        name: item.customName,
                                                                        status: item.status,
                                                                        tags: item.tags
                                                                    });

                                                                }}

                                                                className="px-2 py-1 inline-flex gap-1 text-[12px] transition duration-300 bg-zinc-200 hover:bg-zinc-100 dark:bg-[#1C283FB0] dark:hover:bg-white/10 rounded-md font-medium items-center cursor-pointer"
                                                            >

                                                                <LiaEditSolid className="text-[16px] text-gray-700 dark:text-white" />
                                                            </button>

                                                            {/* STATISTICS */}

                                                            <button
                                                                data-tooltip-id="action-tooltip"
                                                                data-tooltip-content="Analytics"
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/ statistics ? url = ${encodeURIComponent(
                                                                            item.shortUrl
                                                                        )
                                                                        }& id=${item._id} `
                                                                    )
                                                                }
                                                                className="px-2 py-1 inline-flex gap-1 text-[12px] transition duration-300 bg-zinc-200 hover:bg-zinc-100 dark:bg-[#1C283FB0] dark:hover:bg-white/10 rounded-md font-medium items-center cursor-pointer"
                                                            >

                                                                <IoMdStats className="text-[16px] text-gray-700 dark:text-white" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))

                                        ) : (

                                            <tr>
                                                <td
                                                    colSpan="8"
                                                    className="py-12 text-center text-gray-500 dark:text-gray-400"
                                                >
                                                    <div className="flex flex-col items-center gap-2">
                                                        <CiSearch className="text-3xl opacity-50" />
                                                        <p className="font-medium">
                                                            No URLs found
                                                        </p>
                                                        <p className="text-xs">
                                                            Try searching by custom name, tag, or URL
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>) :
                            <>
                                <CardView
                                    urls={paginatedUrls}
                                    selectedUrlId={selectedUrlId}
                                    handleCheckboxChange={handleCheckboxChange}
                                    setIsUrlViewOpen={setIsUrlViewOpen}
                                    setViewUrl={setViewUrl}
                                    setIsCustomUrlModalOpen={setIsCustomUrlModalOpen}
                                    setCustomUrl={setCustomUrl}
                                    customUrl={customUrl}
                                    navigate={navigate}
                                />
                                {viewMode === "card" && (
                                    <div className="lg:w-5/6 mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 mt-5">

                                        {/* RESULT COUNT */}
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Showing{" "}
                                            <span className="font-medium text-gray-700 dark:text-gray-200">
                                                {(currentPage - 1) * CARDS_PER_PAGE + 1}
                                            </span>
                                            {" - "}
                                            <span className="font-medium text-gray-700 dark:text-gray-200">
                                                {Math.min(
                                                    currentPage * CARDS_PER_PAGE,
                                                    filteredUrls.length
                                                )}
                                            </span>
                                            {" of "}
                                            <span className="font-medium text-gray-700 dark:text-gray-200">
                                                {filteredUrls.length}
                                            </span>
                                        </p>

                                        {/* PAGINATION */}
                                        <div className="flex items-center gap-1">

                                            {/* PREVIOUS */}
                                            <button
                                                type="button"
                                                disabled={currentPage === 1}
                                                onClick={() =>
                                                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                                                }
                                                className="px-3 cursor-pointer h-[34px] text-sm rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-[#181E29] text-gray-600 dark:text-gray-300 hover:bg-zinc-100 dark:hover:bg-white/5 disabled:opacity-40 disabled:cursor-not-allowed transition"
                                            >
                                                <GrFormPrevious/>
                                            </button>

                                            {/* PAGE NUMBERS */}

                                            {Array.from(
                                                { length: totalPages },
                                                (_, index) => index + 1
                                            )
                                                .filter((page) => {

                                                    if (totalPages <= 5) {
                                                        return true;
                                                    }

                                                    if (currentPage <= 3) {
                                                        return page <= 3 || page === totalPages;
                                                    }

                                                    if (currentPage >= totalPages - 2) {
                                                        return (
                                                            page === 1 ||
                                                            page >= totalPages - 2
                                                        );
                                                    }

                                                    return (
                                                        page === 1 ||
                                                        page === currentPage ||
                                                        page === totalPages
                                                    );
                                                })
                                                .map((page, index, visiblePages) => {

                                                    const previousPage =
                                                        visiblePages[index - 1];

                                                    const showEllipsis =
                                                        index > 0 &&
                                                        page - previousPage > 1;

                                                    return (
                                                        <div
                                                            key={page}
                                                            className="flex items-center gap-1"
                                                        >

                                                            {showEllipsis && (
                                                                <span className="px-1 text-gray-400 dark:text-gray-500 select-none">
                                                                    ...
                                                                </span>
                                                            )}

                                                            <button
                                                                type="button"
                                                                onClick={() => setCurrentPage(page)}
                                                                className={`min-w-[34px] h-[34px] px-2 cursor-pointer rounded-md text-sm border transition
                                                                        ${currentPage === page
                                                                        ? "bg-sky-400 border-sky-400 dark:bg-blue-500 dark:border-blue-500 text-white"
                                                                        : "border-zinc-200 dark:border-zinc-700 dark:hover:border-blue-500 hover:border-sky-400 bg-white dark:bg-[#181E29] text-gray-600 dark:text-gray-300"
                                                                    }
                                                                        `}
                                                            >
                                                                {page}
                                                            </button>

                                                        </div>
                                                    );
                                                })}

                                            {/* NEXT */}
                                            <button
                                                type="button"
                                                disabled={currentPage === totalPages}
                                                onClick={() =>
                                                    setCurrentPage((prev) =>
                                                        Math.min(prev + 1, totalPages)
                                                    )
                                                }
                                                className="px-3 cursor-pointer h-[34px] text-sm rounded-md border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-[#181E29] text-gray-600 dark:text-gray-300 hover:border-sky-400 dark:hover:border-blue-500 disabled:border-none disabled:opacity-40 disabled:cursor-not-allowed transition"
                                            >
                                                <GrFormNext/>
                                            </button>

                                        </div>
                                    </div>
                                )}
                            </>
                        }
                        <h3 className='text-sm text-center [@media(min-width:400px)]:hidden text-gray-600 dark:text-gray-400 mt-4'>
                            Showing {filteredUrls.length} of {urls.length} results
                        </h3>
                    </div>
                )}
            </div>

            <ReactTooltip
                id="my-tooltip"
                place="right"
                arrowColor="black"
                className="max-w-[250px] break-words z-[1000]"
            />

            <ReactTooltip
                id="action-tooltip"
                place="top"
                arrowColor="black"
                className="max-w-[250px] break-words z-[1000]"
            />

        </div>
    )
}

export default TableData

