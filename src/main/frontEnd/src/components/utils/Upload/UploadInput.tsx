import { useFileUpload } from '../../../utils/useFileUpload'

interface UploadInputProps {
    onFileUrlChange: (url: string) => void;
}

const UploadInput = ({
    onFileUrlChange
}: UploadInputProps) => {
    const handleFileUpload = useFileUpload({ onFileUrlChange });

    return (
        <input type='file' onChange={handleFileUpload} />
    )
}

export default UploadInput