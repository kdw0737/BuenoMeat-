import { DevTool } from "@hookform/devtools";
import Button from "../../../../components/utils/Button";
import Input from "../../../../components/utils/Input";
import CategoryBox from "../CategoryBox";
import { Categories } from "../../../../components/MainNav/CategoryItems";
import ImageUpload from "../ImageUpload";
import Container from "../../../../components/utils/Container";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { ProductProps } from "../../../../types/ProductProps";
import axios from 'axios';
import { toast } from 'react-toastify';

interface ModifyProductProps extends ProductProps {
    setShowModify:  React.Dispatch<React.SetStateAction<boolean>>;
}

const ModifyProduct = ({
    id,
    name,
    price,
    image: imageSrc,
    info,
    weight,
    weightUnit,
    setShowModify
}: ModifyProductProps) => {
    const [isLoading, setIsLoading] = useState(false);

    const { 
        register,
        handleSubmit,
        setValue,
        watch,
        control,
        formState: {
            errors,
        },
    } = useForm<FieldValues>({
        defaultValues: {
            image: imageSrc,
            name: name,
            info: info,
            price: price,
            category_name: "",
            stock: 0,
            weight: weight,
            weightUnit: weightUnit,
        }
    });

    const image = watch('image');
    const category_name = watch('category_name');
    

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        console.log(data);  // 수정하려는 상품 정보 로그로 확인
        axios.put(`/admin/product/modify/${id}`, data)
            .then(response => {
                console.log(response);
                toast.success('상품 수정에 성공하였습니다');
            })
            .catch(error => {
                console.log(error);
                toast.error('상품 수정에 실패하였습니다');
            });
        setIsLoading(false);
        setShowModify(false);
    }
    

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value);
    }

    const handleFileUrlChange = (url: string) => {
        const modifiedUrl = url.split('.jpg')[0] + '.jpg';
        setCustomValue('image', modifiedUrl);
    }

    return (
        <Container>
            <div className='max-w-screen-lg mx-auto my-10'>
                <h1 className="mb-4 text-6xl font-bold">상품 등록</h1>
                <form className="flex flex-col justify-center gap-10" onSubmit={handleSubmit(onSubmit)}>
                    <ImageUpload 
                        onFileUrlChange={handleFileUrlChange}
                        value={image}
                    />
                    
                    <div 
                        className='
                        grid 
                        grid-cols-1
                        md:grid-cols-2
                        gap-3
                        max-h-[50vh]
                        overflow-y-auto 
                        '
                    >
                        {Categories.map((c) => (    
                            <CategoryBox 
                                key={c.id}
                                id={c.id}
                                path={c.path}
                                icon={c.icon}
                                onClick={(category: string) => setCustomValue('category_name', category)}
                                selected={category_name === c.label.toUpperCase()} 
                            />
                        ))}
                    </div>
                    
                    <Input 
                        id="name"
                        label="Title"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Input 
                        id="info"
                        label='Description'
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Input 
                        id="price"
                        label="Price"
                        type="number"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Input 
                        id="stock"
                        label="Stock"
                        type="number"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Input 
                        id="weight"
                        label="Weight"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    <Input 
                        id="weightUnit"
                        label="WeightUnit"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                    

                    <Button label="상품 수정하기" />
                </form>
                
                <DevTool control={control} />
            </div>
        </Container>
    )
}

export default ModifyProduct