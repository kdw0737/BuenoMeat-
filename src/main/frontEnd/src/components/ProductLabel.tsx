interface ProductLabelProps {
    selectedOption: string;
    
}

const ProductLabel = ({
    selectedOption,
    
}: ProductLabelProps) => {
    return (
        <div className='px-4 py-2 font-bold bg-gray-500 border rounded-md w-fit'>
            <p className='text-white'>{`${selectedOption}`}</p>
        </div>
    )
}

export default ProductLabel