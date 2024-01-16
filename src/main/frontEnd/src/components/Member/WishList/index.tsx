import { useSelector } from "react-redux"
import { RootState } from "../../../redux"
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../ProductCard";
import { AiFillFire } from "react-icons/ai";
import { ProductProps } from "../../../types/ProductProps";

const WishList = () => {
    const memberId = useSelector((state: RootState) => state.currentUser.id);
    const [favoriteProducts, setFavoriteProducts] = useState<ProductProps[]>([]);
    
    const fetchData = async () => {
        const response = await axios.get(`/mypage/favorites/${memberId}`);
        setFavoriteProducts(response.data);
    }

    useEffect(() => {
        fetchData();
    }, [])

    console.log(favoriteProducts);
    

    return (
        <div className='px-10 mt-10 ml-52'>
            <p className="text-5xl font-bold text-start">관심상품</p>
            <hr className="h-1 my-5 bg-black" />
            {favoriteProducts.length > 0 ? 
                <div className="grid grid-cols-1 gap-8 mt-20 sm:grid-cols-2 md:grid-cols-3">
                    {favoriteProducts.map(product => (
                        <span key={product.id}>
                            <ProductCard 
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                                icon={AiFillFire}
                            />
                        </span>
                    ))}
                </div> : 
                <div>
                    <p className="text-lg text-center text-gray-400 mt-28">관심상품이 없습니다.</p>
                </div>
            }
        </div>
    )
}

export default WishList