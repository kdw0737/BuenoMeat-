import { AiOutlineSearch } from 'react-icons/ai';
import { GiHamburgerMenu } from 'react-icons/gi'
import Container from '../utils/Container';
import { Link, useNavigate } from 'react-router-dom';
import { ShowNavItems } from './NavItems';
import CategoryModal from './CategoryModal';
import { useEffect, useState } from 'react';
import useScroll from '../../utils/useScroll';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';

import CategoriesBox from './CategoriesBox';
import { useLogout } from '../../hooks/auth/useLogout';



const MainNavbar = () => {
    const [showModal, setShowModal] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const show = useScroll(80);
    const { logout } = useLogout();

    const currentUserData = useSelector((state: RootState) => state.currentUser);
    const nickName = currentUserData.nickname;

    const searchHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchValue(e.target.value);
    }

    useEffect(() => {
        navigate(`/search?q=${searchValue}`);
    }, [searchValue]);
    
    return (
        <Container>
            <div className={`fixed h-52 top-0 left-0 right-0 z-20 ${show ? 'bg-zinc-50' : 'bg-transparent'} px-10`}>
                <div className={`flex ${nickName ? 'justify-between' : 'justify-end'} w-full px-10 py-5`}>
                    {nickName && <span className='flex gap-3 text-gray-300 text-light'>
                        <p className='ml-2 text-2xl text-black font-Cafe24Shiningstar'>Hello {nickName}</p>
                    </span>}
                    <ul className='flex items-center gap-4 text-sm font-light'>
                        {nickName ? <Link to='/member/mypage/edit'><li>내정보수정</li></Link> : <Link to="/auth/join"><li>회원가입</li></Link>}
                        {nickName ? <li onClick={logout}>로그아웃</li> : <Link to="/auth/login"><li>로그인</li></Link>}
                        <li>고객센터</li>
                    </ul>
                </div>
                <div className='flex items-center justify-between h-8 mt-10'>
                    <GiHamburgerMenu
                        className='cursor-pointer'
                        size={25} 
                        onClick={() => setShowModal(true)}
                    />
                    <Link to="/"><p className='text-6xl font-Cafe24Shiningstar'>Bueno Meat</p></Link>
                    <div className='flex items-center border-4 border-zinc-800'>
                        <input 
                            type='text'
                            className='w-auto px-2 py-1 outline-none'
                            value={searchValue}
                            onChange={searchHandler}
                        />
                        <span className='flex items-center justify-center h-[32px] w-[32px] bg-zinc-800'>
                            <AiOutlineSearch size={25} className='text-white' />
                        </span>
                    </div>
                    <ShowNavItems />
                </div>
                {showModal && 
                    <CategoryModal 
                    setShowModal={setShowModal}
                    />
                }
                </div>
                <CategoriesBox />
        </Container>
    )
}

export default MainNavbar