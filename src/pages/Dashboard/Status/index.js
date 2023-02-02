
import { Card, message } from 'antd';
// import React, { useState } from 'react';
import {
    Button,
    Form,
    Space
} from 'antd';

import { DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

import { createBackupApi } from '../../../api/backupApi';

import { readDstConfigSync } from '../../../api/window/dstConfigApi';


const force_install_dir = readDstConfigSync().force_install_dir
const dstexe = readDstConfigSync().force_install_dir + 'bin64\\'
const cluster = readDstConfigSync().cluster
// const doNotStarveTogether = readDstConfigSync().doNotStarveTogether
const steamcmd = readDstConfigSync().steamcmd

const cmd = window.require('node-cmd');

function launchDstMaster() {
    const processRef = cmd.run('cd ' + dstexe + ' && Start "Master" dontstarve_dedicated_server_nullrenderer_x64.exe -console -cluster ' + cluster + ' -shard Master')
    let data_line = '';

    //listen to the python terminal output
    processRef.stdout.on(
        'data',
        function (data) {
            data_line += data;
            if (data_line[data_line.length - 1] === '\n') {
                console.log(data_line);
            }
        }
    )
}

function launchDstCaves() {
    const processRef = cmd.run('cd ' + dstexe + ' && Start "Caves" dontstarve_dedicated_server_nullrenderer_x64.exe -console -cluster ' + cluster + ' -shard Caves')
    let data_line = '';

    //listen to the python terminal output
    processRef.stdout.on(
        'data',
        function (data) {
            data_line += data;
            if (data_line[data_line.length - 1] === '\n') {
                console.log(data_line);
            }
        }
    )
}

function updateDst(callback) {
    const updateCommand = 'Start steamcmd +login anonymous +force_install_dir ' + force_install_dir + ' +app_update 343050 validate +quit'
    const command = 'cd ' + steamcmd + ' && ' + updateCommand

    cmd.run(command, (err, data, stderr) => {
        callback(err, data, stderr)
    }
    );
}

let status = false
console.log('status', status);

const GameStatus = (props) => {

    const [updateGameStatus, setUpdateStatus] = useState(false)
    const [createBackupStatus, setCreateBackupStatus] = useState(false)
    // const [runningStatus, setRunningStatus] = useState(status)

    const [mode, setMode] = useState(false)

    useEffect(() => {
        const dstConfig = readDstConfigSync()
        if (dstConfig.mode === 1) {
            setMode(true)
        }
    }, [])

    const launchOnClick = () => {
        // setRunningStatus(true)
        status = !status

        launchDstMaster()
        launchDstCaves()
    }

    const updateGameOnclick = () => {
        message.success('正在更新游戏')
        updateDst((err, data, stderr) => {
            if (err !== null) {
                message.error('饥荒更新失败')
            } else {
                message.success('饥荒更新完成')
            }
            setUpdateStatus(false)
            console.log('update dst', 'err', err, 'data', data, 'stderr', stderr)
        })
    }

    const createBackupOnClick = () => {

        message.success('正在创建游戏备份')
        createBackupApi()
            .then(response => {
                message.success('创建游戏备份成功')
                setCreateBackupStatus(false)
            })
            .catch(error => {
                message.error('创建游戏备份失败')
                setCreateBackupStatus(false)
            })
    }

    return (
        <>
            <Card
                title="游戏状况"
                bordered={false}
            >
                <Form
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="horizontal"
                    labelAlign={'left'}
                >
                    <Form.Item label="饥荒状况">
                        <Space>
                            <Button
                                onClick={launchOnClick}
                                type='primary' >{'启动游戏'}
                            </Button>
                        </Space>
                    </Form.Item>

                    {mode && (<Form.Item label="快捷操作">
                        <Space>
                            <Button type="primary"
                                onClick={() => { updateGameOnclick() }}
                                loading={updateGameStatus}
                            >
                                更新游戏
                            </Button>
                        </Space>
                    </Form.Item>)}

                    <Form.Item label="清理游戏存档" >
                        <Button type="primary" danger icon={<DeleteOutlined />}>清理</Button>
                    </Form.Item>

                    <Form.Item label="恢复游戏备份">
                        <Space>
                            <Button>恢复备份</Button>
                            <Button style={{
                                margin: '0 8px',
                                background: '#13CE66',
                                color: '#fff'
                            }}
                                onClick={() => { createBackupOnClick() }}
                                loading={createBackupStatus}
                            >
                                创建备份
                            </Button>
                        </Space>

                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}

export default GameStatus