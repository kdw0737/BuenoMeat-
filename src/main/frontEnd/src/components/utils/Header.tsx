import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

interface HeaderProps {
    pageType: string;
    pageName?: string;
}

const Header = ({
    pageType,
    pageName
}: HeaderProps) => {
    return (
        <header className='flex items-center justify-end pr-2 mt-10'>
            <Link to='/'><p className='text-sm font-light text-gray-400'>HOME</p></Link>
            <MdKeyboardArrowRight />
            <p className='text-sm font-light text-gray-500 uppercase'>{pageType}</p>
            <MdKeyboardArrowRight />
            <p className='uppercase'>{pageName}</p>
        </header>
    )
}

export default Header