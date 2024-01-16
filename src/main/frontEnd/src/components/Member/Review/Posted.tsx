import { useNavigate } from "react-router-dom"
import { ReviewItemProps } from "../../../types/Review/ItemProps"
import ShowStars from "../../utils/ShowStars";
import { FaStar } from "react-icons/fa6";
import { useState } from "react";
import ModifyReview from "./ModifyReview";

interface PostedProps extends ReviewItemProps {
    deleteHandler: (reviewId: number) => Promise<void>;
    patchHandler: (reviewId: number, data: any) => Promise<void>;
}

const Posted = ({
    comment,
    reviewId,
    itemId,
    itemImage,
    itemName,
    reviewImage,
    reviewTime,
    starRating,
    deleteHandler,
    patchHandler
}: PostedProps ) => {
    const navigate = useNavigate();

    const [showModify, setShowModify] = useState(false);

    return (
        <div className="px-10 py-5 mb-10 border-4 rounded-md">
            {!showModify && <><div className="flex items-center justify-between">
                <span className="flex gap-6 text-start">
                    <img src={itemImage} alt={itemImage} className="object-cover w-24 h-28"/>
                    <div>
                        <p 
                            className="mt-4 font-bold hover:cursor-pointer"
                            onClick={() => navigate(`/products/${itemId}`)}
                        >
                            {itemName}
                        </p>
                        <p className="mt-10 font-semibold text-gray-400">{reviewTime.slice(0, 10)}</p>
                    </div>
                </span>
                <span className="flex items-center gap-4 ml-20 font-semibold">
                    <p 
                        className="cursor-pointer"
                        onClick={() => setShowModify(true)}
                    >
                        수정
                    </p>
                    <span className="h-10 border-l-2 bg-slate-400"/>
                    <p 
                        className="cursor-pointer"
                        onClick={() => deleteHandler(reviewId)}
                    >
                        삭제
                    </p>
                </span>
            </div>

            <hr className="my-10"/>
            <>
            <ShowStars 
                starNum={starRating}
                fillStar={FaStar}
            />
            <div className="my-10"/>

            <p>{comment}</p>

            {reviewImage &&
            <>
            <div className="my-10"/>

            <img src={reviewImage} alt={reviewImage} className="object-cover w-32 rounded-md h-36"/>
            </>}
            </></>}
            {showModify && 
                <ModifyReview 
                    productId={itemId}
                    reviewId={reviewId}
                    name={itemName}
                    img={itemImage}
                    setShowModify={setShowModify}
                    patchHandler={patchHandler}
                />
            }
        </div>
    )
}

export default Posted