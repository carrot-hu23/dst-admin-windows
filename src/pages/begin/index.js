import { Button, } from 'antd';
import { useState } from 'react';

import Welcome from './component/Welcome';
import Environment from './component/Environment';

const mainCss = {
    textAlign: 'center',
    backgroundColor: '#fff',
    borderRadius: '20px',
    width: '400px',
    height: '350px',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
}

const Begin = () => {

    const [current, setCurrent] = useState(0);
    const next = () => {
        setCurrent(current + 1);
    };
    const prev = () => {
        setCurrent(current - 1);
    };

    return (
        <>
            <div style={mainCss}>
                {current < 1 && (
                    <Welcome />
                )}

                {current === 1 && (
                    <Environment />
                )}

                <br /><br />
                <Button type="primary" onClick={() => next()}>
                    下一步
                </Button>

                {current > 0 && (
                    <Button
                        style={{
                            margin: '0 8px',
                        }}
                        onClick={() => prev()}
                    >
                        上一步
                    </Button>
                )}
            </div>
        </>
    )
}

export default Begin