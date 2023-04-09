import { Select, Skeleton } from 'antd';
import { useEffect, useState } from 'react';
import { get_dst_home_info, readDstConfigSync, saveDstConfig } from '../../../api/window/dstConfigApi';



const SelectHome = () => {
    const [loading, setLoading] = useState(true)
    const [cluser, setCluser] = useState("Cluster_2")
    const [homeOptions, setHomeOptions] = useState([])

    useEffect(() => {
        setCluser(readDstConfigSync().cluster)
        const homeOptions = get_dst_home_info();
        setHomeOptions(homeOptions)
        setLoading(false)
    }, [])
    const onChange = (value) => {
        const config = readDstConfigSync()
        config.cluster = value
        saveDstConfig(config)
    };

    return (
        <Skeleton loading={loading} active>
            <Select
                showSearch
                placeholder="搜索房间"
                onChange={onChange}
                filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                }
                defaultValue={cluser}
                options={homeOptions}
            />
        </Skeleton>

    )
}

export default SelectHome