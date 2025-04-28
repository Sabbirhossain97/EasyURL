import React from 'react'
import { FaCopy } from "react-icons/fa6";
import toast from 'react-hot-toast';

function TableData() {
    const shortUrlData = JSON.parse(localStorage.getItem("shortUrlData")) || [];

    const handleCopy = (url) => {
        navigator.clipboard.writeText(url)
            .then(() => {
                toast.success('url copied to clipboard!',{
                    position: 'bottom-right'
                });
            }).catch((err) => {
                console.error('Failed to copy!', err)
            })
    }

    return (
        <div className="relative overflow-hidden mt-24 ">
            <h1 className='text-xl'>History ({shortUrlData.length}) </h1>
            <table className="w-full mt-6 overflow-hidden rounded-xl text-sm text-left shadow-xl bg-white dark:bg-[#0d121d] rtl:text-right">
                <thead className="text-md rounded-xl bg-zinc-200 dark:bg-[#181E29] text-zinc-600 dark:text-white">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Short Link
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Original Link
                        </th>
                        <th scope="col" className="px-6 py-3">
                            QR Code
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
                    {shortUrlData.map((item, index) => (
                        <tr key={index} className="border-b border-zinc-100 dark:border-gray-700/40">
                            <td className="px-6 w-1/5 py-4 flex items-center gap-2 font-medium whitespace-nowrap">
                                {item.shortUrl}
                                <span onClick={() => handleCopy(item.shortUrl)} className='cursor-pointer p-2 bg-zinc-100 dark:bg-[#1C283FB0] rounded-full'><FaCopy className='text-gray-500 dark:text-white' /></span>
                            </td>
                            <td className="px-6 py-4 truncate max-w-[350px]">
                                {item.originalUrl}
                            </td>
                            <td className="px-6 py-4 w-[150px]">
                                <img src={item.qrcode} className='w-6 h-6' />
                            </td>
                            <td className="px-6 py-4 ">
                                {item.createdAt}
                            </td>
                            <td className="px-6 py-4 ">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">N/A</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableData