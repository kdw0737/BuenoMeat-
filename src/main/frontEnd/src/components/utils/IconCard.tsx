import { IconType } from 'react-icons';
import { useNavigate } from 'react-router-dom';

interface IconCardProps {
    label: string;
    path?: string;
    icon: IconType;
}

const IconCard = ({
    label,
    path,
    icon: Icon,
}: IconCardProps) => {
    const navigate = useNavigate();

    return (
        <div 
            className='flex flex-col relative items-center justify-center px-2 py-1 transition-all border-2 rounded-lg text-center cursor-pointer border-zinc-800 hover:bg-zinc-300 w-[100px] h-[100px]'
            onClick={() => {
                if (path === 'orderlist' 
                || path === 'cart' 
                || path === 'wishlist') {
                    navigate(`/member/mypage/${path}`);
                } else {
                    navigate(`category/${path}`);
                }
                
            }}
        >
            <span className='flex gap-2'>
                <Icon size={30} />
            </span>
            <label>{label}</label>
        </div>
    )
}

export default IconCard
