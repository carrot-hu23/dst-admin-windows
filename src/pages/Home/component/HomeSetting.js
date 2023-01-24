// import React, { useState } from 'react';
import {
  Form,
  Input,
  InputNumber,
  Switch,
  Radio,
  Tooltip
} from 'antd';

import { dstGameMod } from '../../../utils/dst';


const { TextArea } = Input;


const HomeSetting = (props) => {

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
      initialValues={{
        pvp: false,
        vote_enabled: true,
        max_players: 6
      }}
    >
      <Form.Item
        label="房间名称"
        name='cluster_name'
        rules={[
          {
            required: true,
            message: '请输入房间名',
          },
        ]}>
        <Input
          placeholder="请输入房间名称"
          // style={{
          //   width: '60%',
          // }}
          allowClear
        />
      </Form.Item>
      <Form.Item label="房间描述" name='cluster_description'>
        <TextArea rows={4} placeholder="请输入房间描述" maxLength={200} />
      </Form.Item>
      <Form.Item label="游戏模式" name='game_mode'>
          <Radio.Group>
          {dstGameMod.map(item =>  <Tooltip title={item.description}><Radio key={item.name} value={item.name}> {item.cn} </Radio></Tooltip>)}
          </Radio.Group>
        </Form.Item>

      {/* <Form.Item label="游戏模式" name='gameMode'>
        <Select style={{
          width: '30%',
        }}>
          {dstGameMod.map(item => <Select.Option value={item.name}>{item.cn}</Select.Option>)}
        </Select>
      </Form.Item> */}
      <Form.Item label="玩家人数" tooltip="最大玩家数量" name='max_players' >
        <InputNumber />
      </Form.Item>
      <Form.Item label="pvp" valuePropName="checked" tooltip="是否开启玩家对战" name='pvp'>
        <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
      </Form.Item>
      <Form.Item label="投票" valuePropName="checked" tooltip="是否开启世界投票功能，关闭后世界不能投票" name='vote_enabled'>
        <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
      </Form.Item>
      <Form.Item label="自动暂停" valuePropName="checked" tooltip="无人时世界自动暂停" name='pause_when_nobody'>
        <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
      </Form.Item>

      <Form.Item label="房间密码" name='cluster_password'>
        <Input.Password placeholder="最大长度20" maxLength={20} />
      </Form.Item>
      <Form.Item
        label="令牌"
        name='token'
        rules={[
          {
            required: true,
            message: '请输入令牌',
          },
        ]}>
        <TextArea rows={2} placeholder="科雷token令牌" maxLength={200} />
      </Form.Item>
    </Form>
  );
};
export default HomeSetting;