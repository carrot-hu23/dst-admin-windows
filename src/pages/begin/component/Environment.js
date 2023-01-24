import { LoadingOutlined } from '@ant-design/icons';
import { Spin, message, Popconfirm } from 'antd';

import { useState, useEffect } from 'react';
import { getGameDashboardApi } from '../../../api/gameDashboardApi';


const antIcon = (
    <LoadingOutlined
        style={{
            fontSize: 24,
        }}
        spin
    />
);

const Environment = () => {
    const [host, setHost] = useState({})
    const [checkLoading, setCheckLoading] = useState(true)
    const [intsalling, setIntsalling] = useState(false)

    const confirm = (e) => {
        console.log(e);
        message.success('Click on Yes');
        setIntsalling(true)
    };
    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };

    useEffect(() => {
        // const terminal = newTerminal(config, "", "environmentId")
        getGameDashboardApi()
            .then(reponse => {
                console.log(reponse.data.host)
                setCheckLoading(false)
                setHost(reponse.data.host)
            })
    }, [])

    return (
        <>

            {checkLoading && (
                <div>
                    <h3>正在检测当前服务器</h3>
                    <Spin indicator={antIcon} />
                </div>
            )
            }

            {!checkLoading && (
                <div>
                    <span>操作系统: {host.os}</span><br /><br />
                    <span>主机: {host.hostname}</span><br /><br />
                    <span>内核: {host.kernelArch}</span><br /><br />
                    <span>平台: {host.platform}</span><br /><br />
                </div>
            )
            }

            <Popconfirm
                title="安装centos 依赖"
                description="是否建立libcurl-gnutls.so.4软连接"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
            >
                <a href="#">CentOS需要建立libcurl-gnutls.so.4软连接</a>
            </Popconfirm>

            {intsalling && (
                <div>
                    <h4>正在安装</h4>
                    <Spin indicator={antIcon} />

                    {/* <div>
                        <Collapse>
                            <Panel header="查看详细" key="1">
                                <div id='environmentId'></div>
                            </Panel>
                        </Collapse>
                    </div> */}

                </div>
            )
            }
            {/* <div className="container-children" style={{ height: "100%", }}>
                <div id="environmentId" ></div>
            </div> */}
        </>
    )
}

export default Environment