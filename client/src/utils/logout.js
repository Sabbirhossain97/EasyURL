import toast from 'react-hot-toast';

export const handleLogout = (navigate, setLoading, setUser) => {
    setLoading(true)
    setTimeout(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem("token_expiry");
        setUser("")
        navigate('/');
        toast.success("Logged out successfully!", { position: 'top-center' });
        setLoading(false)
    }, 3000)
}