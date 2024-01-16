import axios from 'axios';
import { QnaDataProps as AnswerDataProps } from '../../../types/QnaDataProps';
import { useState } from 'react';

interface QuestionListProps {
    id: number;
    img: string;
    itemName: string;
    date: string;
    status: string;
}

const QuestionList = ({
    id,
    img,
    itemName,
    date,
    status,
}: QuestionListProps) => {
    const [answerData, setAnswerData] = useState<AnswerDataProps>();

    console.log(answerData);
    

    const showAnswerHandler = async () => {
        await axios.get(`/qna/${id}`)
            .then(response => {
                setAnswerData(response.data);
            })
            .catch(err => {
                console.log(err);
                
            })
    }
    return (
        <div className=''>
            <hr className="mt-5"/>
            <div className='flex items-center gap-3'>
                <div 
                    className='flex items-center w-1/3 gap-3 px-2 py-3 border-r-2 cursor-pointer'
                    onClick={showAnswerHandler}
                >
                    <img src={img} alt={img} className="object-cover w-16 h-16 rounded-full"/>
                    <span>
                        <p className="font-bold">상품 문의</p>
                        <p>{itemName}</p>
                        <p className="text-sm font-semibold text-slate-300">{date.slice(0,10)}</p>
                    </span>
                    <span className={`px-2 py-1 ${status === "" ? 'bg-gray-200' : 'bg-blue-200'} rounded-md`}>
                        {status === "WAITING" ? 
                            <p className="text-sm font-bold">답변준비중</p>
                            :
                            <p className="text-sm font-bold">답변완료</p>
                        }
                    </span>
                </div>
                {answerData && 
                    <div className='flex flex-col items-start w-2/3 gap-2'>
                        <span className='flex items-center gap-2 px-10'>
                            <img src={answerData.image} alt={answerData.image} className="object-cover w-16 h-16 rounded-full"/>
                            <p className='font-bold'>{answerData.itemName}</p>
                        </span>
                        <hr />
                        <span className='flex flex-col gap-1'>
                            <p className='text-lg font-bold'>{answerData.title}</p>
                            <p>{answerData.comment}</p>
                            <p className='font-light'>{answerData.qtime.slice(0, 10)}</p>
                        </span>
                        <hr className='my-4'/>
                        <span className='flex flex-col gap-1'>
                            {answerData.qnaStatus === 'COMPLETE' ? 
                                <>
                                    <p className='text-3xl font-bold'>부에노미트</p>
                                    <p>{answerData.answer}</p>
                                    <p>{answerData.answerTime.slice(0, 10)}</p>

                                </> : 
                                <>
                                    <p>상담사가 문의답변을 준비중입니다...</p>
                                </>}
                        </span>
                    </div>
                }
            </div>
        </div>
    )
}

export default QuestionList