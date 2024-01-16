import ProductCard from "./ProductCard";

import { AiFillFire } from "react-icons/ai";
import { useCallback, useEffect } from "react";
import axios from "axios";
import { setProduct } from '../redux/slices/productSlice';
import { RootState } from '../redux';
import { useDispatch, useSelector } from 'react-redux';

interface RowProps {
    title: string;
    fetchUrl: string;
}

const Row = ({
    title,
    fetchUrl
}: RowProps) => {
    const productData = useSelector((state: RootState) => state.product);
    const dispatch = useDispatch();

    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get(fetchUrl);
            console.log(response.data);
            dispatch(setProduct(response?.data));
        } catch (error) {
            console.log(error);
        }
    }, [fetchUrl]);
    

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="px-10">
            <p className="mb-10 text-5xl font-Cafe24Shiningstar">{title}</p>
            {productData.length > 0 ?
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                {productData.map(product => (
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
            </div> : <div>찾으시려는 상품이 없습니다.
                </div>}
        </div>
    )

}

export default Row