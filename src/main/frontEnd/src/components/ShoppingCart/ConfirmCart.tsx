import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { Link } from "react-router-dom";

const ConfirmCart = () => {

    return (
        <div className="flex flex-col items-center justify-center w-full mt-10">
            <div className="relative border-2 rounded-full w-52 h-52">
                <MdOutlineShoppingCartCheckout 
                    size={45} 
                    className="absolute top-20 left-20"
                />
            </div>
            <div className="flex flex-col mt-10 text-sm font-semibold text-center">
                <p>선택하신 상품을 장바구니에 담았습니다.</p>
                <p>지금 장바구니를 확인하시겠습니까?</p>
            </div>
            <hr className="w-full h-1 my-10 bg-gray-200"/>
            <div className="flex items-center justify-center w-full">
                <Link to="/member/mypage/cart" className="w-1/2"><button className="bg-blue-300 border-slate-300">장바구니 이동</button></Link>
            </div>
        </div>
    )
}

export default ConfirmCart