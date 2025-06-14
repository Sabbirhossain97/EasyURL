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