import { useSelector } from "react-redux";
import { CartButtonProps } from "./CartButton";
import { RootState } from "../../redux";
import CartContents from "./CartContents";
import { ProductProps } from "../../types/ProductProps";
import { useRef } from "react";
import useOnClickOutside from "../../utils/useOnClickOutSide";

interface Props extends CartButtonProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}


const CartModal = ({ setShowModal, productId }: Props) => {
    const products = useSelector((state: RootState) => state.product);
    const currentProductData: ProductProps = products.find((product) => product.id === productId)!;

    const ref = useRef<HTMLDivElement>(null);

    useOnClickOutside(ref, () => {
        setShowModal(false);
    })
    
    return (
        <div className='absolute z-30 w-full'> 
            <div className='fixed inset-0 flex justify-center'>
                <div 
                    className='relative my-20 overflow-y-scroll duration-300 ease-in-out rounded-lg w-[580px] h-[550px] animate-fadeIn bg-slate-300'
                    ref={ref}
                >
                    <span
                        className='absolute right-[20px] top-[20px] cursor-pointer'
                        onClick={() => {
                            setTimeout(() => {
                                setShowModal(false);
                            }, 300)}
                        }
                    >
                        X
                    </span>
                    <div className="mx-10 mt-5">
                        <p className="text-4xl font-Cafe24Shiningstar">Shopping cart</p>
                        <CartContents 
                            id={productId}
                            name={currentProductData.name}
                            price={currentProductData.price}
                            weight={currentProductData.weight}
                            weightUnit={currentProductData.weightUnit}
                            
                        />
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartModal;