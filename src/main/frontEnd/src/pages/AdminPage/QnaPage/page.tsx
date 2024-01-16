import { useCallback, useEffect, useState } from 'react';
import AdminQnaList from "../../../components/utils/AdminQnaList";
import axios from 'axios';
import { AdminQnaDataProps } from '../../../types/AdminQnaDataProps';

const AdminQnaPage = () => {
    const [qnaData, setQnaData] = useState<AdminQnaDataProps[]>([]);
    const fetchData = useCallback(async () => {
        try {
            const response = await axios.get('/admin/qna');
            console.log(response.data);
            
            setQnaData(response.data);
            
        } catch (error) {
            console.log(error);
        }
    }, []);
    

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="px-10 my-10">
            <div className="flex items-center">
                <p className="text-5xl font-bold text-start">문의내역 확인</p>
            </div>
            <hr className="h-1 my-5 bg-black" />
            
            <div className="p-2 border">
                {qnaData.length > 0 ? 
                    <>
                        {qnaData.map((data, index) => (
                            <AdminQnaList 
                                key={index}
                                qnaId={data.id}
                                qnaStatus={data.qnaStatus}
                                title={data.title}
                                comment={data.comment}
                                qnaDate={data.qnaTime}
                                fetchData={fetchData}
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
    )
}

export default AdminQnaPage