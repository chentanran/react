import { Upload, Progress } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { useState, useRef } from 'react';
const { Dragger } = Upload;
const Compress = () => {
    const bool = useRef(true)
    const [uploadList, setUploadlist] = useState([])

    const random = () => {
        return Math.floor(Math.random() * 3) + 1
    }

    const handleStatus = async (list) => {
        // console.log(list, 'list')
        const lists = list.map((item) => {
            return {
                ...item,
                percent: item.percent === 100 ? 100 : (random() === 2 ? 100 : item.percent)
            }
        })
        setUploadlist([...lists])
        const flag = lists.every((item) => {
            return item.percent === 100
        })
        if (flag) {
            bool.current = true
            return
        }
        setTimeout(() => {
            handleStatus(lists)
        }, 1000)
    }



    const props = {
        name: 'file',
        multiple: true,
        action: 'http://127.0.0.1:4523/mock/892595/upload',
        showUploadList: false,
        beforeUpload: (file) => {
        },
        onChange: (info) => {
            const { file, fileList } = info;
            const { status, response } = file;
            console.log(file, fileList, 'fileList')
            let fileLists = []
            fileLists = fileList.map((item) => {
                const items = uploadList.find((param) => param.uid === item.uid)
                return {
                    ...item,
                    percent: (items && items.percent === 100) ? items.percent : item.percent - 1
                }
            })
            setUploadlist([...fileLists])
            if (status === 'uploading') {

            } else if (status === 'done' && response) {
                const flag = fileLists.every((item) => {
                    return item.percent === 99 || item.percent === 100
                })
                if (flag && bool.current) {
                    bool.current = false
                    handleStatus(fileLists)
                }
            } else if (status === 'error') {

            }
        }
    }

    return (
        <div style={{ padding: 10 }}>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                </p>
            </Dragger>
            {
                uploadList.map((item) => {
                    return <>
                        <Progress percent={item.percent} />
                    </>
                })
            }

        </div>
    )
};
export default Compress;