"use client"

import Image from 'next/image';
import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

import { convertFileToUrl } from "@/lib/utils";

type FileUploaderProps = {
    files: File[];
    onChange: (files: File[]) => void;
};

const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
        <Image src={convertFileToUrl(files[0])} alt="uploaded image" width={1000} height={1000} className='max-h-[400px] overflow-hidden object-cover'/>
      ) : (
        <>
            <Image src="/assets/icons/upload.svg" alt="upload" width={40} height={40}/>
            <div className='file-upload_label'>
                <p className='text-14-regular'>
                    <span className="text-green-500">Click to Upload</span>
                </p>
                <p>
                    SVG,PNG, JPG (max 800x400)
                </p>
            </div>
        </>      
      )}
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag n drop some files here, or click to select files</p>
      }
    </div>
  )
}

export default FileUploader;