import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { useState, useRef } from 'react';
import styles from './index.less';
const { Dragger } = Upload;
const Home = () => {
    const [uploadList, setUploadList] = useState([]);
    const bool = useRef(true)

    const random = () => {
        return Math.floor(Math.random() * 3) + 1
    }

    const getCompressStatus = () => {
        const ran = random()
        return {
            a: {
                a: String(2),
                nowSize: ran === 2 ? '123' : null,
                newSize: ran === 2 ? '111' : null
            },
            b: {
                b: String(2),
                nowSize: ran === 2 ? '123' : null,
                newSize: ran === 2 ? '111' : null
            }
        }
    }

    const getStatus = async (list) => {
        let element = '2', nowSize = 0, oldSize = 0;
        const data = await getCompressStatus({ fileNames: list });
        if (data && Object.keys(data).length !== 0) {
            // console.log(data, 'data')
            for (const key in data) {
                // console.log(key, 'key')
                const params = data[key];
                // if (params && Object.keys(params).length !== 0) {
                //     for (const item in params) {
                        const ele = params[key];
                        if (ele === '2') {
                            if (params['nowSize'] && params['oldSize']) {
                                element = '2';
                                nowSize = params['nowSize'];
                                oldSize = params['oldSize']
                            }
                        }
                        console.log(key, params[key], params['nowSize'], params['oldSize'], 'item')
                        if (ele !== '2') {
                            element = ele;
                            nowSize = 0;
                            oldSize = 0;
                        }
                        // return { element, nowSize, oldSize }
                    }
                

            
        }
        return { element, nowSize, oldSize }
    }

    const handleStatus = async (list) => {
        console.log(list, 'iststi')
        if (_.isEmpty(list)) return;
        const lists = []
        for (let i = 0; i < list.length; i++) {
            const { response } = list[i];
            const res = await getStatus([response?.fileName])
            const { element, nowSize, oldSize } = res;
            console.log(element, nowSize, oldSize, 'element, nowSize, oldSize')
            if (element === '1') {
                list[i].percent = 100
                list[i].backgroundImg = '#0aa574'
                list[i].backgroundColor = '#3ee283'
                list[i].color = '#363a43'
                list[i].title = 'Compressing'
                list[i].isCompressed = false
                list[i].nowSize = 0
                list[i].oldSize = 0
            } else if (element === '2') {
                list[i].percent = 100
                list[i].backgroundColor = '#92ed14'
                list[i].color = '#363a43'
                list[i].title = 'Finshed'
                list[i].isCompressed = true
                list[i].nowSize = nowSize
                list[i].oldSize = oldSize
            } else {
                list[i].percent = 100
                list[i].backgroundColor = '#f94c00'
                list[i].color = '#fff'
                list[i].title = 'Could not upload file'
                list[i].isCompressed = false
                list[i].nowSize = 0
                list[i].oldSize = 0
            }
            lists.push(list[i])
        }

        setUploadList([...lists]);
        const flag = lists.every((item) => {
            return item?.isCompressed
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
            let flag = true;
            const arr = uploadList.filter((item) => file?.name === item?.name);
            if (!_.isEmpty(arr)) {
                flag = false;
            }
            return flag || Upload.LIST_IGNORE;
        },
        onChange: (info) => {
            const { file, fileList } = info;
            const { status, response, type, size } = file;
            let fileLists = [];
            let processInfo = {};
            let percent = 0;
            fileLists = fileList.map((item) => {
                const items = uploadList.find((param) => param.uid === item.uid)
                if (items && items?.percent === 100) {
                    percent = items?.percent;
                } else {
                    percent = item.percent;
                }
                if (status === 'uploading') {
                    percent = 33.33;
                    processInfo = {
                        backgroundImg: '#2bb6cd',
                        backgroundColor: '#48d9ea',
                        color: '#363a43',
                        title: 'Uploading',
                    }

                } else if (status === 'done' && response) {
                    percent = 66.66;
                    if (!(size / 1024 / 1024 / 5)) {
                        processInfo = {
                            backgroundColor: '#f94c00',
                            color: '#fff',
                            title: 'File is too long (max 5 MB)',
                        }
                    } else {
                        percent = 100;
                        processInfo = {
                            backgroundImg: '#0aa574',
                            backgroundColor: '#3ee283',
                            color: '#363a43',
                            title: 'Compressing',
                        }
                    }
                } else if (status === 'error') {
                    percent = 100;
                    processInfo = {
                        backgroundColor: '#f94c00',
                        color: '#fff',
                    }
                    if (type !== 'image/jpeg' || type !== 'image/png') {
                        processInfo.title = 'File type is not supported';

                    } else {
                        processInfo.title = 'Could not upload file';
                    }
                }
                return {
                    ...item,
                    percent,
                    ...processInfo,
                    isCompressed: false
                }
            })
            setUploadList([...fileLists])
            if (status === 'done' && response) {
                const flag = fileLists.every((item) => {
                    return item.percent === 99 || item.percent === 100
                })
                if (flag && bool.current) {
                    bool.current = false
                    handleStatus(fileLists)
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
                    {uploadList.map((item, index) => {
                        const { isCompressed, percent, response, name, size, nowSize, oldSize, backgroundColor, backgroundImage, color, title } = item;
                        const beforeSize = size / 1000 > 1024 ? `${parseFloat((size / 1000 / 1024).toFixed(1))}MB` : `${parseFloat((size / 1000).toFixed(1))}KB`;
                        let afterSize = '', compressRatio = '', ratioFlag = false;
                        if (nowSize && oldSize) {
                            if (nowSize / 1000 > 1024) {
                                afterSize = `${parseFloat((nowSize / 1000 / 1024).toFixed(1))}MB`;
                            } else {
                                afterSize = `${parseFloat((nowSize / 1000).toFixed(1))}KB`;
                            }
                            ratioFlag = oldSize - nowSize > 0;
                            compressRatio = ratioFlag ? `${Math.round((nowSize / oldSize - 1) * 100)}%` : '-0%';
                        }
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
                                            width: `${percent}%`,
                                            backgroundColor: `${backgroundColor}`,
                                            backgroundImage: isCompressed ? '' :
                                                `linear-gradient(135deg,${backgroundImage} 0%, ${backgroundImage} 25%, 
                                                    ${backgroundColor} 25%, ${backgroundColor} 50%,${backgroundImage} 50%,
                                                    ${backgroundImage} 75%, ${backgroundColor} 75%,${backgroundColor} 100%)`
                                        }}>
                                        {title}
                                    </div>
                                    {isCompressed && <div>
                                        <span>{afterSize}</span>
                                        <span>{compressRatio}</span>
                                    </div>}
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
};
export default Home;


