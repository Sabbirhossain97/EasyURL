import { FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";

function Footer() {
    return (
        <footer className="px-6 md:px-10 xl:px-2 bg-background/95 backdrop-blur mb-6 supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-[1280px] mx-auto px-4 py-4">
                <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                        <span>Made with</span>
                        <FaHeart className="h-4 w-4 text-red-500 ml-1 fill-current " />
                        <span className="ml-1">by</span>
                        <a
                            href="https://github.com/Sabbirhossain97"
                            target="_blank"
                            className="hover:text-blue-500 transition duration-300"
                            rel="noopener noreferrer"
                            aria-label="GitHub">
                            Sabbir Hossain
                        </a>
                    </div>

                    <div className="flex items-center space-x-6">
                        <button
                            className="h-5 w-5"
                        >
                            <a
                                href="https://github.com/Sabbirhossain97"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="GitHub"
                            >
                                <FaGithub className="h-5 w-5 transition duration-300 hover:text-blue-400" />
                            </a>
                        </button>

                        <button

                            className="h-5 w-5"
                        >
                            <a
                                href="https://www.linkedin.com/in/sabbir-hossain-b73726214/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin className="h-5 w-5 transition duration-300 hover:text-blue-400" />
                            </a>
                        </button>

                        <button
                            className="h-5 w-5"
                        >
                            <a
                                href="https://www.facebook.com/sabbir.h.shawon/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                            >
                                <FaFacebook className="h-5 w-5 transition duration-300 hover:text-blue-400" />
                            </a>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer