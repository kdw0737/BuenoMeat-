import { useLocation } from "react-router-dom";
import { useDebounce } from "./useDebounce";

const useSearchProduct = () => {

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery();
    const searchProduct = query.get('q') as string;

    return useDebounce(searchProduct, 1000);
    
}

export default useSearchProduct;