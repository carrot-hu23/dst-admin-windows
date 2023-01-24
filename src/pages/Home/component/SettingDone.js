import React from 'react';
// import { Form } from 'antd';
import lodash from 'lua-json';
import WordSettings from '../../../component/dst/homeSetting/WordSetting';

const Done = (props) => {
  const value = props.form.getFieldValue()  
  const master = lodash.parse(value['masterMapData'])
  //console.log('master', master);
  
  //const [form] = Form.useForm({});

  //console.log("11111111111",form)
  return (
    <>
    <WordSettings overrides={master.overrides}/>
    </>
  )
}
export default Done;