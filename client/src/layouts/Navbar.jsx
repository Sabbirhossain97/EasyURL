import { useState } from 'react'
import { AiOutlineUser } from "react-icons/ai";
import { Popover, PopoverButton, PopoverPanel, Tab, TabGroup, TabList } from '@headlessui/react'
import { MdLogout } from "react-icons/md";
import { useNavigate, Link } from 'react-router-dom';
import { Spinner } from '../components/svg/SVG';
import { useTheme } from '../hooks/useTheme';
import { theme } from '../constants/theme';
import { handleLogout } from '../utils/logout';
import { IoSettingsSharp } from "react-icons/io5";

function Navbar({ user, setUser }) {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { selectedTheme, setSelectedTheme } = useTheme('Light');
    const themeIndex = theme.findIndex(t => t.name === selectedTheme);

    return (
        <nav className="mx-auto flex items-center justify-between pt-6 text-center h-16 max-w-7xl px-3 md:px-4 xl:px-2">
            <Link to="/">
                <h1 className="font-montserrat custom-header-text leading-[58px] text-zinc-500 flex font-bold whitespace-nowrap tracking-[1px] text-2xl sm:text-3xl">
                    EasyURL
                </h1>
            </Link>
            <div className='flex items-center gap-6'>
                <div className='flex items-center gap-1'>
                    {user &&
                        (
                            <Popover>
                                <PopoverButton className="cursor-pointer flex items-center gap-3 font-medium dark:text-white focus:outline-none data-active:text-sky-400 data-focus:outline data-focus:outline-white transition duration-300 data-hover:text-sky-400">
                                    {user?.image ? <img src={user?.image} alt="profile_img" className='w-10 sm:w-8 h-10 sm:h-8 rounded-full object-cover object-top border border-zinc-300 dark:border-none' /> :
                                        <AiOutlineUser className='text-2xl w-10 sm:w-8 h-10 sm:h-8 rounded-full sm:text-xl border border-gray-400 dark:border-white/30' />}
                                    <p className='flex flex-col items-start'>
                                        <span className='text-[14px] hidden sm:block'>{user && user?.username}</span>
                                        <span className='text-[12px] text-gray-500 hidden sm:block'>{user && user?.role}</span>
                                    </p>
                                </PopoverButton>
                                <PopoverPanel
                                    transition
                                    anchor="bottom"
                                    className="divide-y shadow-xl dark:border dark:border-white/10 divide-zinc-300 min-w-[150px] -ml-6 sm:mr-4 dark:divide-white/10 rounded-xl bg-white dark:bg-gray-900 text-sm transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
                                >
                                    {({ close }) => (
                                        <>
                                            <div className="p-3">
                                                <div className="block rounded-lg px-3 py-2 transition">
                                                    <p className="font-semibold dark:text-white hidden sm:block">Signed in as</p>
                                                    <p className="font-semibold dark:text-white block sm:hidden">{user && user?.username}</p>
                                                    <p className="dark:text-white/50">{user && user?.email}</p>
                                                </div>
                                            </div>
                                            <div className="p-3">
                                                <Link
                                                    to="/settings"
                                                    onClick={() => close()}
                                                    className="block rounded-lg px-3 py-2 transition hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer"
                                                >
                                                    <p className="font-semibold dark:text-white flex items-center gap-2">
                                                        <IoSettingsSharp className="text-lg" /> Settings
                                                    </p>
                                                </Link>
                                            </div>
                                            <div className="p-3 sm:border-none">
                                                {loading ?
                                                    <div className="rounded-lg w-full px-3 py-2">
                                                        <p className="font-semibold flex items-center gap-2 dark:text-white">
                                                            <span><Spinner /></span>Logging out...</p>
                                                    </div>
                                                    :
                                                    <button onClick={() => handleLogout(navigate, setLoading, setUser)} className="rounded-lg w-full cursor-pointer px-3 py-2 transition duration-300 hover:bg-gray-100 dark:hover:bg-white/5">
                                                        <p className="font-semibold flex items-center gap-2 dark:text-white">
                                                            <span><MdLogout className='text-lg' />
                                                            </span>Logout</p>
                                                    </button>
                                                }
                                            </div>
                                            <div>
                                                <TabGroup selectedIndex={themeIndex} onChange={(index) => setSelectedTheme(theme[index].name)} className="p-3 rounded-full sm:hidden">
                                                    <TabList className="flex">
                                                        {theme.map(({ name }) => (
                                                            <Tab
                                                                key={name}
                                                                className="rounded-full cursor-pointer transition duration-300 ease-in-out px-3 py-1 text-sm/6 font-semibold data-selected:text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-selected:bg-sky-400 dark:data-selected:bg-white/10 dark:data-selected:data-hover:bg-white/10"
                                                            >
                                                                {name}
                                                            </Tab>
                                                        ))}
                                                    </TabList>
                                                </TabGroup>
                                            </div>
                                        </>
                                    )}
                                </PopoverPanel>
                            </Popover>
                        )}
                </div>
                <TabGroup selectedIndex={themeIndex} onChange={(index) => setSelectedTheme(theme[index].name)} className={`p-1 rounded-full bg-white dark:bg-[#181E29] ${!user ? "block" : "hidden sm:block"}`}>
                    <TabList className="flex">
                        {theme.map(({ name }) => (
                            <Tab
                                key={name}
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