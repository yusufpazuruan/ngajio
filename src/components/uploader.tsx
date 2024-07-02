"use client"

import { UploadDropzone } from '@/lib/uploadthing';
import React from 'react'

export default function Uploader() {
  return (
    <div>
      <UploadDropzone
              endpoint="imageUploader"
              appearance={{
                button:
                  "ut-ready:bg-primary ut-uploading:cursor-not-allowed ut-uploading:bg-primary/90 rounded-md after:bg-primary/90 hover:bg-primary/90",
                container:
                  "w-full rounded-md border border-primary bg-background hover:bg-primary/10 hover:text-primary",
                allowedContent:
                  "flex h-8 flex-col items-center justify-center px-2 text-primary",
                uploadIcon: "text-primary hover:text-primary/90",
                label: "text-primary hover:text-primary/90",
              }}
              onClientUploadComplete={(res) => {
                // Do something with the response
                console.log("Files: ", res);
                alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
    </div>
  )
}

