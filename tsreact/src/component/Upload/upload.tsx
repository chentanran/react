import React, { ChangeEvent, FC, useRef, useState } from 'react'
import axios from 'axios'
import Button from '../Button/button'
import UploadList from './uploadList'
import Dragger from './dragger'

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
  uid: string;
  name: string;
  size: number;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}

export interface UploadProps {
  action: string;
  defaultFileList?: UploadFile[];
  onProgress?: (precentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onChange?: (file: File) => void;
  onRemove?: (file: UploadFile) => void;
  headers?: {[key: string]: any};
  name?: string;
  data?: {[key: string]: any};
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  drag?: boolean;
}

export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    onProgress,
    onSuccess,
    onError,
    beforeUpload,
    onChange,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    drag,
    children
  } = props

  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])

  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }

  const handleRemove = (file: UploadFile) => {
    setFileList(prevList => {
      return prevList.filter(item => item.uid !== file.uid)
    })

    if (onRemove) {
      onRemove(file)
    }
  }

  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click()
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return
    }
    uploadFiles(files)
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files)
    postFiles.forEach(file => {
      if (beforeUpload) {
        const result = beforeUpload(file)
        if (result && result instanceof Promise) {
          result.then(res => {
            openFile(res)
          })
        } else if (result) {
          openFile(file)
        }
      } else {
        openFile(file)
      }
      
    })
  }

  const openFile = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }

    // setFileList([_file, ...fileList])
    setFileList(prevList => {
      return [_file, ...prevList]
    })

    const formData = new FormData()
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(name || 'file', file)
      })
    }
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (e) => {
        let percentage = Math.round((e.loader * 100) / e.total) || 0
        if (percentage < 100) {

          updateFileList(_file, { percent: percentage, status: 'uploading' })

          if (onProgress) {
            onProgress(percentage, file)
          }
        }
      }
    }).then(resp => {
      // console.log(resp, 'data')

      updateFileList(_file, {status: 'success', response: resp.data})
      console.log(fileList, 'fileList')

      if (onSuccess) {
        onSuccess(resp.data, file)
      }
      if (onChange) {
        onChange(file)
      }
    }).catch(err => {
      // console.log(err, 'err')

      updateFileList(_file, {status: 'error', error: err})

      if (onError) {
        onError(err, file)
      }
      if (onChange) {
        onChange(file)
      }
    })
  }

  return (
    <div
      className="viking-upload-component"
    >
      {/* <Button
        onClick={handleClick}
      >
        upload
      </Button> */}
      <div className="viking-upload-input"
        style={{display: 'inline-block'}}
        onClick={handleClick}>
          {drag ? 
            <Dragger onFile={(files) => {uploadFiles(files)}}>
              {children}
            </Dragger>:
            children
          }
        <input 
          type="file"
          className="viking-file-input"
          style={{display: 'none'}}
          ref={fileInput}
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
        />
      </div>
      {/* /// */}
      <UploadList 
        fileList={fileList}
        onRemove={(item) => {handleRemove(item)}}
      />
    </div>
  )
}

Upload.defaultProps = {
  name: 'file'
}

export default Upload