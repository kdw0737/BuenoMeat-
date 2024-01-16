import { GoPlusCircle } from "react-icons/go";
import { BiEditAlt } from "react-icons/bi";

import { useNavigate } from "react-router-dom"
import Container from "../../../components/utils/Container"

const AdminProductPage = () => {
    const navigate = useNavigate();
    return (
        <Container>
            <div className="mt-[20%]">
                <div 
                    className="flex items-center justify-center gap-5 py-10 border rounded-md cursor-pointer hover:bg-black hover:text-white"
                    onClick={() => navigate('plus')}
                >
                    <GoPlusCircle size={32} />
                    <p className="text-4xl font-bold">상품등록</p>
                </div>

                <div 
                    className="flex items-center justify-center gap-5 py-10 mt-20 border rounded-md cursor-pointer hover:bg-black hover:text-white"
                    onClick={() => navigate('edit')}
                >
                    <BiEditAlt size={32} />
                    <p className="text-4xl font-bold">상품수정</p>
                </div>
            </div>
        </Container>
    )
}

export default AdminProductPage