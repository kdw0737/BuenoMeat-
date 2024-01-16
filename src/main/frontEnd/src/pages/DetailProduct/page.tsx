import { useNavigate, useParams } from 'react-router-dom'
import Container from '../../components/utils/Container'
import EmptyState from '../../components/utils/EmptyState';
import SubDiv from '../../components/utils/SubDiv';
import ProductWeightOption from '../../components/ProductWeightOption';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ProductProps } from '../../types/ProductProps';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux';
import { removeCartData } from '../../redux/slices/cartSlice';
import { ProductReviewProps } from '../../types/DetailProduct/ProductReviewProps';
import Reviews from '../../components/DetailProduct/Reviews';
import Qna from '../../components/DetailProduct/Qna';

const ProductDetailPage = () => {
    const [detailProductData, setDetailProductData] = useState<ProductProps>();
    const [productReviewData, setProductReviewData] = useState<ProductReviewProps[]>([]);
    const [disabled, setDisabled] = useState(true);

    const memberId = useSelector((state: RootState) => state.currentUser.id);
    const cartData = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch();

    
    const params = useParams();
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            const response = await axios.get(`/products/${params.productId}/detail`);
            console.log(response.data);
            
            setDetailProductData(response.data.itemDetailInfo);
            setProductReviewData(response.data.itemReviewInfos);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchData();
    }, [])

    const { itemCount, totalPrice, itemOption } = cartData;

    const putCartHandler = async () => {
        if (disabled) {
            toast.warn("옵션을 선택해주세요")
        } else {
            try {
                const response = await axios.post(`/products/putCart/${memberId}/${params.productId}`,{
                    memberId,
                    itemId: params.productId,
                    itemCount,
                    totalPrice,
                    itemOption
                });
                toast.success('해당 상품이 장바구니에 담겼습니다!')
                console.log(response.data);
                dispatch(removeCartData());
                navigate('/member/mypage/cart');
            }   catch (error) {
                toast.error(String("이미 장바구니에 있는 상품입니다."));
            }
        }
    }

    if (detailProductData) {
        let { name, info, price, weight, weightUnit, image } = detailProductData;
        
        return (
            <Container>
                <div className='grid grid-cols-1 gap-5 px-10 my-40 sm:grid-cols-2'>
                    <img src={image} alt='product-img' className='w-[480px] h-[580px]' />
                    <div>
                        <hr className='w-full h-1 mb-10 bg-black' />
                        <section className='flex flex-col items-start justify-center gap-5'>
                            <p className='text-3xl font-Cafe24Shiningstar'>{name}</p>
                            <hr/>
                            <p className='font-semibold text-gray-500'>{info}</p>
                            <hr />
                            <SubDiv 
                                firstTitle="PRICE"
                                subTitle={price}
                            />
                            <SubDiv 
                                firstTitle='Point'
                                subTitle='1%'
                            />
                            <hr />
                            
                            <ProductWeightOption 
                                price={price}
                                weight={weight}
                                weightUnit={weightUnit}
                                setDisabled={setDisabled}
                            />
                            
                            <span className='grid w-full grid-cols-2 gap-3'>
                                <button 
                                    className='bg-blue-500'
                                    onClick={putCartHandler}
                                >바로구매</button>
                                <button onClick={putCartHandler}>장바구니</button>
                                
                            </span>
                        </section>
                    </div>
                </div>

                <Qna productId={params.productId}/>
    
                <div className="px-10">
                    <table className="w-full border rounded-[20px] overflow-hidden">
                        <thead>
                            <tr className="bg-[rgba(0,0,0,0.1)] font-bold">
                                <th
                                    className="bg-amber-300"
                                >
                                    구매 후기
                                </th>
                            </tr>
                        </thead>
                    </table>
                        <Reviews
                            data={productReviewData || []}
                            fetchData={fetchData}
                        /> 
                </div>
        </Container>
        )
    } else {
        return (
            <EmptyState 
                title="MEAT NOT FOUND"
                subTitle="해당 관련된 상품이 없습니다."
            />
        )
    }

    
    
}

export default ProductDetailPage