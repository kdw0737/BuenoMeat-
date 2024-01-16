import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SetNewPw = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const userEmail = location.state.email;

  const [newPassword, setNewPassword] = useState("");

  const patchHandler = async () => {
    await axios.patch('/email/newPw', {
      email: userEmail,
      pw: newPassword
    })
    .then((response) => {
      navigate('/auth/login');
    })
    .catch(error => {
      toast.error(error.message);
    })
  }

  return (
    <section className='px-40 my-10'>
      <p className='text-xl font-bold'>비밀번호 변경하기</p>
      <div className='mt-10'>
        <div className='flex items-center gap-2 mt-10'>
          <p className='w-40 border-r border-r-blue-300'>새로운 비밀번호</p>
          <input 
            type="text" 
            className='px-4 py-2 border rounded-md'
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button 
            className={`w-32 text-white hover:border-white bg-blue-400`}
            onClick={patchHandler}
          >
            변경
          </button>
        </div>
      </div>
    </section>
  )
}

export default SetNewPw