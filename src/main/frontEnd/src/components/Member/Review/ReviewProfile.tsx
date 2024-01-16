import { CgProfile } from "react-icons/cg";
import { UserProps } from "../../../types/UserProps";

const ReviewProfile = ({
    nickname,
    recommendNum
}: UserProps) => {
    return (
        <div className="flex gap-5 px-10 py-5 mt-12 border-2 border-t-blue-600">
            <span className="flex items-center gap-5">
                <CgProfile size={100}/>
                <p className="pb-5 text-5xl">{nickname}</p>
            </span>
            <div className="border-l-2 h-28 bg-slate-400"/>
            <div className="text-center">
                <p className="text-lg font-bold">도 움</p>
                <span className="flex items-center gap-2 mt-[10px]">
                    <p className="font-light text-7xl">{recommendNum}</p>
                    <p className="pt-10">명</p>
                </span>
            </div>
        </div>
    )
}

export default ReviewProfile