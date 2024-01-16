import { IoIosArrowForward } from "react-icons/io"
import SelectedBox from "./utils/SelectedBox"
import useExtractedNumber from "../utils/useExtractedNumber";
import { useEffect, useState } from "react";
import ProductLabel from "./ProductLabel";
import CountButton from "./utils/CountButton";
import { useDispatch } from "react-redux";
import { setCartData } from "../redux/slices/cartSlice";

interface ProductWeightOptionProps {
    price: number;
    weight?: number;
    weightUnit?: string;
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductWeightOption = ({
    price, 
    weight,
    weightUnit,
    setDisabled,
}: ProductWeightOptionProps) => {
    const [showTable, setShowTable] = useState(false);
    const [selectedPlusPrice, setSelectedPlusPrice] = useState('');
    const [count, setCount] = useState(1);
    
    const dispatch = useDispatch();

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!e.target.value) {
            setDisabled(true);
        }
        setDisabled(false);
        setSelectedPlusPrice(e.target.value);
        setShowTable(true);
        dispatch(setCartData({
            itemCount: count,
            totalPrice: resultPrice,
            itemOption: selectedPlusPrice
        }))
    }

    useEffect(() => {
        dispatch(setCartData({
            itemCount: count,
            totalPrice: resultPrice,
            itemOption: selectedPlusPrice
        }))
    }, [count, selectedPlusPrice])

    let extractedPrice = 0;
    extractedPrice = useExtractedNumber(selectedPlusPrice);

    let resultPrice = extractedPrice === 0 ? price*count : (extractedPrice + price)*count;
    
    return (
        <>
            <span className='flex items-center justify-center my-5'>
                <IoIosArrowForward />
                <p>중량 선택</p>
                <SelectedBox 
                    price={price}
                    weightCount={weight || 0} 
                    weightUnit={weightUnit || ''}
                    selectedPlusPrice={selectedPlusPrice}
                    handleSelect={handleSelect}
                />
            </span>
            <hr />
            <p className='my-4 text-sm font-semibold text-gray-500'>최소주문수량 1개 이상</p>
            {showTable && <table className='w-full border-2 border-b-0 border-collapse border-black rounded-md'>
                <thead>
                    <tr>
                        <td>상품명</td>
                        <td>상품수</td>
                        <td>가격</td>
                    </tr>
                </thead>
                <tbody className='border-transparent border-none'>
                    <tr>
                        <td>
                            <ProductLabel
                                selectedOption={selectedPlusPrice}
                            />
                        </td>
                        <td>
                            <CountButton
                                count={count}
                                setCount={setCount}
                            />
                        </td>
                        <td className='flex items-center gap-2 text-xl font-Cafe24Shiningstar'>
                            <p>{resultPrice}원</p>
                            <p>({resultPrice/100} Point)</p>
                        </td>
                    </tr>
                </tbody>
            </table>}
            <hr />
            {showTable && <>
                <span className='flex items-center justify-end w-full'>TOTAL: 
                    <p className='pl-2 text-lg font-bold'>{resultPrice}</p>
                    원 ({count}개)
                </span>
                <hr />
            </>}
                            
        </>
    )
}

export default ProductWeightOption