import { Link } from 'react-router-dom'

function NoPage() {
  
    return (
        <main className="grid min-h-full place-items-center bg-gray-100 dark:bg-[#0B101B] px-6 py-24 sm:py-32 lg:px-8">
            <div className="text-center">
                <p className="text-base font-semibold text-sky-500 dark:text-white">404</p>
                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 dark:text-white sm:text-7xl">Page not found</h1>
                <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Sorry, we couldn’t find the page you’re looking for.</p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Link to="/" className="cursor-pointer flex gap-4 transition duration-300 rounded-md bg-sky-400 dark:bg-white/10 dark:hover:bg-white/15 px-8 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-sky-500 ">
                        <svg className="ml-2 -mr-1 w-5 h-5 rotate-180" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    Go back home
                    </Link>
                </div>
            </div>
        </main>
    )
}

export default NoPage