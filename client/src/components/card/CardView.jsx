import { FaCopy } from "react-icons/fa6";
import { BiShow } from "react-icons/bi";
import { IoMdStats } from "react-icons/io";
import { LiaEditSolid } from "react-icons/lia";
import { TbExternalLink } from "react-icons/tb";
import { IoPricetagSharp } from "react-icons/io5";
import { Tooltip as ReactTooltip } from 'react-tooltip'
import { handleCopy } from '../../utils/clipboard';

function CardView({
    urls,
    selectedUrlId,
    handleCheckboxChange,
    setIsUrlViewOpen,
    setViewUrl,
    setIsCustomUrlModalOpen,
    setCustomUrl,
    customUrl,
    navigate
}) {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-5/6 mx-auto">

            {urls.map((item) => (
                <div
                    key={item._id}
                    className={`group relative rounded-xl transition-all border border-zinc-200 duration-300 bg-white dark:bg-[#101522] dark:border-zinc-700/70 dark:hover:border-zinc-600 
                        ${selectedUrlId.includes(item._id) ? "border-blue-400 dark:border-blue-500 bg-blue-50/40 dark:bg-blue-500/5" : ""}`}
                >

                    <div className="flex items-start justify-between px-4 pt-4">
                        <div className="flex items-center gap-3 min-w-0">

                            {/* CHECKBOX */}

                            <input
                                type="checkbox"
                                checked={selectedUrlId.includes(item._id)}
                                onChange={(e) =>
                                    handleCheckboxChange(
                                        item._id,
                                        e.target.checked
                                    )
                                }
                                className="w-[14px] h-[14px] shrink-0 cursor-pointer"
                            />

                            {/* CUSTOM NAME */}

                            <div className="min-w-0">
                                <h3
                                    className="font-semibold text-[14px] text-zinc-800 dark:text-white truncate"
                                    title={item.customName}
                                >
                                    {item.customName || "Untitled URL"}
                                </h3>
                            </div>
                        </div>

                        {/* STATUS */}

                        <div className="flex items-center gap-2 shrink-0 ml-3">
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                {item.status === "active" ? "Active" : "Inactive"}
                            </span>

                            {item.status === "active" ? (
                                <span className="relative flex items-center size-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
                                    <span className="relative inline-flex size-2 rounded-full bg-green-500"></span>
                                </span>
                            ) : (
                                <span className="size-2 bg-red-500 rounded-full"></span>
                            )}
                        </div>
                    </div>

                    <div className="px-4 pt-4 pb-3">

                        {/* SHORT URL */}
                        <div className="flex items-center gap-2">
                            <div className="min-w-0 flex-1" title={item.shortUrl}>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                                    Short link
                                </p>
                                <p className="text-sm font-medium text-blue-500 dark:text-blue-400 truncate">
                                    {item.shortUrl}
                                </p>
                            </div>

                            {/* COPY */}

                            <button
                                type="button"
                                onClick={() => handleCopy(item.shortUrl)}
                                className="shrink-0 p-2 rounded-full cursor-pointer transition duration-300 bg-zinc-100 hover:bg-zinc-200 dark:bg-[#1C283FB0] dark:hover:bg-white/10"
                                title="Copy short link"
                            >
                                <FaCopy className="text-gray-500 dark:text-white text-[13px]" />
                            </button>

                            {/* OPEN */}

                            <a
                                href={item.shortUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="shrink-0 p-2 rounded-full cursor-pointer transition duration-300 bg-zinc-100 hover:bg-zinc-200 dark:bg-[#1C283FB0] dark:hover:bg-white/10"
                                title="Open link"
                            >

                                <TbExternalLink className="text-gray-500 dark:text-white text-[14px]" />
                            </a>
                        </div>

                        {/* ORIGINAL URL */}

                        <div className="flex items-center gap-2 mt-4">
                            <div className="min-w-0 flex-1" title={item.longUrl}>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                                    Original link
                                </p>
                                <p
                                    className="text-sm text-zinc-600 font-medium truncate">
                                    {item.longUrl}
                                </p>
                            </div>
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

                        {item.tags?.length > 0 && (
                            <div className="flex flex-col flex-wrap gap-1.5 mt-4">
                                <div>
                                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-1">
                                        Tags
                                    </p>
                                </div>
                                <div>
                                    {item.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium bg-zinc-100 dark:bg-[#1C283F] text-gray-600 dark:text-gray-200"
                                        >
                                            <IoPricetagSharp className="text-gray-500 dark:text-gray-400" />
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className="flex items-center justify-between gap-4 mt-5 pt-3 border-t border-zinc-200/70 dark:border-gray-700/50">
                            <div className="min-w-0">
                                <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                                    Created
                                </p>
                                <p className="text-xs text-zinc-600 dark:text-zinc-300 whitespace-nowrap">

                                    {new Date(item.createdAt).toLocaleDateString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric"
                                        }
                                    )}
                                </p>
                            </div>

                            <div className="min-w-0 text-right">
                                <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                                    Updated
                                </p>

                                <p className="text-xs text-zinc-600 dark:text-zinc-300 whitespace-nowrap">

                                    {item.updatedAt
                                        ? new Date(item.updatedAt).toLocaleDateString(
                                            "en-US",
                                            {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric"
                                            }
                                        )
                                        : "-"
                                    }
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="px-4 pb-4">
                        <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-200/70 dark:border-gray-700/50">
                            {/* VIEW */}
                            <button
                                onClick={() => {
                                    setIsUrlViewOpen(true);
                                    setViewUrl(item);
                                }}
                                data-tooltip-id="action-tooltip"
                                data-tooltip-content="Details"
                                className="px-2.5 py-1.5 inline-flex gap-1.5 text-xs transition duration-300 rounded-md bg-zinc-200 hover:bg-zinc-100 dark:bg-[#1C283FB0] dark:hover:bg-white/10 font-medium items-center cursor-pointer text-gray-700 dark:text-white"
                            >
                                <BiShow className="text-[15px]" />
                                <span className="hidden 2xl:inline mt-0.5">
                                    Details
                                </span>
                            </button>

                            {/* EDIT */}

                            <button
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
                                data-tooltip-id="action-tooltip"
                                data-tooltip-content="Customize"
                                className="px-2.5 py-1.5 inline-flex gap-1.5 text-xs transition duration-300 bg-zinc-200 hover:bg-zinc-100 dark:bg-[#1C283FB0] dark:hover:bg-white/10 rounded-md font-medium items-center cursor-pointer text-gray-700 dark:text-white"
                            >

                                <LiaEditSolid className="text-[15px]" />
                                <span className="hidden 2xl:inline mt-0.5">
                                    Customize
                                </span>

                            </button>

                            {/* ANALYTICS */}

                            <button
                                onClick={() =>
                                    navigate(`/ statistics ? url = ${encodeURIComponent(
                                        item.shortUrl
                                    )
                                        }& id=${item._id} `
                                    )
                                }
                                data-tooltip-id="action-tooltip"
                                data-tooltip-content="Analytics"
                                className="px-2.5 py-1.5 inline-flex gap-1.5 text-xs transition duration-300 bg-zinc-200 hover:bg-zinc-100 dark:bg-[#1C283FB0] dark:hover:bg-white/10 rounded-md font-medium items-center cursor-pointer text-gray-700 dark:text-white"
                            >
                                <IoMdStats className="text-[15px]" />
                                <span className="hidden 2xl:inline mt-0.5">
                                    Analytics
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
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
    );
}

export default CardView;

