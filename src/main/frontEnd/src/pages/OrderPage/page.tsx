import { useEffect, useState } from "react";
import First from "../../components/Member/Order/First";
import SecondCard from "../../components/Member/Order/Second";
import Third from "../../components/Member/Order/Third";
import Container from "../../components/utils/Container"
import { useSelector } from "react-redux";
import { RootState } from "../../redux";
import { OrderMemberInfoProps } from "../../types/Order/OrderMemberInfoProps";
import { OrderItemListProps } from "../../types/Order/OrderItemListProps";
import EmptyState from "../../components/utils/EmptyState";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import Contents from '../../components/Member/Order/Contents';



const OrderPage = () => {
    const navigate = useNavigate();

    const memberId = useSelector((state: RootState) => state.currentUser.id);
    const orderNum = uuidv4();

    const [userData, setUserData] = useState<OrderMemberInfoProps>();
    const [productData, setProductData] = useState<OrderItemListProps[]>([]);

    const [memo, setMemo] = useState('');   // memo
    const [memberEmail, setMemberEmail] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.get(`/order/${memberId}`);
            setUserData(response.data.orderMemberInfo);

            const plusProductList = response.data.orderItemList.map((item:OrderItemListProps[]) => {
                return { ...item, itemUsePoint: '0' }
            });

            setProductData(plusProductList);
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        fetchData();
    }, [])

    
    if (userData && productData) {
        const postHandler = async () => {
            const itemAndPoint: Map<number, number> = new Map();
            productData.forEach(item => {
                const { itemId, itemUsePoint } = item;
                itemAndPoint.set(itemId, Number(itemUsePoint));
            });
        
                const data = {
                    "memo": memo,
                    itemAndPoint: Object.fromEntries(itemAndPoint),
                    "address": userData.address,
                    "detailAddress": userData.detailAddress,
                    "recipient": userData.name,
                    "email": memberEmail,
                    "phone": userData.phone,
                    "totalPrice": productData.map((data) => data.totalPrice - Number(data.itemUsePoint)).reduce((a,b) => a + b),
                    "orderNum": orderNum.slice(0,10)
                };

            console.log(data);
            await axios.post(`/order/${memberId}`,data)
                .then(response => {
                    console.log(response.data);
                    toast.success("주문이 완료되었습니다!");
                    navigate('/');
                })
                .catch(error => {
                    console.log(error);
                })
        }
        
        return (
            <Container>
                <div className="px-10 py-5">
                    <p className="text-7xl font-Cafe24Shiningstar">Order</p>
                    <hr className="my-10"/>

                    <p className="text-2xl font-bold">배송 정보</p>

                    <First 
                        name={userData.name}
                        phone={userData.phone}
                        address={userData.address}
                        detailAddress={userData.detailAddress}
                        memo={memo}
                        setMemo={setMemo}
                        email={memberEmail}
                        setEmail={setMemberEmail}
                        updateZipcode={fetchData}
                    />
                    
                    <div className="mb-16" />

                    <p className="text-2xl font-bold">상품 정보</p>

                    <div className="mb-10" />

                    <Contents 
                        productData={productData}
                        userData={userData}
                        postHandler={postHandler}
                    />
                </div>
            </Container>
        )
    } else {
        return (
            <EmptyState 
                title="ORDER NOT FOUND"
                subTitle="해당 관련된 주문이 없습니다."
            />
        )
    }
}

export default OrderPage