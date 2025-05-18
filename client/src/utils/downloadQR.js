export const handleDownloadQR = (viewUrl, setLoading) => {
    const link = document.createElement('a');
    link.href = viewUrl?.qr?.code;
    setLoading(true)
    setTimeout(() => {
        link.download = `${viewUrl.shortId}-qr.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        setLoading(false)
    }, 2000)
}