import { useParams } from "react-router-dom"
import Container from "../../../../components/utils/Container";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductProps } from "../../../../types/ProductProps";
import ProductList from "./ProductList";

const CategoryProducts = () => {
    const params = useParams();
    const categoryName = params.path?.toUpperCase();

    const [categoryProduct, setCategoryProduct] = useState<ProductProps[]>([]);

    const fetchData = async () => {
        await axios.get(`/products/${categoryName?.toUpperCase()}`)
        .then(response => {
            console.log(response.data);
            setCategoryProduct(response.data);
            }
        )
        .catch(err => console.log(err)
        )
    };

    useEffect(() => {
        fetchData();
    }, []);
    
    return (
        <Container>
            {categoryProduct.length > 0 ? 
                <>
                    <div className='flex flex-col items-center justify-center mt-20 text-center'>
                        <p className="text-5xl font-Cafe24Shiningstar">{categoryName}</p>
                        <hr className="my-10 bg-gray-200" />
                        {categoryProduct.map((product, index) => (
                            <div key={index} className="w-full mb-5 border">
                                <ProductList
                                    index={index+1}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    image={product.image}
                                    info={product.info}
                                    weight={product.weight}
                                    weightUnit={product.weightUnit}
                                />
                            </div>
                        ))}
                    </div>
                </> : <>
                    <p>해당 카테고리에 해당하는 상품이 없습니다</p>
                </>
            }
        </Container>
    )
}

export default CategoryProducts