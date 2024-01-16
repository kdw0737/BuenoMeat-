import { Link } from "react-router-dom"

const MemberNav = ({ params }:  any) => {
    
    let path = params.path;
    
    const labels = [
        'OrderList',
        'Review',
        'Counsel',
        'WishList',
        'Cart',
    ]

    return (
        <div className='absolute left-0 w-52'>
            <ul className="flex flex-col gap-5 px-5 text-4xl text-gray-400 font-Cafe24Shiningstar">
                {labels.map((label) => (
                    <span key={label}>
                        <Link to={`/member/mypage/${label.toLowerCase()}`}>
                            <li className={`border-none hover:text-blue-400 ${path === label.toLowerCase() ? 'text-blue-400' : null}`}>
                                {label}
                            </li>
                        </Link>
                    </span>
                ))}
            </ul>
        </div>
    )
}

export default MemberNav