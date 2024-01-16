import { useEffect, useState } from "react"
import QuestionList from "./QuestionList"
import axios from 'axios'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux'
import { QnaDataProps } from '../../../types/DetailProduct/QnaDataProps'

const Qna = () => {
    const memberId = useSelector((state: RootState) => state.currentUser.id);
    const [qnaData, setQnaData] = useState<QnaDataProps[]>([]);
    

    const fetchData = async () => {
        await axios.get(`/qna/member/${memberId}`)
            .then((response) => {
                console.log(response.data);
                setQnaData(response.data.qnaInfos);
            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="my-10 ml-52">
            <p className="text-5xl font-bold text-start">문의내역 확인</p>
            <hr className="h-1 my-5 bg-black" />
            
            <div className="p-2">
                <div className="border-r-2">
                    <p className='pt-2 pl-40 font-bold text-blue-500 cursor-pointer text-start'>편집</p>
                    {qnaData.length > 0 ? 
                        <>
                            {qnaData.map((data, index) => (
                                <QuestionList 
                                    key={index}
                                    id={data.id}
                                    img={data.image}
                                    itemName={data.itemName}
                                    date={data.qnaTime}
                                    status={data.qnaStatus}
                                />
                            ))}
                        </>
                        :
                        <div>
                            <p className="text-lg text-center text-gray-400 mt-28">최근 문의내역이 없습니다.</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Qna