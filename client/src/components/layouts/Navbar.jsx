import { useEffect, useState } from 'react'
import { Tab, TabGroup, TabList } from '@headlessui/react'

function Navbar() {

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

    return (
        <nav className="mx-auto flex items-center justify-between pt-2 text-center h-16">
            <h1 className="font-montserrat custom-header-text leading-[58px] text-zinc-500 flex font-bold whitespace-nowrap tracking-[1px] text-3xl">
                EasyURL
            </h1>
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
        </nav>
    )
}

export default Navbar