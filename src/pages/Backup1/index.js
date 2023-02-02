import { Space, Table, Upload, message, Divider, Button, Statistic } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const columns = [
    {
        title: '存档名称',
        dataIndex: 'fileName',
        key: 'fileName',
        render: (text) => <a>{text}</a>,
    },
    {
        title: '文件大小',
        dataIndex: 'fileSize',
        key: 'fileSize',
    },
    {
        title: '创建时间',
        dataIndex: 'createdDate',
        key: 'createdDate',
    },
    {
        title: '操作',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <a>修改</a>
                <Button type="text" danger>删除</Button>
            </Space>
        ),
    },
];
const data = [
    {
        key: '1',
        fileName: '这是一个测试房间n',
        fileSize: 32000,
        createdDate: 'New York No. 1 Lake Park',
    }
];



const buttonStyle = {
    margin: '0 8px',
    background: '#13CE66',
    color: '#fff',
    borderColor: '#13CE66'
}

const props = {
    // name: 'file',
    // action: (file)=>{
    //     console.log(typeof file);
    // },
    showUploadList: false,
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    customRequest(info) {
        console.log(info);

    }
};



const Backup = () => {

    const [selectionItem, setSelectionItems] = useState({})
    const [backupSize, setBackupSize] = useState(0)

    useEffect(()=>{
        setBackupSize(1.1)
    }, [])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows)
            setSelectionItems(selectedRows)
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    }

    const deleteSelectBackup = ()=> {
        const length = selectionItem.length
        if(length < 1) {
            message.warning("请选择存档")
            return
        }
        console.log('delete', selectionItem);
    }

    return (
        <>
            <Space wrap>
                <Button type="primary" danger onClick={deleteSelectBackup} >
                    删除
                </Button>
                <Upload {...props}>
                    <Button style={buttonStyle} icon={<UploadOutlined />}>上传</Button>
                </Upload>
                <div>存档存储: {backupSize} GB</div>
            </Space>
            <Divider />
            <Table
                columns={columns}
                dataSource={data}
                rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                }}
                pagination={{
                    position: ['none'],
                }}
            />
        </>
    )
};
export default Backup;