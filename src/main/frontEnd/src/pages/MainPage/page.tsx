import requests from '../../api/requests'
import Container from '../../components/utils/Container'
import Row from '../../components/Row'

const MainPage = () => {
    return (
        <Container>
            <div className='flex flex-col items-center justify-center mt-20 text-center'>
                <hr className="h-1 bg-gray-200" />
                <Row title="Best Bueno" fetchUrl={requests.hotBueno} />
            </div>
        </Container>
    )
}

export default MainPage