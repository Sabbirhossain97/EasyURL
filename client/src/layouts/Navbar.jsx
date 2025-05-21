import { useState } from 'react'
import { AiOutlineUser } from "react-icons/ai";
import { Popover, PopoverButton, PopoverPanel, Tab, TabGroup, TabList } from '@headlessui/react'
import { MdLogout } from "react-icons/md";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Spinner } from '../components/svg/SVG';
import { useTheme } from '../hooks/useTheme';
import { theme } from '../constants/theme';
import { handleLogout } from '../utils/logout';

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const { setSelectedTheme } = useTheme('Light');
    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <nav className="mx-auto flex items-center justify-between pt-6 text-center h-16 max-w-7xl px-6 md:px-10 xl:px-0">
            <Link to="/">
                <h1 className="font-montserrat custom-header-text leading-[58px] text-zinc-500 flex font-bold whitespace-nowrap tracking-[1px] text-3xl">
                    EasyURL
                </h1>
            </Link>
            <div className='flex items-center gap-10'>
                <div className='flex items-center gap-2'>
                    {location.pathname !== "/" && user &&
                        <Popover>
                            <PopoverButton className="text-sm/6 cursor-pointer flex items-center gap-2 font-medium dark:text-white focus:outline-none data-active:text-sky-400 data-focus:outline data-focus:outline-white transition duration-300 data-hover:text-sky-400">
                                <AiOutlineUser className='text-xl' />
                                <span className='text-[16px]'>{user && user?.username}</span>
                            </PopoverButton>
                            <PopoverPanel
                                transition
                                anchor="bottom"
                                className="divide-y min-w-[150px] -ml-6 sm:mr-4 divide-zinc-300 dark:divide-white/5 rounded-xl bg-white dark:bg-gray-900 text-sm transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
                            >
                                <div className="p-3">
                                    <div className="block rounded-lg px-3 py-2 transition">
                                        <p className="font-semibold dark:text-white">Signed in as</p>
                                        <p className="dark:text-white/50">{user && user?.email}</p>
                                    </div>
                                </div>
                                <div className="p-3">
                                    {loading ?
                                        <div className="rounded-lg w-full px-3 py-2">
                                            <p className="font-semibold flex items-center gap-2 dark:text-white">
                                                <span><Spinner /></span>Logging out...</p>
                                        </div>
                                        :
                                        <button onClick={() => handleLogout(navigate, setLoading)} className="rounded-lg w-full cursor-pointer px-3 py-2 transition duration-300 hover:bg-gray-100 dark:hover:bg-white/5">
                                            <p className="font-semibold flex items-center gap-2 dark:text-white">
                                                <span><MdLogout className='text-lg' />
                                                </span>Logout</p>
                                        </button>
                                    }
                                </div>
                                <TabGroup className="p-3 rounded-full sm:hidden">
                                    <TabList className="flex">
                                        {theme.map(({ name }) => (
                                            <Tab
                                                key={name}
                                                onClick={() => setSelectedTheme(name)}
                                                className="rounded-full cursor-pointer transition duration-300 ease-in-out px-3 py-1 text-sm/6 font-semibold data-selected:text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-selected:bg-sky-400 dark:data-selected:bg-white/10 dark:data-selected:data-hover:bg-white/10"
                                            >
                                                {name}
                                            </Tab>
                                        ))}
                                    </TabList>
                                </TabGroup>
                            </PopoverPanel>
                        </Popover>
                    }
                </div>
                <TabGroup className={`p-1 rounded-full bg-white dark:bg-[#181E29] ${location.pathname === "/shorten" && "hidden"} hidden sm:block`}>
                    <TabList className="flex">
                        {theme.map(({ name }) => (
                            <Tab
                                key={name}
                                onClick={() => setSelectedTheme(name)}
                                className="rounded-full cursor-pointer transition duration-300 ease-in-out px-3 py-1 text-sm/6 font-semibold data-selected:text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-selected:bg-sky-400 dark:data-selected:bg-white/10 dark:data-selected:data-hover:bg-white/10"
                            >
                                {name}
                            </Tab>
                        ))}
                    </TabList>
                </TabGroup>
            </div>
        </nav>
    )
}

export default Navbar