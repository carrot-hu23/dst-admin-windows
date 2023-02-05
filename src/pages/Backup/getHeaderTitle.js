import { Space, Button } from 'antd';

function getHeaderTitle({
    openBackupDir,
    deleteSelectBackup,
    updateBackupData
}) {
    const HeaderTitle = () => (
        <Space >
            <Button type="primary" onClick={() => { openBackupDir("/") }} >打开</Button>
            <Button type="primary" danger onClick={deleteSelectBackup} >删除</Button>
            <Button onClick={updateBackupData} >刷新</Button>
        </Space>

    )

    return HeaderTitle
}

export {
    getHeaderTitle
}