import { StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState } from 'react';

import { Progress, Tooltip } from 'antd';

import dstLogo from '../../../assets/Dont_Starve_Together_Logo.png'

const imgStyle = {
    display: 'block',
    width: 42,
    height: 42,
};

function formatData(data, num) {
    return data.toFixed(num)
}

const { Statistic, Divider } = StatisticCard;
const GameStatistic = (props) => {

    const MB = 1024 * 1024 
    const GB = 1024 * MB

    const [responsive, setResponsive] = useState(false);

    const cpuUsage = formatData(props.data.cpu.cpuPercent || 0, 2);
    const memFree = formatData((props.data.mem.free || 0) / GB, 2) + ' GB';
    const memUsage = formatData(props.data.mem.usedPercent || 0, 2);

    const diskTotal = (props.data.disk.devices || []).map((item) => Number(item.total))
        .reduce((prev, curr) => !isNaN(Number(curr)) ? prev + curr : prev, 0) / 1024

    const diskFree = (props.data.disk.devices || []).map((item) => Number(item.total - (item.total * item.usage * 0.01)))
        .reduce((prev, curr) => !isNaN(Number(curr)) ? prev + curr : prev, 0) / 1024


    const diskUsage = formatData((diskTotal - diskFree) / diskTotal * 100, 2);

    const cavesPs = props.data.cavesPs;
    const masterPs = props.data.masterPs;

    const forestMem =formatData(masterPs.RSS / 1024, 2) 
    const cavesMem = formatData(cavesPs.RSS / 1024, 2) 
    const adminMem = formatData(props.data.memStates / 1024, 2)

    const dstMemTotal = formatData(parseInt(forestMem, 10) + parseInt(cavesMem, 10), 2)
    const dstVmemTotal = formatData( (parseInt(cavesPs.VSZ, 10) + parseInt(masterPs.VSZ, 10))/ 1024, 2)

    return (
        <>
            <RcResizeObserver key="resize-observer" onResize={(offset) => {
                setResponsive(offset.width < 596);
            }}>
                <StatisticCard.Group direction={responsive ? 'column' : 'row'}>


                    <StatisticCard
                        statistic={{
                            title: (<div>
                                <Tooltip placement="rightTop" style={{
                                    background: '#fff'
                                }} title={(<div>
                                    地面占用: {forestMem}MB<Progress percent={formatData(forestMem/(props.data.mem.total / 1024/1024)*100,2)} size="small" strokeColor={'#5BD171'} status="active" />
                                    洞穴占用: {cavesMem}MB<Progress percent={formatData(cavesMem/(props.data.mem.total / 1024/1024)*100,2)} size="small" status="active" />
                                    管理后台占用: {adminMem}MB<Progress percent={formatData(adminMem/(props.data.mem.total / 1024/1024)*100,2)} size="small" status="active" />
                                </div>)} >饥荒内存占用

                                </Tooltip>
                            </div>),
                            value: dstMemTotal + ' MB',
                            icon: (
                                <img
                                    style={imgStyle}
                                    src={dstLogo}
                                    alt="icon"
                                />
                            ),
                            description: (
                                <>
                                    <Statistic title="虚拟内存" value={dstVmemTotal + ' MB'} />
                                </>
                            ),
                        }}
                    />

                    <Divider type={responsive ? 'horizontal' : 'vertical'} />
                    <StatisticCard statistic={{
                        title: '内存剩余',
                        value: memFree,
                        description: <Statistic title="总内存" value={formatData(props.data.mem.total / 1024 / 1024 / 1024, 2) + ' GB'} />,
                    }} chart={
                        <>
                            <Progress type="circle" percent={memUsage} strokeColor={memUsage > 70 ? 'red' : '#5BD171'} status='normal' width={70} strokeLinecap="butt" strokeWidth={8} />
                        </>
                    } chartPlacement="left" />
                    <StatisticCard statistic={
                        {
                            title: 'CPU 使用',
                            value: cpuUsage + ' %',
                            description: <Statistic title="CPU核心数" value={props.data.cpu.cores} />,
                        }} chart={
                            <>
                                <Progress type="circle" percent={cpuUsage} strokeColor={cpuUsage > 70 ? 'red' : ''} status='normal' width={70} strokeLinecap="butt" strokeWidth={8} />
                            </>
                        } chartPlacement="left" />

                    <StatisticCard statistic={{
                        title: '磁盘剩余',
                        value: formatData(diskFree, 2) + ' GB',
                        description: <Statistic title="总存储" value={formatData(diskTotal, 2) + ' GB'} />,
                    }} chart={
                        <>
                            <Progress type="circle" percent={diskUsage} strokeColor={diskUsage > 90 ? 'red' : ''} status='normal' width={70} strokeLinecap="butt" strokeWidth={8} />
                        </>
                    } chartPlacement="left" />
                </StatisticCard.Group>
            </RcResizeObserver>
        </>
    )
}

export default GameStatistic