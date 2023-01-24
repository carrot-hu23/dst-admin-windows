// import { Image, List } from 'antd';

const HomeOverView = (props) => {

    return (
        <>
        <div>
            {props.home.name}
            <br/>
            {props.home.desc}
            <br/>
            当前天数: {props.home.data.day} 天
        </div>
        </>
    )
}
export default HomeOverView;