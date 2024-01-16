import { useEffect } from 'react'
import Container from '../../../components/utils/Container'
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../../redux/slices/currentUserSlice';

const SocialAuthPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const accessToken = searchParams.get('accessToken');
  const refreshToken = searchParams.get('refreshToken');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const postHandler = async () => {
    try {
      const response = await axios.post("/auth/socialLogin/token", {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      dispatch(setCurrentUser({
        id: response.data.id,
        nickname: response.data.nickname
      }));
      navigate('/');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    if (accessToken && refreshToken) {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      postHandler();
    }
  }, []);
  

  return (
    <Container>
      <section className="grid mt-40 overflow-y-scroll place-items-center">
        <h1 className="mb-4 text-3xl font-bold">로그인처리중입니다. 잠시만 기다려주세요.</h1>
      </section>
    </Container>
  )
}

export default SocialAuthPage