import { useState } from 'react';
import { Button } from '@headlessui/react';
import { Spinner } from "../svg/SVG"
import { registerUser } from '../../services/authService';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { googleLogin } from '../../services/authService';
import { FcGoogle } from "react-icons/fc";
import toast from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function Signup({ setUser }) {

    const navigate = useNavigate();

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
            }, 1500)
        } catch (err) {
            setTimeout(() => {
                toast.error(err?.error, { position: 'top-center' });
                setLoading(false)
            }, 1500)
        }
    }


    const registerWithGoogle = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const token = tokenResponse.access_token;
                const data = await googleLogin(token);
                localStorage.setItem("token", data?.accessToken);
                localStorage.setItem("token_expiry", new Date().getTime() + 24 * 60 * 60 * 1000);
                localStorage.setItem("user", JSON.stringify(data?.user));
                setTimeout(() => {
                    toast.success(data.message, { position: 'top-center' });
                    setLoading(false);
                    setUser(data?.user);
                    navigate('/shorten');
                }, 1000);
            } catch (err) {
                setTimeout(() => {
                    toast.error(err?.error || "Login failed", { position: 'top-center' });
                    setLoading(false);
                }, 1000);
            }
        },
        onError: () => console.log("Google Login Failed"),
    });

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
                    required
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
            <div className='flex items-center justify-center mt-4'>
                <div className='w-[50px] inline-flex items-center h-6'>
                    <div className='w-[50px] border-b mt-1 border-zinc-300 dark:border-gray-700'></div>
                </div>
                <h3 className='px-3 text-center inline-flex items-center'>or</h3>
                <div className='w-[50px] inline-flex items-center h-6'>
                    <div className='w-[50px] border-b mt-1 border-zinc-300 dark:border-gray-700'></div>
                </div>
            </div>
            <div className="mt-2">
                <Button
                    className="cursor-pointer flex justify-center transition duration-300 hover:bg-zinc-100 w-full text-center items-center gap-2 rounded-md border border-zinc-300 dark:border-none dark:bg-white/10 px-3 py-2 text-sm/6 font-semibold focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white dark:data-hover:bg-white/15"
                    onClick={() => registerWithGoogle()}
                    type="button">
                    <FcGoogle />
                    Register with Google
                </Button>
            </div>
        </form>
    )
}

export default Signup