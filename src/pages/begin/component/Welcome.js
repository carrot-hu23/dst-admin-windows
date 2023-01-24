import { Image } from 'antd';
import pig from '../../../assets/pig.gif'

const Welcome = () => {
    return (
        <>
            <h3>欢迎使用 DST 管理平台</h3>
            <div>
                <Image
                    width={200}
                    src={pig}
                />
            </div>
        </>
    )
}

export default Welcome