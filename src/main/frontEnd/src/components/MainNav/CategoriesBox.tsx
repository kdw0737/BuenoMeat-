import { Link, useParams } from "react-router-dom"
import { Categories } from "./CategoryItems"

const CategoriesBox = () => {
    
    const params = useParams(); // params는 카테고리가 떠있는 카테고리명 반환
    
    const categoryPath = params.path;
    
    return (
        <div className="flex items-center justify-center mt-40">
            <div className="grid grid-cols-6 gap-5 mt-10 text-center ">
                {Categories.map((c) => (
                    <span 
                        className={`
                            flex 
                            items-center 
                            justify-center 
                            p-10 
                            text-3xl 
                            border 
                            rounded-lg
                            transition
                            w-28 
                            h-12 
                            font-Cafe24Shiningstar
                            hover:text-neutral-800
                            ${categoryPath === c.path ? 'bg-slate-50' : 'bg-slate-500'}
                            ${categoryPath === c.path ? 'text-neutral-800' : 'text-white'}
                        `}
                        key={c.id}
                    >
                        <Link to={`/category/${c.path}`}>{c.label}</Link>
                    </span>
                ))}
            </div>
        </div>
    )
}

export default CategoriesBox