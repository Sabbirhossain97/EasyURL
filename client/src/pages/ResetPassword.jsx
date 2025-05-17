import { useState } from 'react'
import toast from 'react-hot-toast';
import { Button } from '@headlessui/react';
import { Spinner } from '../components/svg/SVG';
import { resetPassword } from '../services/authService';
import { useParams, useNavigate } from 'react-router-dom';

function ResetPassword() {

    const { token } = useParams();
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        newPassword: "",
        confirmPassword: ""
    })
    const [loading, setLoading] = useState(false)

    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        setLoading(true)

        if (formValues.newPassword !== formValues.confirmPassword) {
            toast.error("Passwords doesn't match!", { position: 'top-center' });
            setLoading(false)
            return
        }

        try {
            const data = await resetPassword(token, formValues.newPassword)
            setTimeout(() => {
                toast.success(data?.message, { position: 'top-center' });
                setLoading(false);
                setFormValues({
                    newPassword: "",
                    confirmPassword: ""
                });
                navigate("/", { state: { from: "reset-password" }})
            }, 1500)
        } catch (err) {
            setTimeout(() => {
                toast.error(err?.error, { position: 'top-center' });
                setLoading(false)
            }, 1500)
        }
    }

    return (
        <div className='max-w-md mx-auto p-6 rounded-md bg-white dark:bg-white/10 mt-44'>
            <form onSubmit={handlePasswordUpdate}>
                <div>
                    <h3 className='text-xl font-bold text-center'>Reset password</h3>
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
                        {loading ? <><Spinner /> Processing...</> : "Reset"}
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword