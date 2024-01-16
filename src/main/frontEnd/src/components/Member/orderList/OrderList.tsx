import axios from "axios"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux"
import { useEffect, useState } from "react";
import { OrderListProps } from "../../../types/OrderListProps";
import OrderItem from "./OrderItem";
import { toast } from "react-toastify";

const OrderList = () => {
    const memberId = useSelector((state: RootState) => state.currentUser.id);
    const [orderListData, setOrderListData] = useState<OrderListProps[]>([]);

    const fetchData = async () => {
        await axios.get(`/mypage/order/${memberId}`)
            .then((response) => {
                setOrderListData(response?.data);
                console.log(response.data);
                
            })
            .catch(error => {
                console.log(error);
            })
    }

    const deleteHandler = async (orderNum?: string, productId?: number) => {
        await axios.delete(`/order/${memberId}/${orderNum}/${productId}`)
            .then((response) => {
                console.log(response.data);
                toast.success('결제가 취소되었습니다.')
                fetchData();
            })
            .catch(error => {
                console.log(error)
            }
        )
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="my-10 ml-52">
            <p className="text-5xl font-bold text-start">주문내역 조회</p>
            <hr className="h-1 my-5 bg-black" />
            {orderListData.length > 0 && 
                <table className="table-fixed w-full border-separate rounded-[20px] overflow-hidden">
                <thead>
                    <tr className="bg-[rgba(0,0,0,0.1)]">
                        <th
                            scope="col"
                            className="hover:bg-[rgba(0,0,0,0.2)] w-1/5"
                        >
                            상품정보
                        </th>

                        <th
                            scope="col"
                            className="hover:bg-[rgba(0,0,0,0.2)]"
                        >
                            주문일자
                        </th>
                        <th
                            scope="col"
                            className="hover:bg-[rgba(0,0,0,0.2)]"
                        >
                            주문번호
                        </th>
                        <th
                            scope="col"
                            className="hover:bg-[rgba(0,0,0,0.2)]"
                        >
                            주문금액(수량)
                        </th>
                        
                        <th
                            scope="col"
                            className="hover:bg-[rgba(0,0,0,0.2)]"
                        >
                            주문상태
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {orderListData.map((data, index) => (
                        <OrderItem 
                            key={index}
                            id={data.itemId}
                            image={data.image}
                            name={data.itemName}
                            option={data.itemOption}
                            date={data.orderDate}
                            orderNum={data.orderNum}
                            price={data.totalPrice}
                            count={data.itemCount}
                            status={data.orderItemStatus}
                            deleteHandler={deleteHandler}
                            fetchData={fetchData}
                        />
                    ))}
                </tbody>
            </table>
}   
        <div>
            <p className="text-lg text-center text-gray-400 mt-28">구매하신 상품이 없습니다.</p>
        </div>
    </div>
    )
}

export default OrderList

