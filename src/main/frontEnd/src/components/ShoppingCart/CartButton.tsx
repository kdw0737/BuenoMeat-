import React, { useState } from 'react'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import CartModal from './CartModal';

export interface CartButtonProps {
    productId?: number
}

const CartButton:React.FC<CartButtonProps> = ({ productId }) => {
    
    const [showModal, setShowModal] = useState(false);

    return (
        <div 
            className='z-10 flex items-center justify-center w-16 h-16 transition border-2 border-black rounded-full cursor-pointer hover:bg-black'
            onClick={() => setShowModal(true)}
        >
            <AiOutlineShoppingCart 
                size={40}
                className='hover:text-white'
            />
            {showModal && 
                <CartModal 
                    setShowModal={setShowModal} 
                    productId={productId}
                />
            }
        </div>
    )
}

export default CartButton