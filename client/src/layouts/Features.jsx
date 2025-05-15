import { FaLink } from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { FaGear } from "react-icons/fa6";

function Features() {
    return (
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
    )
}

export default Features