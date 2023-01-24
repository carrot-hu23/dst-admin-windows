// import React, { useState } from 'react';
import {
    Form,
    Input,
} from 'antd';

const { TextArea } = Input;

const HomeMod = (props) => {
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
            <Form.Item label="Mod 设置" name="modData">
                <TextArea rows={12} placeholder="请输入 Mod 设置" />
            </Form.Item>
        </Form>
    );
};
export default HomeMod;