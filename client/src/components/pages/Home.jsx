import { useState } from 'react';
import { FaLink } from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { FaGear } from "react-icons/fa6";
import AuthModal from '../auth/AuthModal';

function Home() {

    let [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    return (
        <section className="py-20 max-w-7xl mx-auto ">
            <AuthModal
                isAuthModalOpen={isAuthModalOpen}
                setIsAuthModalOpen={setIsAuthModalOpen}
            />
            <div className="py-8 px-4 mx-auto text-center lg:py-24 lg:px-12">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    Simplify Your Links. Boost Your Clicks.
                </h1>
                <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-zinc-500 dark:text-zinc-400">
                    Instantly shorten URLs and track performance — all in one place. Fast, secure, and free.
                </p>
                <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <button onClick={() => setIsAuthModalOpen(true)} className="cursor-pointer inline-flex justify-center items-center py-3 px-10 text-base font-medium text-white bg-sky-400 hover:bg-sky-500 dark:bg-white/10 dark:hover:bg-white/15 rounded-lg transition duration-300">
                        Get Started
                        <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </button>
                </div>
                <div className='mt-20'>
                    <h2 className="text-3xl font-semibold text-center mb-8">Features</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <div className="bg-white dark:bg-white/10 rounded-lg flex flex-col justify-center gap-2 px-4 py-6 items-center">
                            <FaLink className='text-sky-400 text-2xl' />
                            <h3 className="text-[16px] font-semibold whitespace">Professional appearance</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                                Track how many times your URL has been clicked with real-time analytics.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-white/10 rounded-lg flex flex-col justify-center gap-2 px-4 py-6 items-center">
                            <MdAnalytics className='text-sky-400 text-3xl' />
                            <h3 className="text-[16px] font-semibold whitespace">Real-time Analytics</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                                Get instant insights on link performance with detailed real-time stats.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-white/10 rounded-lg flex flex-col justify-center gap-2 px-4 py-6 items-center">
                            <FaGear className='text-sky-400 text-2xl' />
                            <h3 className="text-[16px] font-semibold whitespace">Customizable URL</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                                Personalize your short URL with a custom name to make it more recognizable.
                            </p>
                        </div>
                        <div className="bg-white dark:bg-white/10 rounded-lg flex flex-col justify-center gap-2 px-4 py-6 items-center">
                            <MdOutlineSecurity className='text-sky-400 text-2xl' />
                            <h3 className="text-[16px] font-semibold whitespace">Secure Links</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-center text-sm">
                                Ensure that your short URLs are safe and protected from misuse.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Home
