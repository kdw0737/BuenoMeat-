import { toast } from "react-toastify";
import { OrderItemListProps } from '../../../types/Order/OrderItemListProps';

interface ThirdProps {
    point: number;
    productData: OrderItemListProps[];
}

const Third = ({
    point,
    productData,
}: ThirdProps) => {
    
    
    const pointHandler = (e: React.ChangeEvent<HTMLInputElement>) => {        
        if (Number(e.target.value) > point) {
            toast.error('보유한 포인트를 초과하였습니다!')
        }
    }

    const priceSum = productData.map((data) => data.totalPrice).reduce((a,b) => a + b);
    const pointSum = productData.map((product) => Number(product.itemUsePoint)).reduce((a, b) => a + b);

    const finalStoreSum = 
        productData.map((product) => product.totalPrice)
        .filter((p) => p > 5000)
        .reduce((a, b) => a + b, 0);

    const finalStore = (finalStoreSum) / 100;

    

    return (
        <div className="mt-10 border border-black">
            <div className="flex items-center px-3 py-2">
                <p className="w-24 font-bold">상품 금액</p>
                <p className="w-1/4 text-sm font-semibold">{priceSum} 원</p>
            </div>

            <hr />

            <div className="flex items-center px-3 py-2">
                <p className="w-24 font-bold">적립금 사용</p>
                <div className="relative">
                    <input 
                        className="w-40 px-8 py-1 text-right border"
                        type="number" 
                        value={pointSum}
                        onChange={pointHandler}
                    />
                    <label className="absolute top-[5px] right-2">원</label>
                </div>
                
                <div className="pl-4 text-sm font-light text-slate-400 whitespace-nowrap">
                    (사용 가능한 적립금
                    <span className="text-blue-400"> {point}</span>원)
                </div>
            </div>

            <hr />

            <div className="flex items-center px-3 py-2">
                <p className="w-24 font-bold">배송비</p>
                <p className="w-1/4 text-sm font-semibold text-blue-400">배송비 무료</p>
            </div>

            <hr />

            <div className="flex items-center px-3 py-2">
                <p className="w-32 font-bold">최종 결제 금액</p>
                <p>{priceSum - pointSum}원</p>
            </div>

            <hr />

            <div className="flex items-center px-3 py-2">
                <p className="w-32 font-bold">최종 적립금</p>
                <p>{finalStore}원</p>
            </div>
        </div>
    )
}

export default Third