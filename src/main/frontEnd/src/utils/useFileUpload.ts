import AWS from 'aws-sdk';
import { toast } from 'react-toastify';

interface S3UploadParams {
    ACL: string;
    Body: Blob;
    Bucket: string;
    Key: string;
    ContentType: string;
}

interface FileUploadOptions {
    onFileUrlChange: (url: string) => void;
}

export function useFileUpload (options?: FileUploadOptions) {
    const ACCESS_KEY = process.env.REACT_APP_PUBLIC_AWS_ACCESS_KEY;
    const SECRET_ACCESS_KEY = process.env.REACT_APP_PUBLIC_AWS_SECRET_ACCESS_KEY;
    const REGION = process.env.REACT_APP_PUBLIC_REGION;
    const S3_BUCKET = process.env.REACT_APP_PUBLIC_AWS_BUCKET;

    // AWS ACCESS KEY 세팅
    AWS.config.update({
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY
    });

    // 버킷에 맞는 이름과 리전을 설정
    const myBucket = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: REGION,
    });

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        const fileExt = file?.name.split('.').pop();
        if(file?.type !== 'image/jpeg' || fileExt !=='jpg'){
            toast.warn('jpg 파일만 Upload 가능합니다.');
            return;
        }

        if (file) {

        // 파일과 파일이름 넘겨주기
        const params: S3UploadParams = {
            ACL: 'public-read',
            Body: file,
            Bucket: S3_BUCKET || '' ,
            Key: "upload/" + file.name,
            ContentType: file.type,  // 파일 유형을 설정하여 브라우저가 파일을 어떻게 표시해야 하는지 이해하도록 합니다.
        };

        myBucket.putObject(params)
            .on('httpUploadProgress', (evt, response) => {
                if (response) {
                    // 업로드가 완료되면 사인된 URL을 생성
                    const urlParams = { Bucket: S3_BUCKET, Key: params.Key };
                    myBucket.getSignedUrlPromise('getObject', urlParams)
                        .then(url => {
                            console.log("File URL:", url);
                            
                            // 여기서 얻은 URL을 사용하거나 상태로 저장할 수 있습니다.
                            options?.onFileUrlChange(url);
                        })
                        .catch(err => console.log("Error getting file URL:", err));
                }
                toast.success("사진 업로드에 성공하였습니다!")
            })
            .send((err) => {
                if (err) toast.error("사진 업로드에 실패했습니다.");
            })
        }
    };
    
    return handleFileUpload;
}