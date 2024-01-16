import { useRef } from "react";
import { MdCloudUpload } from "react-icons/md";
import { useFileUpload } from "../../../utils/useFileUpload";

interface ImageUploadProps {
    onFileUrlChange: (url: string) => void;
    value: string | null;
}

const ImageUpload = ({
    onFileUrlChange,
    value
}: ImageUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileUpload = useFileUpload({ onFileUrlChange });

    return (
        <div 
            className='relative flex flex-col items-center justify-center gap-4 p-20 transition border-2 border-dashed cursor-pointer hover:opacity-70 border-neutral-300 text-neutral-300'
        >
            <input 
                className="hidden"
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
            />
            <MdCloudUpload 
                size={50} 
                onClick={handleButtonClick}
            />
            {value && (
                <img 
                    className='absolute inset-0 object-cover w-full h-full'
                    src={value}
                    alt=''
                />
            )}
        </div>
    )
}

export default ImageUpload