import React, { useState, useEffect } from 'react';
import BasicLayout, { SettingDrawer, PageContainer } from '@ant-design/pro-layout';

import { Outlet, Link } from 'react-router-dom';
import { menus } from '../config/menu';

import './index.css';

function LayoutApp(props) {
    const title = 'DST 管理后台'
    const [settings, setSettings] = useState({});

    const path =  window.location.pathname
    const [pathname, setPathname] = useState(path);

    useEffect(() => {
        //setPathname('/player');
    });

    return (
        <>
            <BasicLayout
                // siderWidth='200'
                logo='https://th.bing.com/th/id/OIP.dExFg3CLRkNgsES2jyoQVQHaHa?pid=ImgDet&rs=1'
                token={{
                    header: {
                        colorBgHeader: '#001529',
                        colorHeaderTitle: '#fff',
                        colorTextMenu: '#dfdfdf',
                        colorTextMenuSecondary: '#dfdfdf',
                        colorTextMenuSelected: '#fff',
                        colorBgMenuItemSelected: '#22272b',
                        colorTextRightActionsItem: '#dfdfdf',
                    },
                    sider: {
                        // colorMenuBackground: '#fff',
                        colorMenuItemDivider: '#dfdfdf',
                        colorTextMenu: '#595959',
                        colorTextMenuSelected: 'rgba(42,122,251,1)',
                        colorBgMenuItemSelected: 'rgba(230,243,254,1)',
                    },
                    // pageContainer: {
                    //     colorBgPageContainer: '#F0F2F5',
                    //     colorBgPageContainerFixed: '#F0F2F5'
                    // }

                }}
                {...settings}
                {...props}
                title={title}
                menuDataRender={() => menus}
                iconfontUrl="//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"

                // layout={'mix'}
                // contentWidth={'Fluid'}
                // fixSiderbar={'true'}
                // siderMenuType={'sub'}
                //面包屑
                // breadcrumbRender={(routers = []) => [
                //     {
                //         path: '/',
                //         breadcrumbName: '主页',
                //     },
                //     ...routers,
                // ]}

                // menuItemRender={(menuItemProps, defaultDom) => {
                //     <div
                //       onClick={() => {
                //         setPathname(menuItemProps.path || '/welcome');
                //       }}
                //     ></div>
                //     return <Link to={menuItemProps.path}>{defaultDom}</Link>;
                // }}
                location={{
                    pathname,
                }}
                menuItemRender={(item, dom) => (
                    <div
                        onClick={() => {
                            setPathname(item.path || '/');
                        }}
                    >
                        <Link to={item.path}>{dom}</Link>
                    </div>
                )}
            >

                <PageContainer>
                        <div><Outlet /></div>
                </PageContainer>
                <SettingDrawer enableDarkTheme settings={settings} onSettingChange={setSettings} />
            </BasicLayout>

        </>
    )
}

export default LayoutApp;
