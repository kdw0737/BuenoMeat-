import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Container from "../../../components/utils/Container";
import Input from "../../../components/utils/Input";
import Button from "../../../components/utils/Button";
import { DevTool } from "@hookform/devtools";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCurrentUser } from '../../../redux/slices/currentUserSlice';

const AdminLoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    
    const { register, control, handleSubmit, formState: { 
        errors
    }} = useForm<FieldValues>({
        defaultValues: {
            email: '',
            pw: '',
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        console.log(data);
        
        axios.post('/admin/login', data)
            .then(response => {
                console.log(response);
                dispatch(setCurrentUser({
                    id: response.data.adminId,
                    nickname: response.data.nickname,
                }));
            })
            .catch(error => {
                console.log(error);
            });
                    
        navigate('/admin')
        setIsLoading(false);
    }
    
    return (
        <Container>
            <section className="grid mt-32 overflow-y-scroll place-items-center">
                <h1 className="mb-10 text-3xl font-bold">Admin Login</h1>
                
                <form className="flex flex-col justify-center gap-10 min-w-[350px]" onSubmit={handleSubmit(onSubmit)}>
                    <Input 
                        id="email"
                        label='EMAIL'
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        type="email"
                        message="Please enter an EMAIL"
                        required
                    />
                    <Input 
                        id="pw"
                        label='Password'
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        minLength={8}
                        type='password'
                        message="Passward must be at least 8 characters"
                        required
                    />

                    <Button label="Login" />
                </form>
                
                
                <DevTool control={control} />    
            </section>
        </Container>
    )
}

export default AdminLoginPage