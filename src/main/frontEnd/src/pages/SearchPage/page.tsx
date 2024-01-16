import { useNavigate } from "react-router-dom";
import Container from "../../components/utils/Container";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeProduct, setProduct } from "../../redux/slices/productSlice";
import { RootState } from "../../redux";
import { AiFillFire } from "react-icons/ai";
import ProductCard from "../../components/ProductCard";
import useSearchProduct from "../../utils/useSearchProduct";
import EmptyState from "../../components/utils/EmptyState";

const SearchPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const storedSearchProducts = useSelector((state: RootState) => state.product);

    let debouncedSearchProduct = useSearchProduct();
    
    const fetchSearchProduct = async () => {
        try {
            const response = await axios.get(`/products/search/${debouncedSearchProduct}`);
            if (typeof response.data !== 'string') {
                dispatch(setProduct(response.data))
            } else {
                dispatch(removeProduct())
            }
        }   catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        if (debouncedSearchProduct.length >= 1) {
            fetchSearchProduct();
        }   else {
            navigate('/');
        }
    }, [debouncedSearchProduct])
    
    if (storedSearchProducts.length > 0) {
        return (
            
            <Container>
                
                <div className='flex flex-col items-center justify-center mt-20 text-center'>
                    <div className="px-10">
                        {/* <p className="mb-10 text-5xl font-Cafe24Shiningstar">{title}</p> */}
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                        {storedSearchProducts.map(product => (
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
                        </div>
                    </div>
                </div>
            </Container>
        )
    } else {
        return (
            <EmptyState 
                title="찾으려고 하는 상품이 없습니다"
                subTitle="다른 키워드로 검색해주세요"
            />
        )
    }
    
    
}

export default SearchPage