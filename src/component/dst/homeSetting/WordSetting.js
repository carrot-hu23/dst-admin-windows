import { Space, Image, Select, Form, Row, Col } from 'antd';
import { useEffect } from 'react';

import { dstSetting } from '../../../config/dstSetting';

function formatName(name) {
    return name
}

const WordSettings = (props) => {
    // const wordSettingsData = dstSetting.forest.wordSettings.global.data
    const eventsData = dstSetting.forest.wordSettings.events.data
    const worldData = dstSetting.forest.wordSettings.world.data

    const [form] = Form.useForm();
    const overrides = props.overrides
    useEffect(() => {
        //console.log("overrides", overrides)
        form.setFieldsValue(overrides)
    })

    const getFields = (data) => {
        const children = [];
        for (let i = 0; i < data.length; i++) {
            children.push(
                <Col span={8} key={i}>
                    <Space align="start">
                        <div style={{
                            background: 'url(https://dst.liuyh.com/static/img/dstui/icon/inv_bg_beige.png) center center / 100% 100% no-repeat',
                            display: "inline-block",
                            width: 62,
                            height: 62
                        }}>
                            <Image preview={false} width={62} src={data[i].icon ? data[i].icon : 'https://dst.liuyh.com/static/img/dstui/icon/inv_bg_beige.png'} />
                        </div>

                        <Form.Item
                            name={formatName(data[i].lable)}
                            label={data[i].lable_cn}
                            style={{
                                marginBottom: '8px'
                            }}
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: 'Input something!',
                        //   },
                        // ]}
                        >
                            <Select
                                defaultValue={data[i].default.toLowerCase()}
                                // value={data[i].default.toLowerCase()}
                                style={{
                                    width: 120,
                                }}
                                options={
                                    data[i].list.map(item => {
                                        return {
                                            value: item.value.toLowerCase(),
                                            label: item.name
                                        }
                                    })
                                }
                            />
                        </Form.Item>
                    </Space>
                </Col>,
            );
        }
        return children;
    }

    return (
        (
            <>
                {/* <h1>{dstSetting.forest.wordSettings.global.name}</h1>
                <Form
                    layout={'vertical'}
                    labelAlign='left'
                    form={form}
                >
                    <Row gutter={24}>{getFields(wordSettingsData)}</Row>
                </Form> */}

                <h1>{dstSetting.forest.wordSettings.events.name}</h1>
                <Form
                    layout={'vertical'}
                    labelAlign='left'
                    form={form}
                >
                    <Row gutter={24}>{getFields(eventsData)}</Row>
                </Form>

                <h1>{dstSetting.forest.wordSettings.world.name}</h1>
                <Form
                    layout={'vertical'}
                    labelAlign='left'
                    form={form}
                >
                    <Row gutter={24}>{getFields(worldData)}</Row>
                </Form>


                <button onClick={() => console.log(form.getFieldValue())} />
            </>

        )
    )
};
export default WordSettings;