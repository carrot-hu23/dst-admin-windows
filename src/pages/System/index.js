import { Button, Radio, Form, Input, Card, message } from 'antd';

import { useEffect, useState } from 'react';

import { readDstConfigSync, writeDstConfigSync } from '../../api/window/dstConfigApi';

const onFinishFailed = (errorInfo) => {
    message.error("保存配置失败")
    console.log('Failed:', errorInfo);
};

const System = () => {

    const [choose, setChoose] = useState(1);
    const onRadioChange = (e) => {
        setChoose(e.target.value);
    };

    const [form] = Form.useForm();
    const setConfig = () => {
        //获取配置文件
        const data = readDstConfigSync()

        form.setFieldsValue(data)
        setChoose(data.mode + "")
    }

    useEffect(() => {
        setConfig()
    }, [])

    const saveConfig = (values)=>{
        let config = ''
        config += 'mode=' + values.mode + '\n'
        if (values.steamcmd !== undefined || values.steamcmd != null) {
            config += 'steamcmd=' + values.steamcmd + '\n'
        }
        config += 'force_install_dir=' + values.force_install_dir + '\n'
        config += 'doNotStarveTogether=' + values.doNotStarveTogether + '\n'
        config += 'cluster=' + values.cluster + '\n'
        config += 'backupPath=' + values.backupPath + '\n'
        config += 'beta=' + values.beta + '\n'
        writeDstConfigSync(config)
    }

    const onFinish = (values) => {

        saveConfig(values)

        message.success("保存配置成功")
        //console.log('Success:', values);
        setConfig()
    };

    return (
        <>
            <Card>
                <br />
                <Form
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    initialValues={{
                       backupPath: 'C:\\dst\\'
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="horizontal"
                    labelAlign={'left'}
                    form={form}
                >
                    <Form.Item label="启动方式" name="mode" onChange={onRadioChange}>
                        <Radio.Group >
                            <Radio key={1} value={1}>Steamcmd</Radio>
                            <Radio key={2} value={2}>Steam</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item label="类型" name="beta">
                        <Radio.Group >
                            <Radio key={1} value={0}>正式服</Radio>
                            <Radio key={2} value={1}>测试服</Radio>
                        </Radio.Group>
                    </Form.Item>
                    {choose === '1' && (
                        <Form.Item
                            label="steamcmd安装路径"
                            name="steamcmd"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input steam cmd install path',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                    )}

                    <Form.Item
                        label="饥荒服务器安装路径"
                        name="force_install_dir"
                        rules={[
                            {
                                required: true,
                                message: 'Please input dontstarve_dedicated_server_nullrenderer.exe path',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    {/* <Form.Item
                        label="服务器存档位置"
                        name="doNotStarveTogether"
                        tooltip="饥荒服务器房间的位置（\Documents\Klei\DoNotStarveTogether）"
                        rules={[
                            {
                                required: true,
                                message: 'Please input dontstarve_dedicated_server name',
                            },
                        ]}
                    >
                        <Input placeholder="服务器存档位置" />
                    </Form.Item> */}

                    <Form.Item
                        label="服务器文件夹名"
                        name="cluster"
                        tooltip="要启用哪个档的文件名"
                        rules={[
                            {
                                required: true,
                                message: 'Please input dontstarve_dedicated_server name',
                            },
                        ]}
                    >
                        <Input placeholder="服务器文件夹名" />
                    </Form.Item>

                    <Form.Item
                        label="游戏备份存放位置"
                        name="backupPath"
                        tooltip="默认存放在 C:/dst/backup/ 目录下"
                    >
                        <Input placeholder="游戏备份存放位置" />
                    </Form.Item>

                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            保存
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}

export default System