import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom";
import { removeCurrentUser } from "../../redux/slices/currentUserSlice";

export const useLogout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(removeCurrentUser());
        navigate('/');
    };

    return { logout };
}