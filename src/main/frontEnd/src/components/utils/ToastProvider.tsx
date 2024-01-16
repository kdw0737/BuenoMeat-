import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 
import './custom-toastify-style.css'; 

const ToastProvider = () => {
    return (
        <ToastContainer 
            autoClose={2000}
        />
    )
}

export default ToastProvider