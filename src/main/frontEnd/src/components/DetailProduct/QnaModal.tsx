import axios from "axios";
import { useState } from "react";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../../redux";

interface QnaModalProps {
    modalIsOpen: boolean;
    setModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    productId?: number;
}

const QnaModal = ({
    modalIsOpen,
    setModalIsOpen,
    productId
}: QnaModalProps) => {
    const memberId = useSelector((state: RootState) => state.currentUser.id);

    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredText, setEnteredText] = useState('');

    const postHandler = async () => {
        const data = { "title": enteredTitle, "comment": enteredText }
        await axios.post(`/qna/${memberId}/${productId}`, data)
            .then(response => {
                console.log(response);
                toast.success("문의글이 성공적으로 올라갔습니다!");
                setModalIsOpen(false);
            })
            .catch(error => {
                console.log(error);
            })
    };
    return (
      <Modal
          className="absolute top-1/3 left-1/4 w-[630px] h-[450px] bg-slate-200 z-40"
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Qna Modal"
      >
          <div>
              <div className='px-10 mt-5'>
                  <p className='text-2xl font-bold text-start'>상품 문의</p>
                  <hr className='w-full my-4'/>
                  <div>
                      <div className='flex items-center'>
                          <p className='w-36'>문의 제목</p>
                          <input 
                              className="w-[400px] p-2 rounded-md"
                              type="text"
                              value={enteredTitle}
                              onChange={(e) => setEnteredTitle(e.target.value)}
                          />
                      </div>
                      <div className='my-10'/>
                      <div className='flex items-start'>
                          <p className='w-36'>문의 내용</p>
                          <textarea 
                              style={{ resize: "none" }}
                              className="h-40 p-2 border-2 w-[400px]" 
                              value={enteredText}
                              onChange={(e) => setEnteredText(e.target.value)}
                          />
                      </div>
                      <div className='flex items-center gap-5 mt-10'>
                          <button 
                              className='text-white bg-blue-400'
                              onClick={() => postHandler()}
                          >
                              확인
                          </button>
                          <button onClick={() => setModalIsOpen(false)}>취소</button>
                      </div>
                  </div>
              </div>    
          </div>
      </Modal>
  )
}

export default QnaModal