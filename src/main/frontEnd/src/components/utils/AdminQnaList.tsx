import Modal from "react-modal";

import { useEffect, useState } from "react";
import { FcAnswers } from "react-icons/fc";
import axios from 'axios';
import { toast } from 'react-toastify';

interface AdminQnaListProps {
    qnaId: number;
    qnaStatus: string;
    title: string;
    comment: string;
    qnaDate: string;
    fetchData: () => Promise<void>;
}

const AdminQnaList = ({
    qnaId,
    qnaStatus,
    title,
    comment,
    qnaDate,
    fetchData,
}: AdminQnaListProps) => {
    const [openAnswerModal, setOpenAnswerModal] = useState(false);
    const [enteredAnswer, setEnteredAnswer] = useState('');

    const postHandler = async () => {
        await axios.post(`/admin/qna/answer/${qnaId}`, enteredAnswer)
            .then((res) => {
                console.log(enteredAnswer);
                
                fetchData();
                toast.success("답변이 성공적으로 달렸습니다");
                setOpenAnswerModal(false);
            })
            .catch((err) => {
                fetchData();
                toast.error("답변이 실패했습니다");
            })
    }

    useEffect(() => {
        const appElement = document.getElementById('root'); // 실제로는 애플리케이션의 최상위 요소로 설정해야 합니다.

        // null 체크를 추가
        if (appElement) {
            Modal.setAppElement(appElement);
        }
    }, []);

    return (
        <div className="mb-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 mb-5">
                <span className={`px-2 py-1 ${qnaStatus === "WAITING" ? 'bg-gray-200' : 'bg-blue-200'} rounded-md`}>
                    {qnaStatus === "WAITING" ? 
                        <p className="text-sm font-bold">답변준비중</p>
                        :
                        <p className="text-sm font-bold">답변완료</p>
                    }
                </span>
                    <p className="text-sm font-semibold ">{title}</p>
                </div>
                <p className="text-sm">{qnaDate.slice(0, 10)}</p>
            </div>
            <p>{comment}</p>
            <div className="my-5"/>
            <span 
                className="w-52 flex items-center gap-[3px] border rounded-md px-4 py-2 cursor-pointer bg-blue-300 hover:opacity-50"
            >
                {qnaStatus === "WAITING" ? <>
                    <FcAnswers size={32} />
                    <p 
                        className="text-lg font-bold"
                        onClick={() => setOpenAnswerModal(true)}
                    >
                        답변 달기
                    </p>
                    </> : <p>답변완료한 문의글입니다.
                        </p>}
            </span>
            <Modal
                className="absolute top-[100px] left-[400px] w-[450px] h-[550px] bg-blue-200 z-40"
                isOpen={openAnswerModal}
                onRequestClose={() => setOpenAnswerModal(false)}
                contentLabel="Qna Modal"
            >
                <div className="px-3 py-5">
                    
                        <span className="flex items-start gap-5">
                            <p className="w-24 text-lg font-bold">문의 제목</p>
                            <p className="w-60">{title}</p>
                        </span>
                        <span className="flex items-start gap-5 mt-5">
                            <p className="w-24 text-lg font-bold">문의 내용</p>
                            <p className="w-60">{comment}</p>
                        </span>
                    

                    <hr className="my-5"/>

                    <span className="flex items-start gap-5">
                        <p className="w-24 text-lg font-bold">답변</p>
                        <textarea 
                            style={{ resize: "none" }}
                            className="h-40 p-2 border-2 w-[300px]" 
                            value={enteredAnswer}
                            onChange={(e) => setEnteredAnswer(e.target.value)}
                        />
                    </span>
                    <span className="flex items-center gap-2 mt-20">
                        <button 
                            className="text-white bg-blue-300"
                            onClick={() => postHandler()}
                        >
                            확인
                        </button>
                        <button onClick={() => setOpenAnswerModal(false)}>취소</button>
                    </span>
                </div>
            </Modal>
            <hr className='my-5' />
        </div>
    )
}

export default AdminQnaList