import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Posting from "../Review/Posting";

interface OrderItemProps {
    id: number;
    image: string;
    name: string;
    option: string;
    date: string;
    orderNum: string;
    price: number;
    count: number;
    status: string;
    deleteHandler:  (orderNum?: string, productId?: number) => Promise<void>;
    fetchData:  () => Promise<void>;
}

const OrderItem = ({
    id,
    image,
    name, 
    option,
    date,
    orderNum,
    price,
    count,
    status,
    deleteHandler,
    fetchData,
}: OrderItemProps) => {
    // 리뷰 쓰기 가능한 아이템들에 대한 (status === RELEASE) 리뷰 폼 보여주기 boolean
    const [showReviewForm, setShowReviewForm] = useState(false);

    const navigate = useNavigate();

    return (
        <>
        {!showReviewForm?
            <tr>
                <td className="flex items-center justify-start gap-2 text-center hover:cursor-pointer" onClick={() => navigate(`/products/${id}`)}>
                    <span className="items-center">
                        <img src={image} alt={image} className="object-cover w-24 h-28"/>
                    </span>
                    <span className="text-start">
                        <p className="mb-2 font-bold">{name}</p>
                        <p className="text-xs font-light text-gray-400">옵션: {option}</p>
                    </span>
                </td>
                <td className="text-sm text-center">{date.slice(0,10)}</td>
                <td className="text-sm text-center">{orderNum}</td>
                <td className="text-center">
                    <p>{price}원</p>
                    <p className="text-sm text-slate-500">{count}개</p>
                </td>
                <td className="text-center">
                    <p className={`
                            py-3 
                            ${status === "RELEASE" || "REV_COMP" ? 'bg-green-400' : 'bg-rose-400'}
                            rounded-md 
                            font-semibold
                        `}
                    >
                        {(status === "RELEASE" || "REV_COMP") ? "구매 완료" : "결제 취소"}
                    </p>
                    <button className={`
                        ${status === "RELEASE" ? 'block' : 'hidden'}
                        ${status === "RELEASE" ? 'mt-2' : 'mt-0'}
                        `}
                        onClick={() => deleteHandler(orderNum, id)}
                    >
                        주문 취소
                    </button>
                    <button
                        className={`
                            bg-amber-400
                            ${status === "RELEASE" ? 'block' : 'hidden'}
                            ${status === "RELEASE" ? 'mt-2' : 'mt-0'}
                            `}
                        onClick={() => setShowReviewForm(true)}
                    >
                        리뷰 작성하기
                    </button>
                </td>
            </tr>
            : <>
                <Posting 
                    id={id}
                    img={image}
                    name={name}
                    option={option}
                    date={date.slice(0,10)}
                    setShowReviewForm={setShowReviewForm}
                    fetchData={fetchData}
                />
                </>}
            <hr className="w-screen"/>
        </>
    )
}

export default OrderItem