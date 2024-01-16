import { useState } from "react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../../utils/Input";
import Button from "../../utils/Button";
import { UpdateFieldProps } from "./UpdateField";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux";
import axios from "axios";
import { updateField } from "../../../redux/slices/memberEditSlice";
import { toast } from "react-toastify";

const UpdatePasswordField = ({
    fieldName,
    setShowEdit
}: UpdateFieldProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [checkedPw, setCheckedPw] = useState('');

    const userId = useSelector((state: RootState) => state.currentUser.id);
    const dispatch = useDispatch();

    const { register, handleSubmit, getValues, setValue, formState: {
        errors
    }} = useForm<FieldValues>({
        defaultValues: {
            
        }
    })
    

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        if (checkedPw !== getValues("newPw")) {
            alert("신규 비밀번호와 재입력 비밀번호가 같지 않습니다");
            setCheckedPw('');
            setValue("newPw", '');
            
        }
        
        axios.patch(`/mypage/${userId}/password`, data)
            .then((response) => {
                const { newPw } = data;
                dispatch(updateField(newPw));
                toast.success('비밀번호 변경이 완료되었습니다!')
            })
            .catch((error) => {
                console.log(error);
                toast.error('비밀번호 변경에 실패했습니다.')
            })
        
        setIsLoading(false);
        setShowEdit(false);
    }


    return (
        <div className="w-[360px]">
            <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-row items-center gap-5">
                    <label className="w-2/5">
                        현재 비밀번호
                    </label>
                    <Input
                        id="pw"
                        type="password"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                </div>
                <div className="flex flex-row items-center gap-5">
                    <label className="w-2/5">
                        신규 비밀번호
                    </label>
                    <Input 
                        id="newPw"
                        type='password'
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                </div>
                <div className="flex flex-row items-center gap-5">
                    <label className="w-2/5">
                        신규 비밀번호 재입력
                    </label>
                    <input 
                        className="w-full p-4 pt-6 font-light transition bg-white border-2 border-black rounded-md outline-none focus:border-black"
                        value={checkedPw}
                        onChange={(e) => setCheckedPw(e.target.value)}
                        id={fieldName}
                        type='password'
                        disabled={isLoading}
                        required
                    />
                </div>
                <div className="flex w-1/2 gap-2">
                    <button onClick={() => setShowEdit(false)}>취소</button>
                    <Button label="완료" />
                </div>
            </form>
        </div>
    )
}

export default UpdatePasswordField