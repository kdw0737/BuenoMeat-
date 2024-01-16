import { FaStar } from "react-icons/fa6";

import SelectedStars from "../../utils/SelectedStars"
import { useState } from "react";
import UploadInput from "../../utils/Upload/UploadInput";
import PreviewUpload from "../../utils/Upload/PreviewUpload";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { toast } from "react-toastify";

interface PostingProps {
    id: number;
    img: string;
    name: string;
    option?: string;
    date?: string;
    setShowReviewForm: React.Dispatch<React.SetStateAction<boolean>>;
    fetchData: () => Promise<void>;
}

const Posting = ({
    id,
    img,
    name,
    option,
    date,
    setShowReviewForm,
    fetchData,
}: PostingProps) => {
    const memberId = useSelector((state: RootState) => state.currentUser.id);

    const [starNum, setStarNum] = useState(5);
    const [enteredText, setEnteredText] = useState('');
    const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleFileUrlChange = (url: string) => {
        const modifiedUrl = url.split('.jpg')[0] + '.jpg';
        setUploadedFileUrl(modifiedUrl);
    }

    const postHandler = async () => {

        const data = {
            "starRating": starNum,
            "comment": enteredText,
            "reviewImage": uploadedFileUrl
        }

        console.log(data);
        await axios.post(`/review/${memberId}/${id}`, data)
            .then(response => {
                
                toast.success("리뷰 등록이 완료되었습니다!");
                setShowReviewForm(false);
                fetchData();
            })
            .catch(error => {
                console.log(error);
            })
    }
    
    return (
        <div className="w-screen px-10 py-5 mt-5 border-2 rounded-md">
            <div>
                <p className="text-3xl font-bold">리뷰 남기기</p>
                <hr className="my-5"/>
            </div>

            <div className="flex items-center justify-between pr-20 mt-10">
                <div className="flex items-center justify-center">
                    <span 
                        className="hover:cursor-pointer" 
                        onClick={() => navigate(`/products/${id}`)}
                    >
                        <img src={img} alt={img} className="object-cover h-32 w-28"/>
                    </span>
                    <span className="flex flex-col ml-6 text-start">
                        <p className="mb-2 text-2xl font-bold">{name}</p>
                        {option && <p className="mb-10 text-sm font-semibold">{option}</p>}
                        {date && <p className="font-light text-gray-400 text-small">{date} 구매함</p>}
                    </span>
                </div>
            </div>
            <hr className="my-10"/>

            <div className="flex items-center">
                <p className="w-1/6 text-lg font-bold">별점</p>
                <SelectedStars
                    fillStar={FaStar}
                    setStarNum={setStarNum}
                />
            </div>

            <hr className="my-10"/>

            <div className="relative flex items-start w-2/3">
                <p className="w-1/6 text-lg font-bold">구매후기</p>
                <textarea 
                    style={{ resize: "none" }}
                    className="h-40 p-2 ml-16 border-2 w-[400px]" 
                    placeholder="다른 고객님에게 도움이 될 수 있도록 상품에 대한 평가를 솔직하게 남겨주세요"
                    value={enteredText}
                    onChange={(e) => setEnteredText(e.target.value)}
                />
                <p className="absolute bottom-0 right-[160px]">{enteredText.length}</p>
            </div>

            <hr className="my-10"/>
            
            <div className="flex items-center">
                <p className="w-1/6 text-lg font-bold">사진첨부</p>
                <div className="flex flex-col gap-10">
                    <UploadInput onFileUrlChange={handleFileUrlChange} />
                    <PreviewUpload fileUrl={uploadedFileUrl} />
                </div>
            </div>

            <hr className="my-10"/>

            <div className="flex gap-3 pr-80">
                <button 
                    className="text-white bg-blue-400"
                    onClick={() => postHandler()}
                >
                    완료
                </button>
                <button onClick={() => setShowReviewForm(false)}>취소</button>
            </div>
            
            <hr className="my-10"/>
        </div>
    )
}

export default Posting