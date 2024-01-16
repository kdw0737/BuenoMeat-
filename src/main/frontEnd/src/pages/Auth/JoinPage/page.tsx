import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { DevTool } from "@hookform/devtools";
import Input from "../../../components/utils/Input"
import { useState } from "react";
import Button from "../../../components/utils/Button";
import { Link, useNavigate } from "react-router-dom";
import AddressInput from "../../../components/utils/AddressInput";
import Container from "../../../components/utils/Container";
import axios from "axios";
import requests from "../../../api/requests";

const JoinPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const { register, control, handleSubmit, setValue, formState: { 
        errors
    }} = useForm<FieldValues>({
        defaultValues: {
            email: '',
            pw: '',
            username: '',
            phone: '',
            nickname: '',
            address: '',
            detailAddress: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post(requests.join, data)
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
        console.log(data);
        navigate('/auth/login');
        setIsLoading(false);
    }

    return (
        <Container>
            <section className="grid mt-10 overflow-y-scroll place-items-center">
                <h1 className="mb-4 text-3xl font-bold">Join</h1>
                <form className="flex flex-col justify-center gap-10 min-w-[350px]" onSubmit={handleSubmit(onSubmit)}>
                    <Input 
                        id="email"
                        label="Email"
                        type="email"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        pattern={/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/}
                        message="Follow the email form"
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
                    <Input 
                        id="username"
                        label="Name"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        message="Please enter a Name"
                        required
                    />
                    <Input 
                        id="phone"
                        label="Phone Number"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        message="Please enter Phone Number"
                        required
                    />
                    <Input 
                        id="nickname"
                        label="NickName"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        message="Please enter a NickName"
                        required
                    />
                    <AddressInput
                        label="Address"
                        register={register}
                        setValue={setValue}
                        message="Please enter an address"
                        required
                    />
                    <Input 
                        id="detailAddress"
                        label="Detail Address"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        message="Please enter a detail address"
                        required
                    />

                    <Button label="Create Account" />
                </form>
                <span className="flex justify-between gap-5 my-10">
                    <p className="text-xl text-zinc-300">Already have an account?</p>
                    <Link to="/auth/login"><p className="text-blue-500">Log in</p></Link>
                </span>
                <DevTool control={control} />
            </section>
        </Container>
    )
}

export default JoinPage