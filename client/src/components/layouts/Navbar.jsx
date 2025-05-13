import { useEffect, useState } from 'react'
import { Tab, TabGroup, TabList } from '@headlessui/react'
import { AiOutlineUser } from "react-icons/ai";
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { MdLogout } from "react-icons/md";
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem("user"))

    const [selectedTheme, setSelectedTheme] = useState('Light');

    const theme = [
        {
            name: 'Light',
        },
        {
            name: 'Dark',
        },
    ]

    useEffect(() => {
        if (selectedTheme === "Dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [selectedTheme])

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    }

    return (
        <nav className="mx-auto flex items-center justify-between pt-6 text-center h-16 max-w-7xl">
            <h1 className="font-montserrat custom-header-text leading-[58px] text-zinc-500 flex font-bold whitespace-nowrap tracking-[1px] text-3xl">
                EasyURL
            </h1>
            <div className='flex items-center gap-10'>
                <div className='flex items-center gap-2'>
                    {location.pathname === "/shorten" && <Popover>
                        <PopoverButton className="text-sm/6 cursor-pointer flex items-center gap-2 font-medium dark:text-white focus:outline-none data-active:text-sky-400 data-focus:outline data-focus:outline-white transition duration-300 data-hover:text-sky-400">
                            <AiOutlineUser className='text-xl' />
                            <span className='text-[16px]'>{user && user.username}</span>
                        </PopoverButton>
                        <PopoverPanel
                            transition
                            anchor="bottom"
                            className="divide-y min-w-[150px] divide-zinc-300 dark:divide-white/5 rounded-xl bg-white dark:bg-gray-900 text-sm transition duration-200 ease-in-out [--anchor-gap:--spacing(5)] data-closed:-translate-y-1 data-closed:opacity-0"
                        >
                            <div className="p-3">
                                <div className="block rounded-lg px-3 py-2 transition">
                                    <p className="font-semibold dark:text-white">Signed in as</p>
                                    <p className="dark:text-white/50">{user && user.email}</p>
                                </div>
                            </div>
                            <div className="p-3">
                                <button onClick={() => handleLogout()} className="rounded-lg w-full cursor-pointer px-3 py-2 transition duration-300 hover:bg-gray-100  dark:hover:bg-white/5">
                                    <p className="font-semibold flex items-center gap-2 dark:text-white"><span><MdLogout className='text-lg' /></span>Logout</p>
                                </button>
                            </div>
                        </PopoverPanel>
                    </Popover>}
                </div>
                <TabGroup className="p-1 rounded-full bg-white dark:bg-[#181E29]">
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