import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { verifyRegistration } from "../services/authService";
import { Spinner } from "../components/svg/SVG";
import toast from "react-hot-toast";

const RegisterVerifyEmail = () => {
    const { token } = useParams();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const data = await verifyRegistration(token);
                setTimeout(() => {
                    toast.success(data?.message, { position: 'top-center' });
                    toast.success('Please log in to continue!', { position: 'top-center' });
                    navigate("/", { state: 'success' });
                }, 2500)
            } catch (err) {
                setTimeout(() => {
                    setError("Verification Failed!")
                }, 1500)
            }
        };

        verifyEmail();
    }, [token, navigate]);

    return <div className="min-h-screen flex text-xl font-semibold justify-center items-center">
        <p className="flex gap-4 items-center"> <Spinner /> Verifying your email...</p>
    </div>;
};

export default RegisterVerifyEmail;