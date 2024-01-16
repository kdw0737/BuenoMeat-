import Container from '../../../components/utils/Container'
import { useParams } from 'react-router-dom'
import Header from '../../../components/utils/Header'
import Edit from '../../../components/Member/Edit/Edit'
import WishList from '../../../components/Member/WishList'
import Cart from '../../../components/Member/CartList/Cart'
import OrderList from '../../../components/Member/orderList/OrderList'
import Review from '../../../components/Member/Review/Review'
import Qna from '../../../components/Member/Counsel/Qna'


const MyPage = () => {
    const params = useParams();
    const path = params.path;
    
    
    return (
        <Container>
            <Header 
                pageType="mypage"
                pageName={path} 
            />
            {path === 'orderlist' && <OrderList />}
            {path === "review" && <Review />}
            {path === "counsel" && <Qna />}
            {path === "wishlist" && <WishList />}
            {path === "cart" && <Cart />}
            {path === "edit" && <Edit />}
        </Container>
    )
}

export default MyPage