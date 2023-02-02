// import React, { useState } from 'react';
import {
    Form,
    Input,
} from 'antd';

const { TextArea } = Input;

const Caves = (props) => {
    return (
        <Form
            form={props.form}
            labelCol={{
                span: 4,
            }}
            wrapperCol={{
                span: 18,
            }}
            layout="horizontal"
        >
            <Form.Item label="洞穴设置" name="cavesMapData">
                <TextArea rows={12} placeholder="请输入洞穴设置" />
            </Form.Item>
        </Form>
    );
};
export default Caves;