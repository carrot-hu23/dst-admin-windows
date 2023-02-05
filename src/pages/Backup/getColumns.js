import { Space, Button } from 'antd';

const getColumns = ({
    getColumnSearchProps,
    setIsEditModalOpen,
    setDeleteBackup,
    openBackupDir,
    setIsDeleteModalOpen
}) => {

    const columns = [
        {
            title: '存档名称',
            dataIndex: 'fileName',
            key: 'fileName',
            render: (text) => <Button type="link" >{text}</Button>,
            editable: true,
            ...getColumnSearchProps('fileName'),
        },
        {
            title: '文件大小',
            dataIndex: 'fileSize',
            key: 'fileSize',
            render: (fileSize) => <span>{(fileSize / 1024 / 1024).toFixed(2) + ' MB'}</span>,
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            valueType: 'dateTime',
        },
        {
            title: '操作',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => { console.log('111');
                    ;setIsEditModalOpen(true); setDeleteBackup(record) }}>修改</Button>
                    <Button type="link" onClick={() => { openBackupDir(record.fileName) }} >打开</Button>
                    <Button type="text" danger onClick={() => { setIsDeleteModalOpen(true); setDeleteBackup(record) }}>删除</Button>
                </Space>
            ),
        },
    ]

    return columns
}

export {
    getColumns
}