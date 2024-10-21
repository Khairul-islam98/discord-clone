
interface FileUploadProps {
    onChange: (url?: string) => void;
    value: string;
    endpoint: 'serverImage' | 'messageFile';
}

export const FileUpload = ({
    onChange,
    value,
    endpoint,
}:FileUploadProps) => {
    return (
        <div>
            
        </div>
    );
};

