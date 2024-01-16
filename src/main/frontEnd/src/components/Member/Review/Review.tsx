import { useEffect, useState } from "react"
import ReviewProfile from "./ReviewProfile"
import axios from "axios"
import { useSelector } from "react-redux"
import { RootState } from "../../../redux"
import { ReviewItemProps } from "../../../types/Review/ItemProps"
import { ReviewUserProps } from "../../../types/Review/UserProps"
import Posted from "./Posted"
import { toast } from "react-toastify"

export interface PatchDataProps {
    starRating: number;
    comment: string;
    reviewImage: string | null;
}

const Review = () => {
    const memberId = useSelector((state: RootState) => state.currentUser.id);

    const [productData, setProductData] = useState<ReviewItemProps[]>([]);
    const [userData, setUserData] = useState<ReviewUserProps>();

    const fetchData = async () => {
        await axios.get(`/review/${memberId}`)
            .then((response) => {
                setProductData(response.data.itemInfos);
                setUserData(response.data.reviewUserInfo);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const patchHandler = async (reviewId: number, data: PatchDataProps) => {
        console.log(data);
        
        await axios.patch(`/review/${reviewId}`, data)
            .then(response => {
                toast.success("리뷰 수정이 완료되었습니다!");
                fetchData();
            })
            .catch(error => {
                console.log(error);
            })
    }

    const deleteHandler = async (reviewId: number) => {
        await axios.delete(`/review/${reviewId}`)
            .then(response => {
                toast.success("해당 리뷰글이 삭제되었습니다!");
                fetchData();
            })
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className='my-10 ml-52'>
            <p className="text-5xl font-bold text-start">리뷰관리</p>
            {userData && productData && <>
            <ReviewProfile 
                nickname={userData.username}
                recommendNum={userData.recommend}
            />
            <div className="mt-10"/>
            
            <p className="text-3xl font-bold">작성한 리뷰 {productData.length}</p>
            
            <hr className="my-10 bg-black"/>
            {productData?.map((product, index) => (
                <Posted 
                    key={index}
                    comment={product.comment}
                    reviewId={product.reviewId}
                    itemId={product.itemId}
                    itemImage={product.itemImage}
                    itemName={product.itemName}
                    reviewImage={product.reviewImage}
                    reviewTime={product.reviewTime}
                    starRating={product.starRating}
                    deleteHandler={deleteHandler}
                    patchHandler={patchHandler}
                />
            ))}
            </>}
        </div>
    )
}

export default Review