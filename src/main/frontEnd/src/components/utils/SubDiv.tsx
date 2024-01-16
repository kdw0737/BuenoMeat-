interface SubDivProps {
    firstTitle: string;
    subTitle: any;
}

const SubDiv = ({
    firstTitle,
    subTitle
}: SubDivProps) => {
    return (
        <div className='flex items-center justify-between gap-10 mb-4'>
            <p className="text-lg font-bold">{firstTitle}</p>
            <p className="font-semibold text-md ">{subTitle}</p>
        </div>
    )
}

export default SubDiv