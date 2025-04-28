import React from 'react'

function TableData({ data: shortUrlData }) {
    const { shortUrl, originalUrl, createdAt, qrcode } = shortUrlData || {};
    return (
        <div className="relative overflow-hidden shadow-md sm:rounded-lg mt-24">
            <table className="w-full text-sm text-left shadow-xl bg-[#0d121d] rtl:text-right">
                <thead className="text-md bg-[#181E29] text-white/70">
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
                <tbody className='text-gray-500'>
                    <tr className="border-b border-gray-700/40">
                        <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                            {shortUrl}
                        </th>
                        <td className="px-6 py-4 truncate max-w-[250px]">
                            {originalUrl}
                        </td>
                        <td className="px-6 py-4">
                            <img src={qrcode} className='w-6 h-6'/>
                        </td>
                        <td className="px-6 py-4">
                            {createdAt}
                        </td>
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">N/A</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableData