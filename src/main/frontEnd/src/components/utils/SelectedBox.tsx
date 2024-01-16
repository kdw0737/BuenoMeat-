interface SelectedBoxProps {
    price: number;
    weightCount: number;
    weightUnit: string;
    selectedPlusPrice: string;
    handleSelect: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectedBox = ({
    price,
    weightCount,
    weightUnit,
    selectedPlusPrice,
    handleSelect
}: SelectedBoxProps) => {
    
    const selectedOptions = [
        {
            id: 1,
            value: weightCount + weightUnit + `(+${price*0}원)`
        },
        {
            id: 2,
            value: weightCount*1.2 + weightUnit + `(+${price*0.2}원)`
        },
        {
            id: 3,
            value: weightCount*1.5 + weightUnit + `(+${price*0.5}원)`
        },
        {
            id: 4,
            value: weightCount*1.8 + weightUnit + `(+${price*0.8}원)`
        }
    ]
    
    return (
        <select 
            className='px-4 py-2 ml-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 '
            value={selectedPlusPrice} 
            onChange={handleSelect}
        >
            <option value="-1">-[필수] 옵션을 선택해주세요</option>
            <option disabled>-----------------------</option>
            {selectedOptions.map((item) => (
                <option key={item.id} value={item.value}>
                    {item.value}
                </option>
            ))}
        </select>
                                
    )
}

export default SelectedBox