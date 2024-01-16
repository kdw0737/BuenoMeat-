import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";


interface CountButtonProps {
    count: number;
    setCount: React.Dispatch<React.SetStateAction<number>>
}

const CountButton = ({
    count,
    setCount
}: CountButtonProps) => {

    if (count < 1) {
        alert("Purchase must be at least 1 item")
    }

    return (
        <div className="relative">
            <input 
                className="w-32 pl-2 rounded-md outline"
                value={count}
                min='1'
                readOnly
            />
            <span className="absolute top-0 right-0">
                <IoMdArrowDropup
                    size={20}
                    className="w-6 h-3 border" 
                    onClick={() => {
                        setCount(count+1);
                    }
                        
                    }
                />
                <IoMdArrowDropdown
                    size={20}
                    className="w-6 h-3 border" 
                    onClick={() => {
                        setCount(count-1);
                    }}
                />
            </span>
        </div>
    )
}

export default CountButton