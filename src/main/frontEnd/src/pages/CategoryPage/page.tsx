import { useParams } from 'react-router-dom'
import Container from '../../components/utils/Container';
import Header from '../../components/utils/Header';
import Row from '../../components/Row';

const CategoryPage = () => {
    const params = useParams();
    
    const categoryName = params.path?.toUpperCase();
    console.log(categoryName);
    
    return (
        <Container>
            <Header 
                pageType="category"
                pageName={categoryName} 
            />
            <div className='flex flex-col items-center justify-center mt-20 text-center'>
                <hr className="h-1 bg-gray-200" />
                <Row title={categoryName!} fetchUrl={`/products/${categoryName}`} />
            </div>
        </Container>
    )
}

export default CategoryPage