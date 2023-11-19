import React, { useState } from "react";
import { UploadButton } from "~/utils/uploadthing";
import { toast } from "./ui/use-toast";
import { LoadingSpinner } from "./loading";

type Props = {
  response: string;
  onChangeResponse: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const FileUpload = (props: Props) => {
  const [isUploading, setIsUploading] = useState(false);

  return (
    <main className="flex h-20 w-[142.222222222] flex-col items-center justify-between rounded border px-5 pb-2">
      <UploadButton
        className={isUploading ? "hidden" : ""}
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          setIsUploading(false);
          res.forEach((file) => {
            props.onChangeResponse({
              target: {
                value: file.url,
              },
            } as React.ChangeEvent<HTMLInputElement>);
          });
          toast({
            variant: "success",
            title: "File Uploaded",
            description: "Your file has been uploaded successfully!",
            duration: 5000,
          });
        }}
        onBeforeUploadBegin={(files: File[]) => {
          setIsUploading(true);
          return files;
        }}
      />
      <div
        className={
          isUploading
            ? "flex h-20 w-[142.222222222]  items-center justify-center"
            : "hidden"
        }
      >
        <LoadingSpinner />
      </div>
    </main>
  );
};

export default FileUpload;
