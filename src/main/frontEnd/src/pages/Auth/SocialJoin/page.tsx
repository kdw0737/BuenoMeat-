import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from '../../../components/utils/Container';
import Input from '../../../components/utils/Input';
import AddressInput from '../../../components/utils/AddressInput';
import Button from '../../../components/utils/Button';
import { DevTool } from '@hookform/devtools';
import { jwtDecode } from 'jwt-decode';
import { SocialUserProps } from '../../../types/SocialUserProps';

const SocialJoin = () => {
    const [user, setUser] = useState<SocialUserProps>();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const location = useLocation();
    

    useEffect(() => {
        setUser(jwtDecode(location.search.slice(13, )))
    }, []);
    
    console.log(location.search.slice(13, ));
    

    const { register, control, handleSubmit, setValue, formState: { 
        errors
    }} = useForm<FieldValues>({
        defaultValues: {
            username: '',
            phone: '',
            address: '',
            detailAddress: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/auth/socialLogin', Object.assign(data, { "email": user?.email }))
            .then(response => {
                console.log(Object.assign(data, { "email": user?.email }));
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
        navigate('/auth/login');
        
        setIsLoading(false);
    }

    return (
        <Container>
            <section className="grid mt-10 overflow-y-scroll place-items-center">
                <h1 className="mb-4 text-3xl font-bold">Join</h1>
                <form className="flex flex-col justify-center gap-10 min-w-[350px]" onSubmit={handleSubmit(onSubmit)}>
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
                <DevTool control={control} />
            </section>
        </Container>
    )
}

export default SocialJoin