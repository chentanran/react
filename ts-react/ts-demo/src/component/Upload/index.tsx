import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { useState } from 'react';
import { clearTimeout } from 'timers';
import styles from './index.less';
const { Dragger } = Upload;
const Home = () => {
    const [uploadList, setUploadlist] = useState<any>([]);
    const [success, setSuccess] = useState<any>(false);
    const [perWidth, setPerWidth] = useState<any>('0%');
    const [processInfo, setProcessInfo] = useState<any>({});
    const [fileInfo, setFileInfo] = useState<any>({});

    let fileNames: any = [];
    const handleStatus = async (list: any) => {
        if (_.isEmpty(list)) return;
        let nameList: any = [];
        let timer: any;
        const data = await getCompressStatus({ fileNames: list });
        if (data && Object.keys(data).length !== 0) {
            for (const key in data) {
                const params = data[key];
                if (params && Object.keys(params).length !== 0) {
                    for (const item in params) {
                        const element = params[item];
                        if (element === '1') {
                            setSuccess(false);
                            setPerWidth('66.66%');
                            setProcessInfo({
                                backgroundImg: '#0aa574c9',
                                backgroundColor: '#3ee283',
                                color: '#363a43',
                                title: 'Compressing',
                            })
                            nameList.push(key);
                            timer = setTimeout(() => {
                                handleStatus(nameList);
                            }, 1000)
                        }
                        if (element === '2' && key === item) {
                            if (params['nowSize'] && params['oldSize']) {
                                setSuccess(true);
                                fileNames.push({
                                    backgroundImg: '#0aa574c9',
                                    backgroundColor: '#3ee283',
                                    color: '#363a43',
                                    title: 'Compressing',
                                    fileName: item,
                                    nowSize: params['nowSize'],
                                    oldSize: params['oldSize']
                                })
                            }
                            setFileInfo(fileNames);
                        }
                        if (element === '3') {
                            setSuccess(false);
                            clearTimeout(timer);
                            setProcessInfo({
                                backgroundImg: '',
                                backgroundColor: '#f94c00',
                                color: '#fff',
                                title: 'Could not upload file',
                            })
                        }
                    }
                }

            }
        }
    }


    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        beforeUpload: (file: any) => {
            let flag = true;
            const arr = uploadList.filter((item: any) => file?.name === item?.name);
            if (!_.isEmpty(arr)) {
                flag = false;
            }
            return flag || Upload.LIST_IGNORE;
        },
        onChange: (info: any) => {
            const { file, fileList } = info;
            const { status, response, type, size } = file;
            setUploadlist(fileList);
            let fileNames: any = []
            if (status === 'uploading') {
                setSuccess(false);
                setPerWidth('66.66%');
                setProcessInfo({
                    backgroundImg: '#3abbd0',
                    backgroundColor: '#48d9ea',
                    color: '#363a43',
                    title: 'Uploading',
                })
            } else if (status === 'done' && response) {
                setSuccess(false);
                setPerWidth('100%');
                const arr = fileList.filter((item: any) => item?.response && item?.percent === 100)
                fileNames = _.map(arr, (item: any) => { return item?.response?.fileName })
                if (!(size / 1024 / 1024 / 5)) {
                    setProcessInfo({
                        backgroundImg: '',
                        backgroundColor: '#f94c00',
                        title: 'File is too long (max 5 MB)',
                        color: '#fff',
                    })
                } else {
                    setProcessInfo({
                        backgroundImg: '#3abbd0',
                        backgroundColor: '#48d9ea',
                        color: '#363a43',
                        title: 'Uploading',
                    })
                    handleStatus(fileNames);
                }
            } else if (status === 'error') {
                setSuccess(false);
                setPerWidth('100%');
                if (type !== 'image/jpeg' || type !== 'image/png') {
                    setProcessInfo({
                        backgroundImg: '',
                        backgroundColor: '#f94c00',
                        color: '#fff',
                        title: 'File type is not supported',
                    })
                } else {
                    setProcessInfo({
                        backgroundImg: '',
                        backgroundColor: '#f94c00',
                        color: '#fff',
                        title: 'Could not upload file',
                    })
                }
            }
        }
    }

    return (
        <div>
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
            {!_.isEmpty(uploadList) &&
                <div>
                    {uploadList.map((item: any, index: any) => {
                        const { response, name, size, percent } = item;
                        const beforeSize = size / 1000 > 1024 ? `${parseFloat((size / 1000 / 1024).toFixed(1))}MB` : `${parseFloat((size / 1000).toFixed(1))}KB`;
                        if (_.isEmpty(fileInfo)) {
                            return (
                                <div>
                                    <div>
                                        {name}
                                        <span>{beforeSize}</span>
                                    </div>
                                    <div>
                                        <div
                                            className={styles.bar}
                                            style={{
                                                width: perWidth,
                                                backgroundColor: `${processInfo?.backgroundColor}`,
                                                backgroundImage: success ? '' :
                                                    `linear-gradient(135deg,${processInfo?.backgroundImage} 0%, ${processInfo?.backgroundImage} 25%, 
                                                    ${processInfo?.backgroundColor} 25%, ${processInfo?.backgroundColor} 50%,${processInfo?.backgroundImage} 50%,
                                                    ${processInfo?.backgroundImage} 75%, ${processInfo?.backgroundColor} 75%,${processInfo?.backgroundColor} 100%)`
                                            }}>
                                            {processInfo?.title}
                                        </div>
                                    </div>
                                </div>
                            )
                        } else {
                            
                        }
                    })}
                </div>

            }
        </div>
    )
};
export default Home;


