import { Link } from "react-router-dom";

interface EmptyStateProps {
    title: string;
    subTitle: string;
}

const EmptyState = ({
    title, 
    subTitle
}: EmptyStateProps) => {
    
    return (
        <div className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
            <section className='text-4xl text-bold'>
                {title}
            </section>
            <section className='mt-2 font-light text-neutral-500'>
                {subTitle}
            </section>
            <Link to="/">
                <button className="mt-10 w-52">Home</button>
            </Link>
        </div>
    )
}

export default EmptyState