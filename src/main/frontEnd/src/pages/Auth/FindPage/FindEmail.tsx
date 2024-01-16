import axios from 'axios';
import { useState } from 'react'
import { toast } from 'react-toastify';

interface FindEmailProps {
  setId:  React.Dispatch<React.SetStateAction<string>>;
}

const FindEmail = ({
  setId
}: FindEmailProps) => {
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  const postHandler = async() => {
    console.log({ username: username, phone: phone });
    
    await axios.post('/email/findId', { username: username, phone: phone })
      .then((response) => {
        setId(response.data.email);
        toast.success(`아이디는 ${response.data.email}`);
      })
      .catch((error) => {
        toast.error("일치하는 회원이 없습니다")
        // setId("taeill012@gmail.com");
      })
  }

  return (
    <section className='my-10'>
      <p className='text-xl font-bold'>등록된 휴대폰 번호로 찾기</p>
      <div className='mt-10'>
        <div className='flex items-center gap-2'>
          <p className='w-40 border-r border-r-blue-300'>이름</p>
          <input 
            type="text" 
            className='px-4 py-2 border rounded-md '
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='flex items-center gap-2 mt-10'>
          <p className='w-40 border-r border-r-blue-300'>등록한 휴대폰 번호</p>
          <input 
            type="text" 
            className='px-4 py-2 border rounded-md'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button 
            className={`w-32 text-white hover:border-white bg-blue-400`}
            onClick={postHandler}
          >
            아이디 찾기
          </button>
        </div>
      </div>
    </section>
  )
}

export default FindEmail