import { useNavigate } from "react-router-dom"
import Container from "../../../components/utils/Container"
import { useLogout } from '../../../hooks/auth/useLogout';

const AdminMainPage = () => {
    const navigate = useNavigate();
    const { logout } = useLogout();

    return (
        <Container>
            <div>
                <p 
                    className='w-20 p-2 border-2 rounded-md cursor-pointer bg-slate-300'
                    onClick={logout}
                >
                    로그아웃
                </p>
            </div>
            <div className="grid grid-cols-2 mt-[25%] gap-10">
                <div 
                    className="flex items-center justify-center py-10 border rounded-md cursor-pointer hover:bg-black hover:text-white"
                    onClick={() => navigate('product')}
                >
                    <p className="text-4xl font-bold">상품관리</p>
                </div>

                <div 
                    className="flex items-center justify-center py-10 border rounded-md cursor-pointer hover:bg-black hover:text-white"
                    onClick={() => navigate('qna')}
                >
                    <p className="text-4xl font-bold">고객문의관리</p>
                </div>
            </div>
        </Container>
    )
}

export default AdminMainPage