import { useState, useEffect } from 'react';
import AuthModal from '../components/modals/AuthModal';
import Features from "../layouts/Features"
import { useNavigate, useLocation } from 'react-router-dom';

function Home() {

    const navigate = useNavigate();
    const location = useLocation();
    let [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const token = localStorage.getItem("token");

    const handleRoute = () => {
        if (!token) {
            setIsAuthModalOpen(true)
        } else {
            navigate("/shorten")
        }
    }

    useEffect(() => {
        if (location?.state === 'success') {
            setIsAuthModalOpen(true)
            navigate(location.pathname, { replace: true, state: null });
        }
    }, [location, navigate])

    return (
        <section className="py-20 max-w-7xl mx-auto">
            <AuthModal
                isAuthModalOpen={isAuthModalOpen}
                setIsAuthModalOpen={setIsAuthModalOpen}
            />
            <div className="py-8 px-4 mx-auto text-center lg:py-24 lg:px-12">
                <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                    Simplify Your Links. Track with Precision.
                </h1>
                <p className="mb-8 text-lg font-normal lg:text-xl sm:px-16 xl:px-48 text-zinc-500 dark:text-zinc-400">
                    Instantly shorten URLs, Customize and track performance — all in one place. Fast, secure, and free.
                </p>
                <div className="flex flex-col justify-center items-center mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                    <button onClick={() => handleRoute()} className="cursor-pointer w-[200px] inline-flex justify-center items-center py-3 px-10 text-base font-medium text-white bg-sky-400 hover:bg-sky-500 dark:bg-white/10 dark:hover:bg-white/15 rounded-lg transition duration-300">
                        Get Started
                        <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    </button>
                </div>
                <Features />
            </div>
        </section>
    )
}

export default Home
