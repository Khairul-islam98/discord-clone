"use client";

import React from "react";
import { FileIcon, X } from "lucide-react";
import Image from "next/image";

import { UploadDropzone } from "@/lib/uploadthing";

interface FileUploadProps {
  onChange: (file?: { url: string; type: string } | string) => void;
  value: string | { url: string; type: string };
  endpoint: "messageFile" | "serverImage";
}

export function FileUpload({
  onChange,
  value,
  endpoint,
}: FileUploadProps) {

   

    const url = typeof value === "object" ? value.url : "";
    const type = typeof value === "object" ? value.type?.split("/").pop() : "";
    




  if (url && type !== "pdf") {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={url} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  if (type === "pdf") {
    return (
      <div className="relative flex items-center p-2 mt-2 rounded-md bg-background/10">
        <FileIcon className="h-10 w-10 fill-indigo-200 stroke-indigo-400" />
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-sm text-indigo-500 dark:text-indigo-400 hover:underline truncate w-52"
        >
          {url}
        </a>
        <button
          onClick={() => onChange("")}
          className="bg-rose-500 text-white p-1 rounded-full absolute -top-2 -right-2 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {

        if(res?.[0]) {
            const { url, type } = res[0];
            onChange({url, type});
        }
        
       
      }}
      onUploadError={(error: Error) => console.error(error.message)}
    />
  );
}