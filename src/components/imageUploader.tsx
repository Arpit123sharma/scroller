"use client";
import React, { useState } from "react";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";

interface fileUploadProps{
  onSuccess:(res:IKUploadResponse) => void;
  onProgress?:(progress:number) => void;
  fileType?: "image" | "video"
}

export default function FileUpload(
  {
    onSuccess,
    onProgress,
    fileType
  }:fileUploadProps

) {

  const[error,setError] = useState<string | null>(null);
  const[uploading,setUploading] = useState<boolean>(false);

  const handleError = (err:{message:string}) => {
    console.log("Error", err);
    setError(err.message)
    setUploading(false);

  };
  
  const handleSuccess = (res:IKUploadResponse) => {
    console.log("Success", res);
    setError(null);
    setUploading(false);
    onSuccess(res);
  };
  
  const handleProgress = (evt:ProgressEvent) => {
        if (evt. lengthComputable && onProgress) {
          const percentComplete = (evt. loaded / evt. total) * 100;
          onProgress (Math . round (percentComplete) ) ;
        };
  }

  const handleUploadStart = (evt:any) => {
    setUploading(true);
    setError(null);
  };

  const validateFile = (file:File) => {
    if(file.type === "video"){
        if(!file.type.startsWith("/video")){
          setError("video file is must be starts with /video")
          return false;
        }
        if(file.size > 100 * 1024 * 1024){
          setError("video file not more than 100mb's")
          return false;
        }
        return true;
    }else if(file.type === "image"){
      const imageType = ['image/png','image/jpeg','image/svg'];
      if(!imageType.includes(file.type)) {
        setError("give correct image formate")
        return false;
      }
      if(file.size > 5 * 1024 * 1024){
        setError("image file not more than 5mb's")
        return false;
      } 
      return true;
    }
    return false
  }
  return (
    <div className="App">
        <IKUpload
          fileName="test-upload.jpg"
          useUniqueFileName={true}
          validateFile={validateFile}
          folder={fileType === "video"?"/videos":"/images"}
          
          
          onError={handleError}
          onSuccess={handleSuccess}
          onUploadProgress={handleProgress}
          onUploadStart={handleUploadStart}
          transformation={{
            pre: "l-text,i-Imagekit,fs-50,l-end",
            post: [
              {
                type: "transformation",
                value: "w-100",
              },
            ],
          }}     
        />
        {uploading && (
          <div className="flex items-center text-sm gap-2 ">
            <Loader2 className="animate-spin w-4 h-4"/>
            <span>uploading...</span>
          </div>
        )}
        {error && (
          <div className="text-error text-sm">
            {error}
          </div>
        )}
    </div>
  );
}