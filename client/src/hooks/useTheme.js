import { useState, useEffect } from "react";

export const useTheme = () => {

    const [selectedTheme, setSelectedTheme] = useState('Light');

    useEffect(() => {
        if (selectedTheme === "Dark") {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }, [selectedTheme])

    return { setSelectedTheme }

}