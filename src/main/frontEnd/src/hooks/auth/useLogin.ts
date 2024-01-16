import axios from "axios";
import { useDispatch } from "react-redux"
import requests from "../../api/requests";

import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../../redux/slices/currentUserSlice";
import { FieldValues } from "react-hook-form";

export const useLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const login = async (data: FieldValues) => {
        await axios.post(requests.login, data)
            .then(response => {
                console.log(response);
                dispatch(setCurrentUser({
                    id: response.data.id,
                    nickname: response.data.nickname,
                }));
                navigate('/');

            })
            .catch(error => {
                console.log(error);
            });
                    
    };
    return { login };
}


