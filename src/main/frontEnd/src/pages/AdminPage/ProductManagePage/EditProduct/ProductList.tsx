import { useState } from "react";
import { ProductProps } from "../../../../types/ProductProps"
import ModifyProduct from "./ModifyProduct";
import axios from 'axios';
import { toast } from 'react-toastify';

interface ProductListProps extends ProductProps{
    index: number;
}

const ProductList = ({
    index,
    id,
    name,
    price,
    image,
    info,
    weight,
    weightUnit
}: ProductListProps) => {
    const [showModify, setShowModify] = useState(false);

    const deleteHandler = async (id: number) => {
        await axios.delete(`/admin/product/${id}`)
            .then(response => {
                toast.success("상품 삭제에 성공하였습니다!");
                
            })
    }

    if (!showModify){

        return (
            <div className="p-5">
                <div className="flex items-center justify-between gap-5">
                    <p className="text-2xl font-bold">{index}</p>
                    <img src={image} alt={image} className="object-cover w-20 h-20 rounded-full" />
                    <p className="text-lg font-bold">{name}</p>
                    <p className="font-semibold ">{info}</p>
                    <span className="flex w-40 gap-4">
                        <button 
                            className="text-white bg-yellow-300"
                            onClick={() => setShowModify(true)}
                        >
                            수정
                        </button>
                        <button onClick={() => deleteHandler(id!)}>삭제</button>
                    </span>
                </div>
            </div>
        )
    } else {
        return (
            <ModifyProduct 
                id={id}
                name={name}
                price={price}
                image={image}
                info={info}
                weight={weight}
                weightUnit={weightUnit}
                setShowModify={setShowModify}
            />
        )
    }
}

export default ProductList