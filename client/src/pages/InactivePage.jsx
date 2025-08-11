import { Link } from "react-router-dom";

export function InactivePage() {
    return (
        <main className="grid min-h-screen place-items-center bg-gray-100 dark:bg-[#0B101B] px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 dark:text-white sm:text-7xl">Oops!</h1>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">The link is currently not active!</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link to="/shorten" className="cursor-pointer flex gap-4 transition duration-300 rounded-md bg-sky-400 dark:bg-white/10 dark:hover:bg-white/15 px-8 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-sky-500 ">
                        <svg className="ml-2 -mr-1 w-5 h-5 rotate-180" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                        Back to previous page
                    </Link>
                </div>
            </div>
        </main>
    );
}