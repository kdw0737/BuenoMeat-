import { useState } from 'react'
import FindEmail from './FindEmail';
import FindPw from './FindPw';

const FindPage = () => {
  const [clickEmail, setClickEmail] = useState(true);
  const [id, setId] = useState("");

  return (
    <div className='px-40 mt-40'>
      <p className='text-3xl font-bold'>계정정보 찾기</p>
      <section className='mt-20'>
        <span className='flex items-center gap-6 pb-10 border-b'>
          <p 
            className={`
              px-8 py-3 border rounded-md cursor-pointer
              ${clickEmail ? 'bg-blue-400' : 'bg-transparent'}
              ${clickEmail ? 'text-white' : 'text-black'}
            `}
            onClick={() => setClickEmail(true)}
          >
            아이디(이메일) 찾기
          </p>
          <p 
            className={`
            px-8 py-3 border rounded-md cursor-pointer
            ${!clickEmail ? 'bg-blue-400' : 'bg-transparent'}
            ${!clickEmail ? 'text-white' : 'text-black'}
          `}
          onClick={() => setClickEmail(false)}
          >
            비밀번호 찾기
          </p>
        </span>
        {clickEmail ? 
          <FindEmail setId={setId}/> : 
          <FindPw id={id}/>
        }
      </section>

    </div>
  )
}

export default FindPage