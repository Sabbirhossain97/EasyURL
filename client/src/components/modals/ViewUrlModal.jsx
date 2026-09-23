import { useState } from "react";
import {
    Button,
    Dialog,
    DialogPanel,
    DialogBackdrop,
    DialogTitle
} from "@headlessui/react";
import { FaCopy } from "react-icons/fa6";
import { IoMdStats } from "react-icons/io";
import { LuDownload, LuExternalLink } from "react-icons/lu";
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
    FacebookIcon,
    TwitterIcon,
    LinkedinIcon,
    WhatsappIcon
} from "react-share";
import { Spinner } from "../svg/SVG";
import { handleCopy } from "../../utils/clipboard";
import { handleDownloadQR } from "../../utils/downloadQR";
import { useNavigate } from "react-router-dom";
import { IoWarning } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { IoPricetagSharp } from "react-icons/io5";

function ViewUrlModal({
    isUrlViewOpen,
    setIsUrlViewOpen,
    viewUrl,
    setViewUrl
}) {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");

    function close() {
        setIsUrlViewOpen(false);

        setTimeout(() => {
            setViewUrl({});
            setActiveTab("overview");
        }, 500);
    }

    const isActive = viewUrl?.status === "active";

    return (
        <Dialog
            open={isUrlViewOpen}
            as="div"
            className="relative z-10 focus:outline-none"
            onClose={close}
        >
            <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-3 sm:p-4">

                    <DialogPanel
                        transition
                        className="
                            w-full max-w-[500px]
                            relative
                            rounded-xl
                            shadow-xl
                            bg-white dark:bg-[#181E29]
                            border border-zinc-200/60 dark:border-zinc-700/50
                            p-4 sm:p-5
                            backdrop-blur-2xl
                            duration-300 ease-out
                            data-closed:transform-[scale(95%)]
                            data-closed:opacity-0
                        "
                    >

                        {/* =====================================================
                            HEADER
                        ====================================================== */}
                        <DialogTitle
                            as="h3"
                            className="text-base font-semibold text-gray-800 dark:text-white"
                        >
                            URL Details
                        </DialogTitle>

                        <button
                            type="button"
                            onClick={close}
                            className="
                                absolute top-4 right-4
                                cursor-pointer
                                text-lg
                                text-gray-500 dark:text-gray-400
                                hover:text-gray-800 dark:hover:text-white
                                transition duration-300
                            "
                        >
                            <IoMdClose />
                        </button>


                        {/* =====================================================
                            SHORT URL
                        ====================================================== */}
                        <div className="mt-3 flex items-center gap-2">

                            <div
                                className="
                                    min-w-0 flex-1
                                    px-3 py-2
                                    rounded-md
                                    bg-gray-100 dark:bg-white/5
                                    border border-zinc-200 dark:border-zinc-700
                                    text-sm
                                    text-gray-700 dark:text-gray-200
                                    truncate
                                "
                                title={viewUrl?.shortUrl}
                            >
                                {viewUrl?.shortUrl}
                            </div>

                            {/* COPY */}
                            <button
                                type="button"
                                onClick={() => handleCopy(viewUrl?.shortUrl)}
                                className="
                                    shrink-0
                                    inline-flex items-center justify-center
                                    w-9 h-9
                                    rounded-md
                                    bg-gray-100 hover:bg-gray-200
                                    dark:bg-white/10 dark:hover:bg-white/15
                                    text-gray-600 dark:text-white
                                    transition duration-300
                                    cursor-pointer
                                "
                            >
                                <FaCopy className="text-sm" />
                            </button>

                            {/* OPEN */}
                            <a
                                href={viewUrl?.shortUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    shrink-0
                                    inline-flex items-center justify-center
                                    w-9 h-9
                                    rounded-md
                                    bg-gray-100 hover:bg-gray-200
                                    dark:bg-white/10 dark:hover:bg-white/15
                                    text-gray-600 dark:text-white
                                    transition duration-300
                                "
                            >
                                <LuExternalLink className="text-base" />
                            </a>

                        </div>


                        {/* =====================================================
                            ACTION BUTTONS
                        ====================================================== */}
                        <div className="mt-3 flex items-center gap-2">

                            <a
                                href={isActive ? viewUrl?.shortUrl : undefined}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`
                                    inline-flex items-center gap-2
                                    rounded-md
                                    px-3 py-1.5
                                    text-sm font-medium
                                    transition duration-300
                                    ${isActive
                                        ? " bg-sky-400 hover:bg-sky-500 dark:bg-blue-500 dark:hover:bg-blue-600 text-white cursor-pointer"
                                        : "bg-gray-200 dark:bg-white/10 text-gray-400 cursor-not-allowed pointer-events-none"
                                    }
                                `}
                            >
                                <LuExternalLink className="text-sm" />
                                Open Link
                            </a>

                            {/* Statistics */}
                            <button
                                type="button"
                                onClick={() =>
                                    navigate(
                                        `/statistics?url=${encodeURIComponent(
                                            viewUrl.shortUrl
                                        )}&id=${viewUrl._id}`
                                    )
                                }
                                className="
                                    inline-flex items-center gap-2
                                    rounded-md
                                    bg-gray-100 hover:bg-gray-200
                                    dark:bg-white/10 dark:hover:bg-white/15
                                    px-3 py-1.5
                                    text-sm font-medium
                                    text-gray-700 dark:text-white
                                    transition duration-300
                                    cursor-pointer
                                "
                            >
                                <IoMdStats />
                                Statistics
                            </button>

                        </div>


                        {/* =====================================================
                            TABS
                        ====================================================== */}
                        <div className="mt-5 border-b border-zinc-200 dark:border-zinc-700">

                            <div className="flex items-center gap-6">

                                {/* OVERVIEW */}
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("overview")}
                                    className={`
                                        relative
                                        pb-2
                                        text-xs font-medium
                                        transition duration-300
                                        cursor-pointer
                                        ${activeTab === "overview"
                                            ? "text-blue-500 dark:text-blue-400"
                                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                        }
                                    `}
                                >
                                    Overview

                                    {activeTab === "overview" && (
                                        <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-blue-500 rounded-full" />
                                    )}
                                </button>


                                {/* QR CODE */}
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("qr")}
                                    className={`
                                        relative
                                        pb-2
                                        text-xs font-medium
                                        transition duration-300
                                        cursor-pointer
                                        ${activeTab === "qr"
                                            ? "text-blue-500 dark:text-blue-400"
                                            : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                                        }
                                    `}
                                >
                                    QR Code

                                    {activeTab === "qr" && (
                                        <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-blue-500 rounded-full" />
                                    )}
                                </button>

                            </div>

                        </div>


                        {/* =====================================================
                            OVERVIEW TAB
                        ====================================================== */}
                        {activeTab === "overview" && (
                            <div className="mt-4">

                                {/* ORIGINAL URL */}
                                <div>
                                    <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                                        Original URL
                                    </p>

                                    <div className="flex items-center gap-2">

                                        <div
                                            className="
                                                min-w-0 flex-1
                                                px-3 py-2
                                                rounded-md
                                                bg-gray-100 dark:bg-white/5
                                                border border-zinc-200 dark:border-zinc-700
                                                text-xs
                                                text-gray-600 dark:text-gray-300
                                                truncate
                                            "
                                            title={viewUrl?.longUrl}
                                        >
                                            {viewUrl?.longUrl}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleCopy(viewUrl?.longUrl)
                                            }
                                            className="
                                                shrink-0
                                                inline-flex items-center justify-center
                                                w-9 h-9
                                                rounded-md
                                                bg-gray-100 hover:bg-gray-200
                                                dark:bg-white/10 dark:hover:bg-white/15
                                                text-gray-600 dark:text-white
                                                transition duration-300
                                                cursor-pointer
                                            "
                                        >
                                            <FaCopy className="text-sm" />
                                        </button>

                                    </div>
                                </div>

                                {/* Tags */}
                                {viewUrl?.tags?.length > 0 && (
                                <div className="mt-4">
                                    <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                                        Tags
                                    </p>

                                    <div className="flex flex-wrap items-center gap-1.5 py-2 rounded-md"
                                    >
                                        {viewUrl.tags.map((tag, index) => (
                                            <span
                                                key={`${tag}-${index}`}
                                                className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-sky-50 dark:bg-blue-500/10 text-[11px] font-medium text-sky-400 dark:text-blue-500 border border-blue-200 dark:border-blue-500/20"
                                            >
                                                <IoPricetagSharp className="text-[10px]" />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div> )}

                                {/* STATUS */}
                                <div className="mt-4">

                                    <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-1.5">
                                        Status
                                    </p>

                                    <div
                                        className="
                                            w-full
                                            flex items-center gap-2
                                            px-3 py-2
                                            rounded-md
                                            bg-gray-100 dark:bg-white/5
                                            border border-zinc-200 dark:border-zinc-700
                                            text-sm
                                            text-gray-700 dark:text-gray-200
                                        "
                                    >

                                        <span
                                            className={`
                                                size-2 rounded-full
                                                ${isActive
                                                    ? "bg-green-500"
                                                    : "bg-red-500"
                                                }
                                            `}
                                        />

                                        {isActive ? "Active" : "Inactive"}
                                    </div>
                                </div>

                                {/* SHARE */}
                                {isActive && (
                                    <div className="mt-4">

                                        <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2">
                                            Share
                                        </p>

                                        <div className="flex gap-2">

                                            <FacebookShareButton
                                                url={viewUrl?.shortUrl}
                                            >
                                                <FacebookIcon
                                                    size={30}
                                                    round
                                                />
                                            </FacebookShareButton>

                                            <TwitterShareButton
                                                url={viewUrl?.shortUrl}
                                            >
                                                <TwitterIcon
                                                    size={30}
                                                    round
                                                />
                                            </TwitterShareButton>

                                            <LinkedinShareButton
                                                url={viewUrl?.shortUrl}
                                            >
                                                <LinkedinIcon
                                                    size={30}
                                                    round
                                                />
                                            </LinkedinShareButton>

                                            <WhatsappShareButton
                                                url={viewUrl?.shortUrl}
                                            >
                                                <WhatsappIcon
                                                    size={30}
                                                    round
                                                />
                                            </WhatsappShareButton>

                                        </div>

                                    </div>
                                )}


                                {/* STATISTICS */}
                                <div className="mt-5">

                                    <p className="text-xs font-medium text-gray-600 dark:text-gray-300 mb-2">
                                        Statistics
                                    </p>

                                    <div className="grid grid-cols-2 gap-3">

                                        {/* CLICKS */}
                                        <div
                                            className="
                                                rounded-lg
                                                border border-zinc-200 dark:border-zinc-700
                                                bg-gray-50 dark:bg-white/[0.03]
                                                p-3
                                            "
                                        >
                                            <p className="text-xl font-semibold text-gray-800 dark:text-white">
                                                {viewUrl?.clickCount ?? 0}
                                            </p>

                                            <p className="text-[11px] text-gray-500 dark:text-gray-400">
                                                Total Clicks
                                            </p>
                                        </div>


                                        {/* QR SCANS */}
                                        <div
                                            className="
                                                rounded-lg
                                                border border-zinc-200 dark:border-zinc-700
                                                bg-gray-50 dark:bg-white/[0.03]
                                                p-3
                                            "
                                        >
                                            <p className="text-xl font-semibold text-gray-800 dark:text-white">
                                                {viewUrl?.qr?.scans ?? 0}
                                            </p>

                                            <p className="text-[11px] text-gray-500 dark:text-gray-400">
                                                QR Scans
                                            </p>
                                        </div>

                                    </div>

                                </div>


                                {/* DATES */}
                                <div className="mt-3 grid grid-cols-2 gap-3">

                                    <div
                                        className="
                                            rounded-lg
                                            border border-zinc-200 dark:border-zinc-700
                                            bg-gray-50 dark:bg-white/[0.03]
                                            p-3
                                        "
                                    >
                                        <p className="text-[11px] text-gray-500 dark:text-gray-400">
                                            Created At
                                        </p>

                                        <p className="mt-1 text-xs text-gray-700 dark:text-gray-200">
                                            {viewUrl?.createdAt
                                                ? new Date(
                                                    viewUrl.createdAt
                                                ).toLocaleString(
                                                    "en-US",
                                                    {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                        hour: "numeric",
                                                        minute: "2-digit"
                                                    }
                                                )
                                                : "-"}
                                        </p>
                                    </div>


                                    <div
                                        className="
                                            rounded-lg
                                            border border-zinc-200 dark:border-zinc-700
                                            bg-gray-50 dark:bg-white/[0.03]
                                            p-3
                                        "
                                    >
                                        <p className="text-[11px] text-gray-500 dark:text-gray-400">
                                            Updated At
                                        </p>

                                        <p className="mt-1 text-xs text-gray-700 dark:text-gray-200">
                                            {viewUrl?.updatedAt
                                                ? new Date(
                                                    viewUrl.updatedAt
                                                ).toLocaleString(
                                                    "en-US",
                                                    {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric",
                                                        hour: "numeric",
                                                        minute: "2-digit"
                                                    }
                                                )
                                                : "-"}
                                        </p>
                                    </div>

                                </div>

                            </div>
                        )}


                        {/* =====================================================
                            QR CODE TAB
                        ====================================================== */}
                        {activeTab === "qr" && (
                            <div className="mt-5 flex flex-col items-center">

                                {isActive ? (
                                    <>
                                        <div
                                            className="
                                                p-4
                                                rounded-lg
                                                bg-white
                                                border border-zinc-200
                                            "
                                        >
                                            <img
                                                src={viewUrl?.qr?.code}
                                                alt="QR Code"
                                                className="w-[260px] h-[260px] object-contain"
                                            />
                                        </div>

                                        <Button
                                            type="button"
                                            onClick={() =>
                                                handleDownloadQR(
                                                    viewUrl,
                                                    setLoading
                                                )
                                            }
                                            disabled={loading}
                                            className="
                                                mt-4
                                                inline-flex items-center gap-2
                                                cursor-pointer
                                                transition duration-300
                                                rounded-md
                                                bg-gray-700 hover:bg-gray-600
                                                dark:bg-white/10
                                                dark:hover:bg-white/15
                                                px-3 py-1.5
                                                text-sm font-semibold
                                                text-white
                                                disabled:opacity-60
                                                disabled:cursor-not-allowed
                                            "
                                        >
                                            {loading ? (
                                                <>
                                                    <Spinner />
                                                    Downloading...
                                                </>
                                            ) : (
                                                <>
                                                    <LuDownload />
                                                    Download QR Code
                                                </>
                                            )}
                                        </Button>
                                    </>
                                ) : (
                                    <div className="w-full flex flex-col items-center py-12">

                                        <div
                                            className="
                                                h-[260px] w-[260px]
                                                border border-dashed
                                                border-gray-300 dark:border-zinc-700
                                                rounded-md
                                                flex items-center justify-center
                                                text-sm
                                                text-gray-500 dark:text-gray-400
                                            "
                                        >
                                            QR not available
                                        </div>

                                        <p className="mt-3 flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                                            <IoWarning className="text-yellow-400 text-base" />
                                            Activate your link to use the QR code
                                        </p>

                                    </div>
                                )}

                            </div>
                        )}

                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}

export default ViewUrlModal;