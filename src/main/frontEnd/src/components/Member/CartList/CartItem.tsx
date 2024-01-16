import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useOnClickOutside from "../../../utils/useOnClickOutSide";
import CountButton from "../../utils/CountButton";
import { toast } from "react-toastify";

interface CartItemProps {
    idx: number;
    memberId: number;
    id: number;
    img: string;
    name: string;
    option: string;
    count: number;
    resultPrice: number;
    stock: number;
    deleteHandler: (productId: number) => Promise<void>;
    patchHandler:  (id: number, newCount: number) => Promise<void>
}

const CartItem = ({
    idx,
    id,
    img,
    name,
    option,
    count,
    resultPrice,
    stock,
    deleteHandler,
    patchHandler
}: CartItemProps) => {
    const [showEdit, setShowEdit] = useState(false);
    const [newCount, setNewCount] = useState(count);

    const ref = useRef<HTMLDivElement>(null);

    useOnClickOutside(ref, () => {
        setShowEdit(false);
    })
    
    let showStock = '';
    showStock = (stock >= 5) ? '재고 5개 이상' : `재고 ${stock} 남음`;

    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/products/${id}`)
    }
    
    useEffect(() => {
        if (newCount > stock) {
            toast.error('현재 상품의 재고량을 초과하였습니다!');
            setNewCount(stock);
        }
    }, [newCount, stock])
    

    return (
        <>
        <tr>
            <td className="pl-2 text-center">{idx}</td>
            
            <td className="flex items-center justify-start gap-2 text-center hover:cursor-pointer" onClick={handleClick}>
                <span className="items-center">
                    <img src={img} alt={img} className="object-cover w-24 h-28"/>
                </span>
                <span className="text-start">
                    <p className="mb-2 font-bold">{name}</p>
                    <p className="text-xs font-light text-gray-400">옵션:{option}/{showStock}</p>
                </span>
            </td>
            <td className="text-center">{resultPrice}</td>
            <td className="text-center">{count}</td>
            <td className="text-center">{resultPrice} ({resultPrice/20}P)</td>
            <td className="text-center">
                <button className="mb-2 bg-blue-400" onClick={() => setShowEdit(true)}>수량변경</button>
                <button onClick={() => deleteHandler(id)}>삭제</button>
            </td>
        </tr>
        <hr className="w-screen my-5"/>
        {showEdit && 
            <div className='absolute z-30 w-full'> 
                <div className='fixed inset-0 flex justify-center bg-opacity-60 bg-slate-300'>
                    <div 
                        className='relative my-20 overflow-y-scroll duration-300 ease-in-out rounded-lg w-[400px] h-[300px] animate-fadeIn bg-rose-200'
                        ref={ref}
                    >
                        <div className="mx-10 mt-5">
                            <h1 className="text-lg font-bold text-left text-white">변경할 수량을 선택해주세요</h1>
                            <div className="flex flex-col items-center justify-center gap-3 mt-10">
                                <CountButton 
                                    count={newCount}
                                    setCount={setNewCount}
                                />
                                <p className="text-sm font-light">현재 {name} 재고량: {stock}</p>
                                <div className="flex items-center w-full gap-5 mt-12">
                                    <button onClick={() => setShowEdit(false)}>
                                        취소
                                    </button>
                                    <button 
                                        onClick={() => {
                                            patchHandler(id, newCount)
                                            setShowEdit(false);
                                        }}
                                        className="text-white bg-blue-400"
                                    >
                                        변경
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    )
}

export default CartItem