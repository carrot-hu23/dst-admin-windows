
import { ProTable } from '@ant-design/pro-components';
import { useRef } from 'react';

import { Button, Modal, Image, Skeleton, Card } from 'antd';
import { dstHomeListApi, dstHomeDetailApi } from '../../api/dstApi';
// import { LockOutlined } from '@ant-design/icons';

import React, { useState } from 'react';

import HomeDetail from './component/HomeDetail';


const DstServerList = () => {
    const actionRef = useRef();

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    const [isModalOpen, setIsModalOpen] = useState(false);

    // 对话框的loading
    const [loading, setLoading] = useState(true);

    //房间信息
    const [homeInfo, setHomeInfo] = useState({});

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        setLoading(true)
    };

    const viewHomeDetail = (record) => {
        console.log(record.__rowId)
        console.log(record.region)

        setIsModalOpen(true);

        dstHomeDetailApi({
            rowId: record.__rowId,
            region: record.region
        }).then(response => {
            setLoading(false)
            const responseData = JSON.parse(response)
            var success = responseData.success
            if (success) {
                setHomeInfo(responseData)
                console.log(responseData.successinfo.players)
            }

        })
    }

    const columns = [
        {
            title: '房间名',
            dataIndex: 'name',
            key: 'name',
            copyable: true,
            ellipsis: true,

            // tip: '标题过长会自动收缩',
            // formItemProps: {
            //     rules: [
            //         {
            //             required: true,
            //             message: '此项为必填项',
            //         },
            //     ],
            // },
        },
        {
            title: '当前人数',
            key: 'maxconnections',
            render: (text, record, _, action) => (
                <div>{record.connected}/{record.maxconnections}
                    <Image
                        preview={false}
                        width={20}
                        src="https://dst.liuyh.com/static/img/dstui/icon/players.png"
                    />

                </div>
            ),
            sorter: (a, b) => b.connected - a.connected,
            align: 'right '
        },
        {
            title: '游戏模式',
            key: 'mode',
            render: (text, record, _, action) => (<div>{record.mode}</div>),
        },
        {
            title: '季节',
            key: 'season',
            dataIndex: 'season',
            render: (text, record, _, action) => (<div>
                {record.season === 'spring' && (
                    // <div>春季</div>
                    <Image
                        preview={false}
                        width={28}
                        src="https://dst.liuyh.com/static/img/dstui/icon/spring.png"
                    />
                )}
                {record.season === 'summer' && (
                    // <div>夏季</div>
                    <Image
                        preview={false}
                        width={28}
                        src="https://dst.liuyh.com/static/img/dstui/icon/summer.png"
                    />
                )}
                {record.season === 'autumn' && (
                    // <div>秋季</div>
                    <Image
                        preview={false}
                        width={28}
                        src="https://dst.liuyh.com/static/img/dstui/icon/autumn.png"
                    />
                )}
                {record.season === 'winter' && (
                    // <div>冬季</div>
                    <Image
                        preview={false}
                        width={28}
                        src="https://dst.liuyh.com/static/img/dstui/icon/winter.png"
                    />
                )}

            </div>),
        },
        {
            disable: true,
            title: '密码',
            key: 'password',
            dataIndex: 'password',
            filters: true,
            onFilter: true,
            ellipsis: true,
            valueType: 'select',
            valueEnum: {
                open: {
                    key: '1111',
                    text: '有密码',
                    status: '1',
                },
                closed: {
                    key: '1112',
                    text: '无密码',
                    status: '0',
                },
            },
            render: (text, record, _, action) => (<div>
                {record.password === 1 && (
                    <Image
                        preview={false}
                        width={28}
                        src="https://dst.liuyh.com/static/img/dstui/icon/password.png"
                    />

                    // <LockOutlined />
                )}
            </div>),
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (_, record) => [
                (<div>
                    <Button type="link" onClick={() => {
                        viewHomeDetail(record)
                    }} key={record.__rowId}>查看详情</Button>

                </div>)
            ],
        },
    ];


    return (
        <>
            <Modal
                getContainer={false}
                open={isModalOpen}
                footer={null}
                onOk={handleOk}
                onCancel={handleCancel}

            >
                <Skeleton title={true} loading={loading} active>
                    <Card
                        bordered={false}
                        style={{
                            overflowY: 'auto',
                            height: 500
                        }

                        }>
                        <HomeDetail home={homeInfo} />
                    </Card>
                </Skeleton>
            </Modal>

            <ProTable
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={async (params = {}, sort, filter) => {
                    console.log(sort, filter);
                    console.log('params', params)
                    const msg = await dstHomeListApi(params)
                    return {
                        data: msg.data,
                        success: true,
                        total: msg.total
                    };
                }}
                // editable={{
                //     type: 'multiple',
                // }}
                // columnsState={{
                //     persistenceKey: 'pro-table-singe-demos',
                //     persistenceType: 'localStorage',
                //     onChange(value) {
                //         console.log('value: ', value);
                //     },
                // }}
                rowKey="__rowId"
                // search={{
                //     labelWidth: 'auto',
                // }}
                // options={{
                //     setting: {
                //         listsHeight: 400,
                //     },
                // }}
                pagination={{
                    pageSize: 10,
                    onChange: (page) => console.log(page),
                }}
                // dateFormatter="string"
                headerTitle="饥荒服务器列表"
                toolBarRender={() => [
                    <Button key="button" type="primary" disabled={!hasSelected > 0}>
                        导出配置
                    </Button>,
                ]}
                rowSelection={{
                    type: 'radio',
                    ...rowSelection
                }}
                tableAlertRender={({ selectedRowKeys, selectedRows, onCleanSelected }) => false}
            />
        </>
    );

};

export default DstServerList