import { useState } from 'react';
import { Button } from '@headlessui/react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '../svg/SVG';

function Login() {

    const navigate = useNavigate();

    const [formValues, setFormValues] = useState({
        email: "",
        password: ""
    })

    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/signin`, formValues)
            localStorage.setItem("token", res?.data?.accessToken)
            localStorage.setItem("user", JSON.stringify(res?.data?.user))
            setTimeout(() => {
                toast.success(res?.data?.message, { position: 'top-center' });
                setLoading(false)
                navigate('/shorten');
            }, 1500)
        } catch (err) {
            setTimeout(() => {
                toast.error(err?.response?.data?.error, { position: 'top-center' });
                setLoading(false)
            }, 1500)
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <div className='mt-4'>
                <label htmlFor="email" className='font-semibold'>Email</label>
                <input
                    htmlFor="email"
                    type='email'
                    className="border w-full mt-2 placeholder:text-[14px] bg-white dark:bg-[#181E29] border-zinc-200 dark:border-zinc-700 rounded-md p-2"
                    placeholder="Enter your email here..."
                    value={formValues.email}
                    required
                    onChange={(e) => setFormValues({ ...formValues, email: e.target.value })}
                />
            </div>
            <div className='mt-4'>
                <label htmlFor="password" className='font-semibold'>Password</label>
                <input
                    htmlFor="password"
                    className="border w-full mt-2 placeholder:text-[14px] bg-white dark:bg-[#181E29] border-zinc-200 dark:border-zinc-700 rounded-md p-2"
                    placeholder="Enter your password here..."
                    value={formValues.password}
                    required
                    onChange={(e) => setFormValues({ ...formValues, password: e.target.value })}
                />
            </div>
            <div className="mt-6">
                <Button
                    type='submit'
                    className="cursor-pointer flex justify-center transition duration-300 w-full text-center items-center gap-2 rounded-md bg-sky-400 dark:bg-white/10 px-3 py-2 text-sm/6 font-semibold text-white shadow-inner focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-sky-500 dark:data-hover:bg-white/15"
                >
                    {loading ? <><Spinner /> Processing...</> : "Signin"}
                </Button>
            </div>
        </form>
    )
}

export default Login