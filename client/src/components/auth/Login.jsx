import { useState } from 'react';
import { Button } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../svg/SVG';
import { loginUser } from '../../services/authService';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
function Login() {

    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    })
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await loginUser(formValues);
            localStorage.setItem("token", data?.accessToken);
            localStorage.setItem("user", JSON.stringify(data?.user));
            setTimeout(() => {
                toast.success(data.message, { position: 'top-center' });
                setLoading(false);
                navigate('/shorten');
            }, 1500);
        } catch (err) {
            setTimeout(() => {
                toast.error(err?.error || "Login failed", { position: 'top-center' });
                setLoading(false);
            }, 1500);
        }
    };

    return (
        <>
            <form onSubmit={handleLogin}>
                <div className='mt-4'>
                    <label htmlFor="email" className='font-semibold'>Email</label>
                    <input
                        htmlFor="email"
                        type='email'
                        className="border focus:border-sky-400 dark:focus:border-blue-500 transition duration-300 outline-none w-full mt-2 placeholder:text-[14px] bg-white dark:bg-[#181E29] border-zinc-200 dark:border-zinc-700 rounded-md p-2"
                        placeholder="Enter your email here..."
                        value={formValues.email}
                        required
                        onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
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
                        required
                        onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                    />
                    {visible ? <MdVisibility onClick={() => setVisible(!visible)} className='cursor-pointer absolute bottom-3 text-zinc-400 right-2' />
                        :
                        <MdVisibilityOff onClick={() => setVisible(!visible)} className='cursor-pointer absolute bottom-3 text-zinc-400 right-2' />
                    }
                </div>
                <div className="mt-6">
                    <Button
                        type='submit'
                        className="cursor-pointer flex justify-center transition duration-300 w-full text-center items-center gap-2 rounded-md bg-sky-400 dark:bg-white/10 px-3 py-2 text-sm/6 font-semibold text-white shadow-inner focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-sky-500 dark:data-hover:bg-white/15"
                    >
                        {loading ? <><Spinner /> Processing...</> : "Signin"}
                    </Button>
                </div>
                <div className='mt-4 text-center'>
                    <button onClick={() => navigate("/forgot-password")} className='text-sky-400 inline-flex dark:text-white underline cursor-pointer'>Forgot password?</button>
                </div>
            </form>
        </>
    )
}

export default Login