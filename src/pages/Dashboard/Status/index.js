import { Card, message, Button, Form, Space } from 'antd';
import { useEffect, useState } from 'react';

import { createBackupApi, openDir } from '../../../api/window/backupWindowsApi';

import { readDstConfigSync } from '../../../api/window/dstConfigApi';
import RestoreBackup from './restoreBackup';
import CleanArchive from './cleanArchive';
import SelectHome from './selectHome';

const cmd = window.require('node-cmd');

function launchDstMasterCmd() {
    const config = readDstConfigSync()
    let dstexe
    if (config.beta) {
        dstexe = window.require('path').join(config.force_install_dir+'BetaBranch', "bin64")
    } else {
        dstexe = window.require('path').join(config.force_install_dir, "bin64")
    }
    // if(config.mode === '2' || config.mode === 2) {
    //     dstexe = window.require('path').join(config.force_install_dir, "bin64")
    // }
    dstexe = window.require('path').join(config.force_install_dir, "bin64")
    const cluster = config.cluster
    const cmd = 'cd ' + dstexe + ' && Start "Master" dontstarve_dedicated_server_nullrenderer_x64.exe -console -cluster ' + cluster + ' -shard Master'
    console.log('master cmd', cmd);

    return cmd
}

function launchDstCavesCmd() {
    const config = readDstConfigSync()
    let dstexe
    if (config.beta) {
        dstexe = window.require('path').join(config.force_install_dir+'BetaBranch', "bin64")
    } else {
        dstexe = window.require('path').join(config.force_install_dir, "bin64")
    }
    // if(config.mode === '2' || config.mode === 2) {
    //     dstexe = window.require('path').join(config.force_install_dir, "bin64")
    // }
    dstexe = window.require('path').join(config.force_install_dir, "bin64")
    const cluster = config.cluster
    const cmd = 'cd ' + dstexe + ' && Start "Caves" dontstarve_dedicated_server_nullrenderer_x64.exe -console -cluster ' + cluster + ' -shard Caves'
    return cmd
}

function launchDstMaster() {
    const processRef = cmd.run(launchDstMasterCmd())
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
    const processRef = cmd.run(launchDstCavesCmd())
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
    const config = readDstConfigSync()
    let updateCommand
    if (config.beta) {
        updateCommand = 'Start steamcmd +login anonymous +force_install_dir ' + config.force_install_dir + 'BetaBranch +app_update 343050 -beta updatebeta validate +quit'
    } else {
        updateCommand = 'Start steamcmd +login anonymous +force_install_dir ' + config.force_install_dir + ' +app_update 343050 validate +quit'
    }
    // if(config.mode === '2' || config.mode === 2) {
    //     updateCommand = 'Start steamcmd +login anonymous +force_install_dir ' + config.force_install_dir + ' +app_update 343050 validate +quit'
    // }
    updateCommand = 'Start steamcmd +login anonymous +force_install_dir ' + config.force_install_dir + ' +app_update 343050 validate +quit'
    const command = 'cd ' + config.steamcmd + ' && ' + updateCommand
    console.log('uodate dst cmd', updateCommand);

    cmd.run(command, (err, data, stderr) => {
        callback(err, data, stderr)
    }
    );
}


const GameStatus = (props) => {

    const [updateGameStatus, setUpdateStatus] = useState(false)
    const [createBackupStatus, setCreateBackupStatus] = useState(false)
    const [mode, setMode] = useState(false)

    useEffect(() => {
        const dstConfig = readDstConfigSync()
        if (dstConfig.mode === 1) {
            setMode(true)
        }
    }, [])

    const launchOnClick = () => {
        launchDstMaster()
        launchDstCaves()
    }

    const updateGameOnclick = () => {
        message.success('正在更新游戏')
        setUpdateStatus(true)
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
        setCreateBackupStatus(true)
        message.success('正在创建游戏备份')
        createBackupApi("")
            .then(response => {
                message.success('创建游戏备份成功')
            })
            .catch(error => {
                console.log('error', error);
                message.error('创建游戏备份失败')

            })
            .finally(() => {
                setCreateBackupStatus(false)
            })
    }

    const openGameDir = () => {
        const config = readDstConfigSync()
        const dirPath = window.require('path').join(config.doNotStarveTogether, config.cluster)
        openDir(dirPath)
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
                    <Form.Item label="选择房间" >
                        <SelectHome />
                    </Form.Item>
                    <Form.Item label="饥荒状况">
                        <Space>
                            <Button
                                onClick={launchOnClick}
                                type='primary' >{'启动游戏'}
                            </Button>
                        </Space>
                    </Form.Item>

                    {mode && (<Form.Item label="更新游戏">
                        <Space>
                            <Button type="primary"
                                style={{
                                    // margin: '0 8px',
                                    background: '#8470FF',
                                    color: '#fff'
                                }}
                                onClick={() => { updateGameOnclick() }}
                                loading={updateGameStatus}
                            >
                                更新游戏
                            </Button>
                        </Space>
                    </Form.Item>)}

                    <Form.Item label="清理存档" >
                        <CleanArchive />
                    </Form.Item>

                    <Form.Item label="恢复备份">
                        <Space>
                            {/* <Button onClick={()=>setIsModalOpen(true)}>恢复备份</Button> */}
                            <RestoreBackup />
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
                    <Form.Item label="游戏位置" >
                        <Button
                            onClick={openGameDir}
                        >{'打开目录'}
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}

export default GameStatus