import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const useTokenExpiryChecker = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            const token = localStorage.getItem("token");
            const expiry = localStorage.getItem("token_expiry");

            if (token && expiry && Date.now() > Number(expiry)) {
                localStorage.removeItem("token");
                localStorage.removeItem("token_expiry");
                localStorage.removeItem('user');
                toast.success("Token Expired", { position: 'top-center' });
                toast.success("Please Log in again", { position: 'top-center' });
                navigate("/")
            }
        }, 60 * 1000);

        return () => clearInterval(interval);
    }, [navigate]);
};

export default useTokenExpiryChecker;