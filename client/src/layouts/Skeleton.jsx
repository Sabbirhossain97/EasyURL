export const AdminStatCardSkeleton = () => {
    return (
        <div className='border animate-pulse flex-1 dark:text-white bg-white dark:bg-[#181E29] p-4 flex gap-4 flex-col rounded-md border-zinc-200 dark:border-gray-800'>
            <div className='flex items-center justify-between'>
                <div className="flex flex-col gap-4">
                    <h1 className='w-32 h-4 bg-gray-300 rounded-md'></h1>
                    <h3 className='w-8 h-4 bg-gray-300 rounded-md'></h3>
                </div>
                <div className="h-8 w-8 rounded-full bg-gray-300">
                </div>
            </div>
            <div className='text-center flex flex-col gap-4'>
                <h3 className='w-52 h-4 bg-gray-300 rounded-md'></h3>
                <h3 className='w-52 h-4 bg-gray-300 rounded-md'></h3>
            </div>
        </div>
    )
}


export const TableSkeleton = () => {
    return (
        <div className="w-full overflow-y-auto overflow-x-auto mt-44 overflow-hidden rounded-xl">
            <table className="w-full text-sm text-left rtl:text-right border-collapse rounded-xl">
                <thead className="text-md sticky top-0 left-0 rounded-t-xl bg-zinc-200 dark:bg-[#181E29] text-zinc-600 dark:text-white">
                    <tr>
                        <th scope="col" className="px-6 py-4 flex items-center">
                            <div className="h-4 bg-gray-300 rounded-md dark:bg-gray-700 w-4"></div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="h-4 bg-gray-300 rounded-md dark:bg-gray-700 w-24"></div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="h-4 bg-gray-300 rounded-md dark:bg-gray-700 w-24"></div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="h-4 bg-gray-300 rounded-md dark:bg-gray-700 w-24"></div>
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                            <div className="h-4 bg-gray-300 rounded-md dark:bg-gray-700 w-24"></div>
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                            <div className="h-4 bg-gray-300 rounded-md dark:bg-gray-700 w-24"></div>
                        </th>
                        <th scope="col" className="px-6 py-3 whitespace-nowrap">
                            <div className="h-4 bg-gray-300 rounded-md dark:bg-gray-700 w-24"></div>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            <div className="h-4 bg-gray-300 rounded-md dark:bg-gray-700 w-24"></div>
                        </th>
                    </tr>
                </thead>
                <tbody className='dark:text-[#b2b6bd]'>
                    {[1, 2, 3, 4, 5].map((_, index) => (
                        <tr key={index} className="odd:bg-white animate-pulse dark:text-gray-400 odd:dark:bg-zinc-800 even:bg-gray-100 even:dark:bg-zinc-900/50 ">
                            <td className="px-6 py-4 font-medium whitespace-nowrap ">
                                <div className="h-4 bg-gray-300 rounded-md dark:bg-gray-700 w-4"></div>
                            </td>
                            <td className="px-6 py-4 font-medium whitespace-nowrap w-1/5">
                                <div className="h-4 bg-gray-300 rounded-md dark:bg-gray-700 w-full"></div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
                            </td>
                            <td className="px-6 py-4 flex flex-col gap-2">
                                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-8"></div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-8"></div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="h-4 bg-gray-300 rounded-full dark:bg-gray-700 w-full"></div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}