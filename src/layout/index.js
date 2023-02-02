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

                bgLayoutImgList={[
                    // {
                    //     src: 'https://cdn.forums.klei.com/public/style_images/klei/games/dont_starve/ds-ipb-bkg.jpg',
                    //     // left: 85,
                    //     // bottom: 100,
                    //     // height: '303px',
                    // },
                    // {
                    //     src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
                    //     bottom: -68,
                    //     right: -45,
                    //     height: '303px',
                    // },
                    // {
                    //     src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
                    //     bottom: 0,
                    //     left: 0,
                    //     width: '331px',
                    // },
                ]}
                {...settings}
                {...props}
                title={title}
                menuDataRender={() => menus}
                iconfontUrl="//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"

                // layout={'mix'}
                // contentWidth={'Fluid'}
                // fixSiderbar={'true'}
                // siderMenuType={'sub'}
                breadcrumbRender={(routers = []) => [
                    {
                        path: '/',
                        breadcrumbName: '主页',
                    },
                    ...routers,
                ]}

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
                // avatarProps={{
                //     src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
                //     size: 'small',
                //     title: (
                //         <Tittle />
                //     ),
                // }}
            >

                <PageContainer
                                // header={{
                                //     title: '',
                                // }}
                >
                    
                        <div><Outlet /></div>
                        {/* <Card></Card> */}

                    {/* <ProCard
                        style={{
                            height: '200vh',
                            minHeight: 800,
                        }}
                    >
                        <div><Outlet /></div>
                    </ProCard> */}
                </PageContainer>
                <SettingDrawer enableDarkTheme settings={settings} onSettingChange={setSettings} />
            </BasicLayout>

        </>
    )
}

export default LayoutApp;
