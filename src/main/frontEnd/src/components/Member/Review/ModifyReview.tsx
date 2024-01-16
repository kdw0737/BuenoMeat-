import { FaStar } from "react-icons/fa6"
import SelectedStars from "../../utils/SelectedStars"
import UploadInput from "../../utils/Upload/UploadInput"
import PreviewUpload from "../../utils/Upload/PreviewUpload"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

interface ModifyReviewProps {
    productId: number;
    reviewId: number;
    name: string;
    img: string;
    setShowModify: React.Dispatch<React.SetStateAction<boolean>>;
    patchHandler: (reviewId: number, data: any) => Promise<void>;
}

interface PatchDataProps {
    reviewId: number;
    starNum: number;
    enteredText: string;
    uploadedFileUrl: string | null;
}

const ModifyReview = ({
    productId,
    reviewId,
    name,
    img,
    setShowModify,
    patchHandler
}: ModifyReviewProps) => {
    const [starNum, setStarNum] = useState(5);
    const [enteredText, setEnteredText] = useState('');
    const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleFileUrlChange = (url: string) => {
        const modifiedUrl = url.split('.jpg')[0] + '.jpg';
        setUploadedFileUrl(modifiedUrl);
    }

    const modifyHandler = ({
        reviewId, starNum, enteredText, uploadedFileUrl
    }: PatchDataProps) => {
        const data = {
            "starRating": starNum,
            "comment": enteredText,
            "reviewImage": uploadedFileUrl,
        }
        
        patchHandler(reviewId, data);
        setShowModify(false);
    }

    return (
        <div className="w-full px-10 py-5 mt-5 border-2 rounded-md">
            <div>
                <p className="text-3xl font-bold">리뷰 수정하기</p>
                <hr className="my-5"/>
            </div>

            <div className="flex items-center justify-between pr-20 mt-10">
                <div className="flex items-center justify-center">
                    <span 
                        className="hover:cursor-pointer" 
                        onClick={() => navigate(`/products/${productId}`)}
                    >
                        <img src={img} alt={img} className="object-cover h-32 w-28"/>
                    </span>
                    <span className="flex flex-col ml-6 text-start">
                        <p className="mb-2 text-2xl font-bold">{name}</p>
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
                <p className="absolute bottom-0 right-2">{enteredText.length}</p>
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

            <div className="flex gap-3 px-20">
                <button 
                    className="text-white bg-blue-400"
                    onClick={() => modifyHandler({reviewId, starNum, enteredText, uploadedFileUrl})}
                >
                    완료
                </button>
                <button onClick={() => setShowModify(false)}>취소</button>
            </div>
            
            <hr className="my-10"/>
        </div>
    )
}

export default ModifyReview