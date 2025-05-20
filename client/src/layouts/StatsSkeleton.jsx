
export function HeaderCardSkeleton() {
    return (
        <div className="bg-[#ecedf0] animate-pulse dark:bg-white/10 flex flex-col gap-2 py-6 items-center justify-center col-span-4 rows-span-1 h-auto rounded-md">
            <div className="bg-gray-300 dark:bg-white/15 text-3xl h-4 w-64 rounded-md font-bold"></div>
            <div className="bg-gray-300 dark:bg-white/15 w-96 h-4 mt-4 rounded-md"></div>
        </div>
    )
}

export function SmallCardSkeleton() {
    return (
        <div className="bg-[#ecedf0] animate-pulse dark:bg-white/10 flex flex-col gap-2 items-center justify-center rows-span-1 h-auto rounded-md">
            <div className="bg-gray-300 dark:bg-white/15 text-3xl h-8 w-8 rounded-md font-bold"></div>
            <div className="bg-gray-300 dark:bg-white/15 w-32 h-4 mt-4 rounded-md"></div>
        </div>
    )
}