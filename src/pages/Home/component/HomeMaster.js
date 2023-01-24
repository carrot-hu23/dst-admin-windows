// import React, { useState } from 'react';
import {
    Form,
    Input,
} from 'antd';
// import lodash from 'https://cdn.skypack.dev/lua-json';

const { TextArea } = Input;

const HomeMaster = (props) => {
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
            <Form.Item label="地面设置" name="masterMapData">
                <TextArea rows={12} placeholder="请输入地面设置" />
            </Form.Item>

        </Form>
    );
};
export default HomeMaster;

// const HomeSetting = () => {
//     return (
//         <div>房间设置表单</div>
//     )
// }

// export default HomeSetting