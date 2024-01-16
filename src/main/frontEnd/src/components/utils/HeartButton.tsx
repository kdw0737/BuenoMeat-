import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import useFavorite from "../../hooks/useFavorites";


interface HeartButtonProps {
    userId: number;
    productId?: number;
}

const HeartButton = ({
    userId,
    productId
}: HeartButtonProps) => {

    const { hasFavorite, toggleFavorite } = useFavorite({
        productId,
        userId
    })


    useFavorite({ userId, productId });

    return (
        <div 
            className='relative transition cursor-pointer hover:opacity-80'
            onClick={toggleFavorite}
        >
            <AiOutlineHeart 
                size={32}
                className="absolute fill-white -top-[2px] -right-[2px]"
            />

            <AiFillHeart 
                size={28}
                className={hasFavorite ? `fill-rose-500` : `fill-neutral-500`}
            />
    </div>
    )
}

export default HeartButton