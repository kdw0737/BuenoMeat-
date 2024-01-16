import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Input from "../../utils/Input";
import { Dispatch, SetStateAction, useState } from "react";
import Button from "../../utils/Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux";
import { updateField } from "../../../redux/slices/memberEditSlice";
import { updateCurrentUserNickname } from "../../../redux/slices/currentUserSlice";
import { toast } from "react-toastify";

export interface UpdateFieldProps {
    prevValue?: string;
    fieldName: string;
    setShowEdit: Dispatch<SetStateAction<boolean>>
    updateZipcode?: () => Promise<void>
}

const UpdateField = ({
    prevValue,
    fieldName,
    setShowEdit,
}: UpdateFieldProps) => {
    const userId = useSelector((state: RootState) => state.currentUser.id);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);

    const { register, handleSubmit, formState: {
        errors
    }} = useForm<FieldValues>({
        defaultValues: {

        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        
        axios.patch(`/mypage/${userId}/${Object.keys(data)[0]}`, data)
            .then((response) => {
                console.log(response);
                toast.success(`${Object.keys(data)[0]} 변경이 완료되었습니다!`)
                dispatch(updateField(data));
                dispatch(updateCurrentUserNickname(data));
            })
            .catch((error) => {
                console.log(error);
                
            })
        setIsLoading(false);
        setShowEdit(false)
    }

    return (
        <div className="w-[360px]">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex items-center gap-5">
                    <label className="w-full">{`신규 ${fieldName}`}</label>
                    <Input 
                        id={`${fieldName === "이름(실명)" ? "username" : fieldName === "닉네임" ? "nickname" : "phone"}`}
                        type="text"
                        disabled={isLoading}
                        register={register}
                        errors={errors}
                        required
                    />
                </div>
                <p className="mt-5 font-light text-gray-400 ">{`기존 ${fieldName}: ${prevValue}`}</p>
                <div className="flex w-1/2 gap-2 mt-10">
                    <button onClick={() => setShowEdit(false)}>취소</button>
                    <Button label="완료" />
                </div>
            </form>
        </div>
    )
}

export default UpdateField