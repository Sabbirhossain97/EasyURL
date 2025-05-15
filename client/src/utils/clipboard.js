import toast from 'react-hot-toast';

export const handleCopy = (url) => {
    navigator.clipboard.writeText(url)
        .then(() => {
            toast.success('url copied to clipboard!', {
                position: 'bottom-right'
            });
        }).catch((err) => {
            console.error('Failed to copy!', err)
        })
}