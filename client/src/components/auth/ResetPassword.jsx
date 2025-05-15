import { useState } from 'react';
import { Spinner } from '../svg/SVG';
import { Button } from '@headlessui/react';
import { resetPassword } from '../../services/authService';
import toast from 'react-hot-toast';

function ResetPassword({ onSuccess }) {

    const [loading, setLoading] = useState(false)

    const [formValues, setFormValues] = useState({
        email: "",
        newPassword: "",
        confirmPassword: ""
    })

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        setLoading(true)

        if (formValues.newPassword !== formValues.confirmPassword) {
            toast.error("Passwords doesn't match!", { position: 'top-center' });
            setLoading(false)
            return
        }

        try {
            const data = await resetPassword(formValues)
            setTimeout(() => {
                toast.success(data?.message, { position: 'top-center' });
                setLoading(false)
                onSuccess();
                toast.success("Please log in to continue!", { position: 'top-center' });
                setFormValues({
                    email: "",
                    newPassword: "",
                    confirmPassword: ""
                });
            }, 1500)
        } catch (err) {
            setTimeout(() => {
                toast.error(err?.error, { position: 'top-center' });
                setLoading(false)
            }, 1500)
        }
    }

    return (
        <form onSubmit={handlePasswordUpdate}>
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
            <div className='mt-4'>
                <label htmlFor="password" className='font-semibold'>New Password</label>
                <input
                    htmlFor="password"
                    className="border focus:border-sky-400 dark:focus:border-blue-500 transition duration-300 outline-none w-full mt-2 placeholder:text-[14px] bg-white dark:bg-[#181E29] border-zinc-200 dark:border-zinc-700 rounded-md p-2"
                    placeholder="Enter your new password here..."
                    value={formValues.newPassword}
                    required
                    onChange={(e) => setFormValues({ ...formValues, newPassword: e.target.value })}
                />
            </div>
            <div className='mt-4'>
                <label htmlFor="confirm_password" className='font-semibold'>Confirm Password</label>
                <input
                    htmlFor="confirm_password"
                    className="border focus:border-sky-400 dark:focus:border-blue-500 transition duration-300 outline-none w-full mt-2 placeholder:text-[14px] bg-white dark:bg-[#181E29] border-zinc-200 dark:border-zinc-700 rounded-md p-2"
                    placeholder="Confirm your new password here..."
                    value={formValues.confirmPassword}
                    required
                    onChange={(e) => setFormValues({ ...formValues, confirmPassword: e.target.value })}
                />
            </div>
            <div className="mt-6">
                <Button
                    type='submit'
                    className="cursor-pointer flex justify-center transition duration-300 w-full text-center items-center gap-2 rounded-md bg-sky-400 dark:bg-white/10 px-3 py-2 text-sm/6 font-semibold text-white shadow-inner focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-sky-500 dark:data-hover:bg-white/15"
                >
                    {loading ? <><Spinner /> Processing...</> : "Update"}
                </Button>
            </div>
        </form>
    )
}

export default ResetPassword