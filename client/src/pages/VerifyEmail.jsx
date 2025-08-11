import { useState } from 'react'
import { forgotPassword } from '../services/authService';
import toast from 'react-hot-toast';
import { Button } from '@headlessui/react';
import { Spinner } from '../components/svg/SVG';

function VerifyEmail() {


    const [email, setEmail] = useState("")

    const [loading, setLoading] = useState(false)

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = await forgotPassword(email);
            setTimeout(() => {
                toast.success(data.message, { position: 'top-center' });
                setLoading(false);
            }, 1500);
        } catch (err) {
            setTimeout(() => {
                toast.error(err?.error, { position: 'top-center' });
                setLoading(false);
            }, 1500);
        }
    };

    return (
        <div className='px-4 md:px-6 xl:px-0 min-h-screen'>
            <div className='max-w-md mx-auto p-4 md:p-6 rounded-md bg-white dark:bg-white/10 mt-44'>
                <form
                    onSubmit={handleForgotPassword}
                >
                    <div>
                        <h3 className='text-xl font-bold text-center'>Verify your email</h3>
                    </div>
                    <div className='mt-4'>
                        <label htmlFor="email" className='font-semibold'>Email</label>
                        <input
                            htmlFor="email"
                            type='email'
                            className="border focus:border-sky-400 dark:focus:border-blue-500 transition duration-300 outline-none w-full mt-2 placeholder:text-[14px] bg-white dark:bg-[#181E29] border-zinc-200 dark:border-zinc-700 rounded-md p-2"
                            placeholder="Enter your email here..."
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <Button
                            type='submit'
                            className="cursor-pointer flex justify-center transition duration-300 w-full text-center items-center gap-2 rounded-md bg-sky-400 dark:bg-white/10 px-3 py-2 text-sm/6 font-semibold text-white shadow-inner focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-sky-500 dark:data-hover:bg-white/15"
                        >
                            {loading ? <><Spinner /> Processing...</> : "Send Link"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default VerifyEmail