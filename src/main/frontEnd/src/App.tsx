import { Navigate, Outlet, Route, Routes, useParams } from "react-router-dom";
import MainNavbar from "./components/MainNav";
import JoinPage from "./pages/Auth/JoinPage/page";
import LoginPage from "./pages/Auth/LoginPage/page";
import MainPage from "./pages/MainPage/page";
import ProductDetailPage from "./pages/DetailProduct/page";
import ErrorPage from "./pages/ErrorPage/page";
import CategoryPage from "./pages/CategoryPage/page";
import { useSelector } from "react-redux";
import { RootState } from "./redux";
import MyPage from "./pages/member/MyPage/page";
import MemberNav from "./components/MemberNav";
import SearchPage from "./pages/SearchPage/page";
import ToastProvider from "./components/utils/ToastProvider";
import OrderPage from "./pages/OrderPage/page";
import AdminMainPage from "./pages/AdminPage/MainPage/page";
import AdminLoginPage from "./pages/AdminPage/LoginPage/page";
import AdminQnaPage from "./pages/AdminPage/QnaPage/page";
import AdminProductPage from "./pages/AdminPage/ProductManagePage/page";
import PlusProductPage from "./pages/AdminPage/ProductManagePage/PlusProduct/page";
import EditProductPage from "./pages/AdminPage/ProductManagePage/EditProduct/page";
import CategoryProducts from "./pages/AdminPage/ProductManagePage/EditProduct/CategoryProducts";
import SocialJoin from './pages/Auth/SocialJoin/page';
import SocialAuthPage from './pages/Auth/SocialJoin/SocialAuthPage';
import FindPage from './pages/Auth/FindPage/page';
import SetNewPw from './pages/Auth/FindPage/SetNewPw';



function App() {
  const MainLayout = () => {
    return (
      <div>
        <MainNavbar />
        <Outlet />
      </div>
    );
  }

  const MemberLayout = () => {
    const params = useParams();
    return (
      <div>
        <MemberNav params={params}/>
        <Outlet />
      </div>
    )
  }

  const currentUser = useSelector((state: RootState) => state.currentUser.id);

  const admin = useSelector((state: RootState) => state.currentUser.nickname);

  
  
  return (
    <div>
      <ToastProvider />
      <Routes>
        <Route path='/admin/auth/login' element={<AdminLoginPage />} />

        {admin ? 
          <Route path='/admin'>
          <Route index element={<AdminMainPage />} />
          <Route path='product'>
            <Route index element={<AdminProductPage />} />
            <Route path='plus' element={<PlusProductPage />} />
      
            <Route path="edit">
              <Route index element={<EditProductPage />} />
              <Route path='category/:path' element={<CategoryProducts />} />
            </Route>
            
          </Route>
          <Route path='qna' element={<AdminQnaPage />} />
        </Route> : <Route path='/admin/:path' element={<Navigate to="/" />} />
        }
        
        <Route path='/auth'>
          <Route path='join' element={<JoinPage />} />
          <Route path='login' element={<LoginPage />} />
          <Route path='find' element={<FindPage />} />
          <Route path='newPw' element={<SetNewPw />} />
          <Route path='socialJoin' element={<SocialJoin />} />
        </Route>

        <Route path='/some/path' element={<SocialAuthPage />} /> 
        

        <Route path='/' element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path='/products/:productId' element={<ProductDetailPage />} />
          <Route path='/category/:path' element={<CategoryPage />} />
          <Route path='search' element={<SearchPage />}/>
          <Route path='order' element={ currentUser ? (<OrderPage />) : (<Navigate to="/auth/login" />) } />

          {currentUser ?
            <Route path='/member/mypage/:path' element={<MemberLayout />}>
              <Route index element={<MyPage />} />
            </Route>  :  <Route path='/member/mypage/:path' element={<Navigate to="/auth/login" />} />
          }

          

        </Route>
        <Route path=":bulabula" element={<ErrorPage />} />
      </Routes>
    </div>
    );
}

export default App;
