import { useState } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels, Dialog, DialogPanel, DialogBackdrop } from '@headlessui/react';
import Login from "../auth/Login"
import Signup from '../auth/Signup';

function AuthModal({ setUser, isAuthModalOpen, setIsAuthModalOpen }) {

    const [selectedIndex, setSelectedIndex] = useState(0);

    const authTabs = [
        {
            name: 'Signin',
            component: () => <Login setUser={setUser} />
        },
        {
            name: 'Signup',
            component: (switchTab) => <Signup setUser={setUser} onSuccess={() => switchTab(0)} />
        },
    ];

    return (
        <Dialog
            open={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            as="div" className="relative z-10 focus:outline-none"
        >
            <DialogBackdrop className="fixed inset-0 backdrop-blur-sm" />
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-lg rounded-xl shadow-xl bg-white dark:bg-[#181E29] p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                        <TabGroup selectedIndex={selectedIndex} onChange={setSelectedIndex} className="p-1 rounded-full bg-white dark:bg-[#181E29]">
                            <TabList className="w-full flex justify-center">
                                {authTabs.map(({ name }) => (
                                    <Tab
                                        key={name}
                                        className="rounded-md text-xl whitespace-nowrap cursor-pointer transition duration-300 ease-in-out px-8 sm:px-8 py-1 font-semibold data-selected:text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-selected:bg-sky-400 dark:data-selected:bg-white/10 dark:data-selected:data-hover:bg-white/10"
                                    >
                                        {name}
                                    </Tab>
                                ))}
                            </TabList>
                            <TabPanels className="mt-3">
                                {authTabs.map(({ component }, index) => (
                                    <TabPanel key={index} className="rounded-xl py-3">
                                        {component(setSelectedIndex)}
                                    </TabPanel>
                                ))}
                            </TabPanels>
                        </TabGroup>
                    </DialogPanel>
                </div>
            </div>
        </Dialog >
    )
}

export default AuthModal