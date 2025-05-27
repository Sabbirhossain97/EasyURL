import { useState } from 'react';
import { Button } from '@headlessui/react';
import { Spinner } from "../svg/SVG"
import { registerUser } from '../../services/authService';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import toast from 'react-hot-toast';

function Signup({ onSuccess }) {

    const [formValues, setFormValues] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const data = await registerUser(formValues)
            setTimeout(() => {
                toast.success(data?.message, { position: 'top-center' });
                setLoading(false);
                onSuccess()
                toast.success("Please log in to continue!", { position: 'top-center' });
            }, 1500)
        } catch (err) {
            setTimeout(() => {
                toast.error(err?.error, { position: 'top-center' });
                setLoading(false)
            }, 1500)
        }
    }

    return (
        <form onSubmit={handleRegister}>
            <div className='mt-4'>
                <label htmlFor="username" className='font-semibold'>Username</label>
                <input
                    htmlFor="username"
                    className="border focus:border-sky-400 dark:focus:border-blue-500 transition duration-300 outline-none w-full mt-2 placeholder:text-[14px] bg-white dark:bg-[#181E29] border-zinc-200 dark:border-zinc-700 rounded-md p-2"
                    placeholder="Enter your name here..."
                    value={formValues.username}
                    onChange={(e) => setFormValues({ ...formValues, username: e.target.value })}
                />
            </div>
            <div className='mt-4'>
                <label htmlFor="email" className='font-semibold'>Email</label>
                <input
                    htmlFor="email"
                    type='email'
                    className="border focus:border-sky-400 dark:focus:border-blue-500 transition duration-300 outline-none w-full mt-2 placeholder:text-[14px] bg-white dark:bg-[#181E29] border-zinc-200 dark:border-zinc-700 rounded-md p-2"
                    placeholder="Enter your email here..."
                    value={formValues.email}
                    onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                    required
                />
            </div>
            <div className='mt-4 relative'>
                <label htmlFor="password" className='font-semibold'>Password</label>
                <input
                    htmlFor="password"
                    type={visible ? "text" : "password"}
                    className="border focus:border-sky-400 dark:focus:border-blue-500 transition duration-300 outline-none w-full mt-2 placeholder:text-[14px] bg-white dark:bg-[#181E29] border-zinc-200 dark:border-zinc-700 rounded-md p-2"
                    placeholder="Enter your password here..."
                    value={formValues.password}
                    onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                    required
                />
                {visible ?
                    <MdVisibility onClick={() => setVisible(!visible)} className='cursor-pointer absolute bottom-3 text-zinc-400 right-2' />
                    :
                    <MdVisibilityOff onClick={() => setVisible(!visible)} className='cursor-pointer absolute bottom-3 text-zinc-400 right-2' />
                }
            </div>
            <div className="mt-6">
                <Button
                    type='submit'
                    className="cursor-pointer flex justify-center transition duration-300 w-full text-center items-center gap-2 rounded-md bg-sky-400 dark:bg-white/10 px-3 py-2 text-sm/6 font-semibold text-white shadow-inner focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-sky-500 dark:data-hover:bg-white/15"
                >
                    {loading ? <><Spinner /> Processing...</> : "Create"}
                </Button>
            </div>
        </form>
    )
}

export default Signup