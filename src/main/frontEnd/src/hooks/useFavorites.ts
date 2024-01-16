import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ProductProps } from "../types/ProductProps";

interface UseFavorite {
    productId?: number;
    userId: number;
}

const useFavorite = ({ userId, productId }: UseFavorite) => {
    const [favorites, setFavorites] = useState<number[]>([]);
    const navigate = useNavigate();

    const getFetchFavorites = async () => {
        try {
            const response = await axios.get(`/mypage/favorites/${userId}`);
            
            const favoriteIds = response.data.map((product: ProductProps) => product.id);

            setFavorites(favoriteIds);
        } catch (error) {
            console.log(error);
        }
    };

    const hasFavorite = useMemo(() => {
        const list = userId ? favorites : [];
        return list.includes(productId!);
    }, [userId, productId, favorites]);
    
    const toggleFavorite = (async (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        if (!userId) {
            navigate('/auth/login');
        }
        try {
            if (hasFavorite) {
                axios.delete(`/products/favorites/${userId}/${productId}`)
                    .then((response) => {
                        console.log(response.data);
                        getFetchFavorites(); 
                    })
                    .catch((error) => {
                        console.log(error)
                    }
                    )
            } else {
                axios.post(`/products/favorites/${userId}/${productId}`, {
                    'userId': userId,
                    'productId': productId
                })
                    .then((response) => {
                        console.log(response.data);
                        getFetchFavorites(); 
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        } catch(error) {
            console.log(error);
        }
    })

    useEffect(() => {
        getFetchFavorites();
    }, [userId]);

    return {
        hasFavorite,
        toggleFavorite
    }
}

export default useFavorite;