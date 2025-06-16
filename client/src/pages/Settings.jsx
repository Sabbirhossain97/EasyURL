import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { Tab, TabGroup, TabList } from '@headlessui/react'
import { AiOutlineUser } from "react-icons/ai";
import { Spinner, DeleteSpinner, ImageUploadSpinner } from "../components/svg/SVG"
import { deleteAccount, updateProfile, getUserStats } from '../services/userService';
import { FaUsers } from "react-icons/fa";
import { FaLongArrowAltUp } from "react-icons/fa";
import { IoIosLink } from "react-icons/io";
import { AdminStatCardSkeleton } from '../layouts/Skeleton';
import { signInDateOptions } from '../constants/dateOptions';
import AdminStatFilter from '../components/filters/AdminStatFilter';
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
            return toast.error("Please confirm your account password", { position: 'top-center' });
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
        <main className="w-full min-h-screen py-1 lg:w-3/4 justify-center">
            <div className="md:p-4 bg-white dark:bg-white/5 rounded-md">
                <div className="w-full px-4 pb-8 pt-4 lg:pt-0 mt-8 sm:rounded-lg">
                    <form onSubmit={handleSubmit} className="grid max-w-3xl mx-auto mt-8">
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
        <main className="min-h-screen py-10 lg:py-0 w-full lg:w-3/4">
            <div className='border items-center bg-white dark:bg-white/10 sm:items-start border-red-500/30 rounded-md p-10'>
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

function AdminSettings() {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false);
    const [sortBy, setSortBy] = useState({
        slug: "createdAt_desc",
        field: "Joined Date ( newest )"
    });

    const fetchUsers = async (sortBy) => {
        setLoading(true)
        try {
            const data = await getUserStats(sortBy);
            setUsers(data)
        } catch (err) {
            toast.error(err?.error, { position: 'top-center' });
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers(sortBy)
    }, [sortBy])

    return (
        <>
            <div className='lg:w-3/4'>
                <div className='flex flex-col sm:flex-row gap-6 w-full'>
                    {loading ? <AdminStatCardSkeleton /> :
                        <div className='border flex-1 dark:text-white bg-white dark:bg-[#181E29] p-4 flex gap-4 flex-col rounded-md border-zinc-200 dark:border-gray-800'>
                            <div className='flex items-center justify-between'>
                                <div>
                                    <h1 className='dark:text-white'>Total Users</h1>
                                    <h3 className='font-bold'>{users?.usersData?.length}</h3>
                                </div>
                                <div>
                                    <FaUsers className='text-2xl text-sky-400 dark:text-white' />
                                </div>
                            </div>
                            <div className='text-center'>
                                <h3 className='flex items-center'><FaLongArrowAltUp className='text-sky-400 dark:text-white' /> <span>{users?.usersFromLastMonth} &nbsp;Since last month</span></h3>
                                <h3 className='flex items-center'><FaLongArrowAltUp className='text-sky-400 dark:text-white' /> <span>{users?.usersFromLastWeek} &nbsp;Since last week</span></h3>
                            </div>
                        </div>
                    }

                    {loading ? <AdminStatCardSkeleton /> : <div className='border flex-1 dark:text-white bg-white dark:bg-[#181E29] r p-4 flex gap-4 flex-col rounded-md border-zinc-200 dark:border-gray-800'>
                        <div className='flex items-center justify-between'>
                            <div>
                                <h1 className='dark:text-white'>Total URLs</h1>
                                <h3 className='font-bold'>{users?.totalUrls}</h3>
                            </div>
                            <div>
                                <IoIosLink className='text-2xl text-sky-400 dark:text-white' />
                            </div>
                        </div>
                        <div className='text-center'>
                            <h3 className='flex items-center'><FaLongArrowAltUp className='text-sky-400 dark:text-white' /> <span>{users?.urlsFromLastMonth} &nbsp;Since last month</span></h3>
                            <h3 className='flex items-center'><FaLongArrowAltUp className='text-sky-400 dark:text-white' /> <span>{users?.urlsFromLastWeek} &nbsp;Since last week</span></h3>
                        </div>
                    </div>
                    }
                </div>
                <div className='py-4 flex justify-end'>
                    <AdminStatFilter
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                </div>
                {loading ? <div className='w-full h-[420px] flex justify-center items-center'><Spinner /></div> :
                    <div className="w-full max-h-[420px] overflow-y-auto overflow-x-auto overflow-hidden rounded-xl bg-white dark:bg-[#101522]">
                        <table className="w-full text-sm text-left rtl:text-right border-collapse">
                            <thead className="text-md sticky top-0 left-0 right-0 rounded-t-xl bg-zinc-200 dark:bg-[#181E29] text-zinc-600 dark:text-white">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Username
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Role
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        URLs
                                    </th>
                                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                                        Last Signed In
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Joined
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='dark:text-[#b2b6bd]'>
                                {users?.usersData?.map((user, index) => (
                                    <tr key={index}

                                        className={`border-b border-zinc-300/40 dark:border-gray-700/40`}
                                    >
                                        <td className="px-6 py-4 truncate max-w-[250px]">
                                            {user.username}
                                        </td>
                                        <td className="px-6 py-4 text-start">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 text-start">
                                            {user.role ? user.role : "user"}
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            {user.urlCount}
                                        </td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap">
                                            {user.lastSignedIn ? new Date(user.lastSignedIn).toLocaleDateString('en-Us', signInDateOptions) : " N/A"}
                                        </td>
                                        <td className="px-6 py-4 text-start whitespace-nowrap">
                                            {user.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>}
            </div>
        </>
    )
}

function Settings() {
    const [selectedTab, setSelectedTab] = useState(0);
    const user = JSON.parse(localStorage.getItem("user"));

    const tabs = user.role === "admin" ? [
        { name: 'Profile', element: <ProfileSettings /> },
        { name: 'Account', element: <AccountSettings /> },
        { name: 'Admin', element: <AdminSettings /> }] :
        [{ name: 'Profile', element: <ProfileSettings /> },
        { name: 'Account', element: <AccountSettings /> }]

    return (
        <div className='py-20 max-w-7xl mx-auto px-3 md:px-4 xl:px-2'>
            <div className="py-10">
                <Link to="/shorten" className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-500 dark:text-white dark:hover:text-white/40 transition duration-300">
                    <FaArrowLeftLong />Back to previous page
                </Link>
            </div>
            <div className="w-full flex flex-col gap-5 lg:flex-row text-[#161931]">
                <aside className="py-4 w-full lg:w-1/4">
                    <div className="sticky flex flex-col gap-2 text-sm lg:border-r border-zinc-300 dark:border-gray-700 top-12">
                        <h2 className="mb-4 text-2xl text-center lg:text-left dark:text-white font-semibold">Settings</h2>
                        <TabGroup onChange={setSelectedTab} className="bg-white dark:bg-white/5 lg:pr-4 lg:bg-transparent dark:lg:bg-transparent rounded-md">
                            <TabList className='flex flex-row lg:flex-col gap-2 p-2 lg:p-0'>
                                {tabs.map(({ name }, idx) => (
                                    <Tab
                                        key={name}
                                        className={`${selectedTab === idx ? "bg-gray-200/70 dark:bg-white/10" : ""} focus:outline-none flex justify-center whitespace-nowrap lg:justify-start cursor-pointer transition duration-300 items-center w-full dark:text-white px-3 py-2.5 font-semibold hover:bg-gray-200 dark:hover:bg-white/10 rounded-md`}
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