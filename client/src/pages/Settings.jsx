import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { Tab, TabGroup, TabList } from '@headlessui/react'
import { AiOutlineUser } from "react-icons/ai";
import { Spinner, DeleteSpinner, ImageUploadSpinner } from "../components/svg/SVG"
import { deleteAccount, updateProfile } from '../services/userService';
import toast from 'react-hot-toast';

const ImagePreview = ({ src, uploading }) => (
    <div className='relative'>
        <img
            src={src}
            alt="Profile"
            className={`w-40 h-40 ${uploading && "opacity-30"} rounded-full object-cover object-top border border-gray-300 dark:border-zinc-700`}
        />
        {uploading && <ImageUploadSpinner />}
    </div>
);

function ProfileSettings() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [formData, setFormData] = useState({
        file: null,
        previewImg: '',
        username: user?.username || "",
        password: ""
    });
    const [loading, setLoading] = useState({
        uploading: false,
        updating: false
    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!['image/jpeg', 'image/png'].includes(file.type)) {
            return toast.error('Only JPG and PNG images are allowed!');
        }

        if (file.size > 2 * 1024 * 1024) {
            return toast.error('Image must be less than 2MB!');
        }

        setLoading(prev => ({ ...prev, uploading: true }));
        setTimeout(() => {
            setFormData(prev => ({
                ...prev,
                file,
                previewImg: URL.createObjectURL(file)
            }));
            setLoading(prev => ({ ...prev, uploading: false }));
        }, 2000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.password.trim()) {
            return toast.error("Please confirm your password", { position: 'top-center' });
        }

        setLoading(prev => ({ ...prev, updating: true }));
        try {
            const form = new FormData();
            form.append('username', formData.username.trim() || user?.username);
            form.append('password', formData.password);
            if (formData.file) form.append('profilePicture', formData.file);

            const { user: updatedUser, message } = await updateProfile(form);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setTimeout(() => {
                toast.success(message, { position: 'bottom-right' });
                setLoading(prev => ({ ...prev, updating: false }))
            }, 2000);
            setTimeout(() => window.location.reload(), 3000);
        } catch (err) {
            toast.error(err?.error, { position: 'top-center' });
        } 
    };

    return (
        <main className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4 justify-center">
            <div className="md:p-4">
                <div className="w-full px-4 pb-8 mt-8 sm:rounded-lg">
                    <form onSubmit={handleSubmit} className="grid max-w-2xl mx-auto mt-8">
                        <div className="flex flex-col items-center space-y-5 md:flex-row md:space-y-0">
                            {formData.previewImg ? (
                                <ImagePreview src={formData.previewImg} uploading={loading.uploading} />
                            ) : user?.image ? (
                                <ImagePreview src={user.image} uploading={loading.uploading} />
                            ) : (
                                <div className="w-40 h-40 border rounded-full border-zinc-300 flex justify-center items-center">
                                    <AiOutlineUser className="text-gray-400 text-[92px] rounded-full" />
                                </div>
                            )}
                            <div className="flex items-center gap-2 md:ml-8">
                                <label className="py-2.5 px-7 inline-flex gap-2 items-center whitespace-nowrap bg-sky-500 transition duration-300 cursor-pointer hover:bg-sky-400 text-base font-medium text-white focus:outline-none rounded-md">
                                    {loading.uploading ? <><Spinner /> Uploading...</> : (!formData.previewImg && !user?.image) ? "Upload picture" : "Change picture"}
                                    <input onChange={handleFileChange} type="file" className="hidden" />
                                </label>
                            </div>
                        </div>

                        <div className="items-center mt-10 sm:mt-14 text-[#202142]">
                            <div className="w-full mb-4">
                                <label className='font-semibold dark:text-white'>Username</label>
                                <input
                                    type="text"
                                    value={formData.username}
                                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                                    className="border focus:border-sky-400 dark:text-white mt-2 dark:focus:border-blue-500 transition duration-300 outline-none w-full placeholder:text-[14px] dark:placeholder:text-gray-400 dark:bg-[#181E29] bg-white border-zinc-200 dark:border-zinc-700 rounded-md p-2"
                                    placeholder="Your username"
                                />
                            </div>

                            <div className="mb-4">
                                <label className='font-semibold dark:text-white'>Email</label>
                                <input
                                    type="email"
                                    value={user?.email}
                                    className="border text-gray-500 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed focus:border-sky-400 bg-gray-200 mt-2 dark:focus:border-blue-500 transition duration-300 outline-none w-full placeholder:text-[14px] dark:placeholder:text-gray-400 border-zinc-200 dark:border-zinc-700 rounded-md p-2"
                                    disabled
                                />
                            </div>

                            <div className="mb-4">
                                <label className='font-semibold dark:text-white'>Confirm password</label>
                                <input
                                    type="text"
                                    value={formData.password}
                                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                                    className="border dark:text-white focus:border-sky-400 mt-2 dark:focus:border-blue-500 transition duration-300 outline-none w-full placeholder:text-[14px] dark:placeholder:text-gray-400 dark:bg-[#181E29] bg-white border-zinc-200 dark:border-zinc-700 rounded-md p-2"
                                    placeholder="password"
                                />
                            </div>

                            <div className="flex justify-end">
                                <button type="submit" className="py-2.5 px-7 inline-flex gap-2 items-center bg-sky-500 transition duration-300 cursor-pointer hover:bg-sky-400 text-base font-medium text-white focus:outline-none rounded-md">
                                    {loading.updating ? <><Spinner /> Updating...</> : "Update"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}

function AccountSettings() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleAccountDelete = async () => {
        setLoading(true);
        try {
            const { message } = await deleteAccount();
            ['token', 'user', 'token_expiry'].forEach(key => localStorage.removeItem(key));
            setTimeout(() => {
                toast.success(message, { position: 'bottom-right' });
                setLoading(false);
                navigate("/");
            }, 2000);
        } catch (err) {
            toast.error(err?.error, { position: 'top-center' });
        }
    };

    return (
        <main className="w-full min-h-screen py-10 md:w-2/3 lg:w-3/4 px-4">
            <div className='border items-center sm:items-start border-red-500 rounded-md p-10'>
                <h1 className='font-bold text-xl text-center sm:text-left dark:text-white'>Delete Account</h1>
                <h3 className='mt-4 text-sm text-center sm:text-start font-medium text-zinc-500 dark:text-gray-400'>
                    Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone.
                </h3>
                <div className='mt-6 flex justify-center sm:justify-end'>
                    <button
                        onClick={handleAccountDelete}
                        className="py-2.5 px-7 inline-flex gap-2 items-center bg-red-500 transition duration-300 cursor-pointer hover:bg-red-400 text-base font-medium text-white focus:outline-none rounded-md"
                    >
                        {loading ? <><DeleteSpinner /> Processing...</> : "Delete Account"}
                    </button>
                </div>
            </div>
        </main>
    );
}

function Settings() {
    const [selectedTab, setSelectedTab] = useState(0);
    const tabs = [
        { name: 'Profile Settings', element: <ProfileSettings /> },
        { name: 'Account Settings', element: <AccountSettings /> }
    ];

    return (
        <div className='py-20 max-w-7xl mx-auto'>
            <div className="py-10 px-6 md:px-16 lg:px-28">
                <Link to="/shorten" className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-500 dark:text-white dark:hover:text-white/40 transition duration-300">
                    <FaArrowLeftLong />Back to previous page
                </Link>
            </div>
            <div className="w-full flex flex-col gap-5 px-3 md:px-6 lg:px-24 md:flex-row text-[#161931]">
                <aside className="py-4 md:w-1/3 lg:w-1/4">
                    <div className="sticky flex flex-col gap-2 p-4 text-sm md:border-r border-zinc-300 dark:border-gray-700 top-12">
                        <h2 className="pl-3 mb-4 text-2xl text-center md:text-left dark:text-white font-semibold">Settings</h2>
                        <TabGroup onChange={setSelectedTab}>
                            <TabList className='flex md:flex-col gap-2'>
                                {tabs.map(({ name }, idx) => (
                                    <Tab
                                        key={name}
                                        className={`${selectedTab === idx ? "bg-gray-200 dark:bg-white/10" : ""} focus:outline-none flex justify-center md:justify-start cursor-pointer transition duration-300 items-center w-full dark:text-white px-3 py-2.5 font-semibold hover:bg-gray-200 dark:hover:bg-white/10 rounded-md`}
                                    >
                                        {name}
                                    </Tab>
                                ))}
                            </TabList>
                        </TabGroup>
                    </div>
                </aside>
                {tabs[selectedTab].element}
            </div>
        </div>
    );
}

export default Settings