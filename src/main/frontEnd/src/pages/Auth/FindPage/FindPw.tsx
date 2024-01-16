import axios from 'axios';
import { useState } from 'react';
import { IoCheckmark } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface FindPwProps {
  id: string;
}

const FindPw = ({
  id
}: FindPwProps) => {
  console.log(id);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  
  const postHandler = async() => {
    if (email === id) {
      await axios.post('/email/findPw', email)
      .then((response) => {
        toast.success("바뀐 비밀번호는 0000입니다!")
        navigate('/auth/newPw', {
          state: {
            email: id,
          }
        });
      })
      .catch(error => {
        toast.error(error.message);
        // navigate('/auth/newPw', {
        //   state: {
        //     email: id,
        //   }
        // });
      })
    } else {
      toast.error("입력한 회원정보와 일치하는 회원이 없습니다");
    }
    
  }

  return (
    <section className='mt-10'>
      <span className='flex items-center'>
        <IoCheckmark size={15} color="blue" />
        <p className='text-sm font-bold'>비밀번호의 경우 암호화 저장되어 분실 시 찾아드릴 수 없는 정보 입니다.</p>
      </span>
      <span className='flex items-center mt-2'>
        <IoCheckmark size={15} color="blue" />
        <p className='text-sm font-bold'>본인 확인을 통해 비밀번호를 재설정 하실 수 있습니다.</p>
      </span>
      <div className='mt-10'>
        <div className='flex items-center gap-2'>
          <p className='w-40 border-r border-r-blue-300'>아이디</p>
          <span>
            <input 
              type="email" 
              className='px-4 py-2 border rounded-md '
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className='text-sm text-gray-200'>쿠팡에 가입된 계정 이메일을 정확히 기입해주시길 바랍니다.</p>
          </span>
        </div>
        <button 
          className='w-40 mt-10 text-white bg-blue-500'
          onClick={postHandler}
        >
          비밀번호 찾기
        </button>
      </div>
    </section>
  )
}

export default FindPw