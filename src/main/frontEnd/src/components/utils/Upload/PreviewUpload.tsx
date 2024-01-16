interface PreviewUploadProps {
    fileUrl: string | null;
}

const PreviewUpload = ({
    fileUrl
}: PreviewUploadProps) => {
    return (
        <div>
            {fileUrl && <img src={fileUrl} alt={fileUrl} className="object-cover h-32 w-28"/>}
        </div>
    )
}

export default PreviewUpload