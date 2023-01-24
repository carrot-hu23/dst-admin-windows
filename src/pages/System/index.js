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
                    // name="basic"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 18,
                    }}
                    // style={{
                    //     maxWidth: 600,
                    // }}
                    initialValues={{
                        // type: 1,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    // autoComplete="off"
                    layout="horizontal"
                    labelAlign={'left'}
                    form={form}
                >
                    <Form.Item label="安装方式" name="mode" onChange={onRadioChange}>
                        <Radio.Group >
                            <Radio key={1} value={1}>Steamcmd</Radio>
                            <Radio key={2} value={2}>Steam Don't Starve Together Dedicated server</Radio>
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
                    <Form.Item
                        label="服务器存档位置"
                        name="doNotStarveTogether"
                        rules={[
                            {
                                required: true,
                                message: 'Please input dontstarve_dedicated_server name',
                            },
                        ]}
                    >
                        <Input placeholder="服务器存档位置" />
                        {/* <TextArea rows={2} placeholder="服务器房间文件位置" /> */}
                    </Form.Item>

                    <Form.Item
                        label="服务器文件夹名"
                        name="cluster"
                        rules={[
                            {
                                required: true,
                                message: 'Please input dontstarve_dedicated_server name',
                            },
                        ]}
                    >
                        <Input placeholder="服务器文件夹名" />
                        {/* <TextArea rows={2} placeholder="服务器房间文件位置" /> */}
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