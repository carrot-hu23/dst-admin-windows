
import { useState } from 'react';
import { StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { Divider } from 'antd';

import './index.css';


const BackupStatistic = (props) => {
    const [responsive, setResponsive] = useState(false);
    return (
        <>
            <RcResizeObserver key="resize-observer" onResize={(offset) => {
                setResponsive(offset.width < 596);
            }}>
                <StatisticCard.Group direction={responsive ? 'column' : 'row'}>
                    <StatisticCard statistic={{
                        title: '当前备份个数',
                        value: props.length,
                    }} />
                    <Divider type={responsive ? 'horizontal' : 'vertical'} />
                    <StatisticCard statistic={{
                        title: '备份大小',
                        value: props.size >= 1? props.size + 'GB': props.size * 1024 + 'MB',
                        // description: <Statistic title="占比" value="38.5%" />,
                    }} chart={
                        <>
                            {/* <Progress type="circle" percent={30} strokeColor={20 > 70 ? 'red' : '#5BD171'} status='normal' width={70} strokeLinecap="butt" strokeWidth={8} /> */}
                        </>
                    } chartPlacement="left" />
                </StatisticCard.Group>
            </RcResizeObserver>
        </>
    )
}

export default BackupStatistic