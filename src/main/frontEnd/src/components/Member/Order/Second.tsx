// import { useEffect } from "react";
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface SecondProps {
    itemId: number;
    image: string;
    itemName: string;
    totalPrice: number;
    itemCount: number;
    itemOption: string;
    stock: number;
    maxPoint: number;
    itemUsePoint: string;
    setItemUsePoint: (usePoint: any) => string;
}

const SecondCard = ({
    itemId,
    image,
    itemName,
    totalPrice,
    itemCount,
    itemOption,
    stock,
    maxPoint,
    itemUsePoint,
    setItemUsePoint,
}: SecondProps) => {
    const [realUsePoint, setRealUsePoint] = useState(itemUsePoint);
    const navigate = useNavigate();

    let showStock = '';
    showStock = (stock >= 5) ? '재고 5개 이상' : `재고 ${stock} 남음`;

    const pointHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setRealUsePoint(e.target.value);
        
        if (realUsePoint === '0') {
            setItemUsePoint(e.target.value.replace(/(^0+)/, ""));
            console.log("눈치가 빠른 꼬맹이구나");
            
        } else {
            if (Number(e.target.value) > maxPoint) {
                toast.error('보유한 포인트를 초과하였습니다!')
                setItemUsePoint(String(maxPoint));
            } else {
                setItemUsePoint(e.target.value);
            }
        }
    }

    return (
        <tr>
            <td className="grid grid-flow-col grid-rows-3 pl-4">
                <span 
                    className="flex items-center justify-center row-span-3 hover:cursor-pointer"
                    onClick={() => navigate(`/products/${itemId}`)}
                >
                    <img src={image} alt={image} className="object-cover w-20 h-24 rounded-md"/>
                </span>
                <span className="flex-row col-span-2">
                    <p className="mb-2 font-bold">{itemName}</p>
                    <p className="text-xs font-light text-gray-400">옵션:{itemOption}/{showStock}</p>
                </span>

                <div className="flex items-center py-2">
                    <p className="w-24 font-bold">적립금 사용</p>
                    <div className="relative col-span-2 row-span-2">
                        <input 
                            className="w-40 px-8 py-1 text-right border"
                            type="number" 
                            value={realUsePoint}
                            onChange={pointHandler} // 실제로 넘어가는 데이터 관련해서는 onChange만 작동 안하게 하면된다
                        />
                        <label className="absolute top-[5px] right-2">원</label>
                    </div>
                
                    <div className="pl-4 text-sm font-light text-slate-400 whitespace-nowrap">
                        사용 가능한 적립금(
                        <span className="text-blue-400">{maxPoint}</span>원)
                    </div>
                </div>
                <p className='font-light text-rose-200'>구매하시려는 상품이 5000원부터 적립 가능합니다</p>
            </td>
            <td className="text-center">{itemCount}</td>
            {/* <td className="text-center">{(totalPrice/100)}</td> */}
            <td className='text-center'>{totalPrice > 5000 ? totalPrice/100 : 0}</td>
            <td className="text-center">{totalPrice}</td>
        </tr>
    )
}

export default SecondCard