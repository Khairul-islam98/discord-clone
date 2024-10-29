"use client"


import { X } from "lucide-react";
import Image from "next/image";

import { UploadButton } from "@/lib/uploadthing";



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
    const fileType = value?.split('.').pop();
    if(value && fileType !== "pdf"){
        return (
            <div className=" relative h-20 w-20">
                <Image
                fill
                src={value}
                alt="Upload"
                className="rounded-full"
                />
                <button
                onClick={() => onChange("")}
                className="bg-rose-500 text-white rounded-full p-1 absolute top-0 right-0 shadow-sm"
                type="button"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }
    return (
       <UploadButton
       appearance={{
        button:
          "ut-ready:bg-green-500 ut-uploading:cursor-not-allowed rounded-r-none bg-red-500 bg-none after:bg-orange-400",
        container: "w-max flex-row rounded-md border-cyan-300 bg-slate-800",
        allowedContent:
          "flex h-8 flex-col items-center justify-center px-2 text-white",
      }}
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
            onChange(res?.[0].url)
        }}
        onUploadError={(error: Error) => {
            console.log(error);
        }}
        
       />
    );
};

