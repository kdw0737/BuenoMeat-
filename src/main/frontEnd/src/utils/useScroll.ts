import { useEffect, useState } from "react"

const useScroll = (height: number): boolean => {
    const [show, setShow] = useState(false);

    const handleScroll = (height: number) => {
        if (window.scrollY > height) {
            setShow(true);
        }   else {
            setShow(false);
        }
    };

    useEffect(() => {
        const scrollHandler = () => handleScroll(height);

        window.addEventListener('scroll', scrollHandler);

        return () => {
            window.removeEventListener('scroll', scrollHandler);
        };
    }, []);

    return show;
}

export default useScroll;