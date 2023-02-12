import { Button, Popconfirm, message } from 'antd';
import { useState } from 'react';

const RegenerateWorld = () => {

    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const showPopconfirm = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setConfirmLoading(true);
        window.excDstCommand("Master c_regenerateworld()")
        //window.excDstCommand("Caves c_regenerateworld()")
        window.dstOp((event, arg)=>{
            console.log('c_regenerateworld()', arg)

            setOpen(false);
            setConfirmLoading(false);
            message.success("重置成功")
        })

        // setConfirmLoading(true);
        // setTimeout(() => {
        //     setOpen(false);
        //     setConfirmLoading(false);
        //     message.success("重置成功")
        // }, 2000);

    };
    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <Popconfirm
            title="是否重置世界"
            description="重置后将丢失数据，请做好备份"
            open={open}
            onConfirm={handleOk}
            okButtonProps={{
                loading: confirmLoading,
            }}
            onCancel={handleCancel}
        >
            <Button type="primary" danger
                onClick={showPopconfirm}
            >重置世界</Button>
        </Popconfirm>
    )
}

export default RegenerateWorld