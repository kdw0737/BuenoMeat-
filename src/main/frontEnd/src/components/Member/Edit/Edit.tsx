import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux";
import useGetFetchedData from "../../../hooks/useGetFetchedData";
import EditInput from "./EditInput";
import { setEditUser } from "../../../redux/slices/memberEditSlice";
import { useEffect } from "react";

const Edit = () => {
    const userId = useSelector((state: RootState) => state.currentUser.id);
    const editUserData = useSelector((state: RootState) => state.editUser);
    const dispatch = useDispatch();
    
    const { response } = useGetFetchedData({
        method: "get",
        url: `/mypage/${userId}`
    })
    
    useEffect(() => {
        dispatch(setEditUser({
            email: response?.data.email,
            pw: response?.data.pw,
            username: response?.data.username,
            phone: response?.data.phone,
            nickname: response?.data.nickname,
            address: response?.data.address,
            detailAddress: response?.data.detailAddress
        }));
        
    }, [response])
    

    return (
        <div className='mt-10 ml-52'>
            <h1 className="text-3xl font-bold">기본 회원정보 필수</h1>
            <hr className="h-1 my-5 bg-black" />
            
            <div className="flex items-center">
                <p className="w-1/4 font-semibold">이메일</p>
                <p className="w-2/3 font-bold -ml-9">{editUserData?.email}</p>
            </div>
            <hr className="my-5 h-0.5"/>
            <EditInput 
                label="비밀번호"
                inputValue={editUserData.pw}
            />
            <EditInput 
                label="이름(실명)"
                inputValue={editUserData?.username}
            />
            <EditInput 
                label="닉네임"
                inputValue={editUserData?.nickname}
            />
            <EditInput 
                label="휴대전화"
                inputValue={editUserData?.phone}
            />
            <EditInput 
                label="주소지"
                inputValue={`${editUserData?.address} ${editUserData?.detailAddress}`}
            />

            
            
        </div>
    )
}

export default Edit