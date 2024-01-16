import { FaStar } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { ProductReviewProps } from "../../types/DetailProduct/ProductReviewProps"
import ShowStars from "../utils/ShowStars";
import ReviewList from "./ReviewList";

interface ReviewsProps {
    data: ProductReviewProps[];
    fetchData: () => Promise<void>;
}

const Reviews = ({
    data,
    fetchData,
}: ReviewsProps) => {
    console.log(data.length);
    
    let avgStar = 0;
    const starRatings = data?.map((data) => data.starRating);

    if (starRatings && starRatings.length > 0) {
        avgStar = Math.floor(starRatings.reduce((a, b) => a + b) / starRatings.length);
    } else {
        console.log("No star ratings available.");
    }
    if (data.length > 0) {
        return (
            <div>
                <hr className="my-5" />
                <p className="text-2xl font-bold">상품평</p>

                <div className="my-5"/>

                <ShowStars 
                    starNum={avgStar}
                    size={52}
                    fillStar={FaStar}
                />
                {data.map(d => (
                    <span 
                        className="flex items-center gap-2 mt-12"
                        key={d.id}
                    >
                        <img src={d.reviewImage} alt={d.reviewImage} className="object-cover h-32 rounded-md w-28"/>
                    </span>
                ))}

                <div className="my-5" />

                {data.map(d => (
                    <ReviewList 
                        key={d.id}
                        profileIcon={CgProfile}
                        reviewId={d.id}
                        userName={d.username}
                        starRating={d.starRating}
                        date={d.reviewTime}
                        comment={d.comment}
                        img={d.reviewImage}
                        recommend={d.recommend}
                        fetchData={fetchData}
                    />
                ))}
                

            </div>
        )
    } else {
        return (
            <div className="my-20 text-center">
                <p className="font-bold text-gray-300">아직 등록된 리뷰가 없습니다.</p>
            </div>
        )
    }
}

export default Reviews