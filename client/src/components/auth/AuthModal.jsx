import { Tab, TabGroup, TabList, TabPanel, TabPanels, Button, Dialog, DialogPanel, DialogBackdrop, DialogTitle } from '@headlessui/react';
import Login from './Login';
import Signup from './Signup';

function AuthModal({ isAuthModalOpen, setIsAuthModalOpen }) {

    const authTabs = [
        {
            name: 'Signin',
        },
        {
            name: 'Signup',
        },
    ]

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
                        className="w-full max-w-md rounded-xl shadow-xl bg-white dark:bg-[#181E29] p-6 backdrop-blur-2xl duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                        <TabGroup className="p-1 rounded-full bg-white dark:bg-[#181E29]">
                            <DialogTitle as="h3" className="text-lg font-bold flex justify-center dark:text-white">
                                <TabList className="flex gap-2 justify-center w-full">
                                    {authTabs.map(({ name }) => (
                                        <Tab
                                            key={name}
                                            className="rounded-md cursor-pointer transition duration-300 ease-in-out px-10 py-1 font-semibold data-selected:text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-selected:bg-sky-400 dark:data-selected:bg-white/10 dark:data-selected:data-hover:bg-white/10"
                                        >
                                            {name}
                                        </Tab>
                                    ))}
                                </TabList>
                            </DialogTitle>
                            <TabPanels className="mt-3">
                                {authTabs.map(({ name }) => (
                                    <TabPanel key={name} className="rounded-xl p-3">
                                        {name === "Signin" ?
                                            <Login />
                                            :
                                            <Signup />
                                        }
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