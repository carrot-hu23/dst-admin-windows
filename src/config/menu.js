import Home from "../pages/Home"
import DstServerList from "../pages/Dst";
import Dashboard from "../pages/Dashboard";
import System from "../pages/System";
import Backup from "../pages/Backup";

import {
    TeamOutlined, 
    SettingOutlined, 
    CloudSyncOutlined, 
    SmileOutlined,
    ExperimentOutlined,
    HomeOutlined ,
    DashboardOutlined
} from '@ant-design/icons';


export const menus = [
    // {
    //     path: '/',
    //     name: '首页',
    //     icon: <ProfileOutlined />,
    //     routes: [
    //         {
    //           path: '/dashboard',
    //           name: 'Dashboard',
    //           icon: <DashboardOutlined />,
    //           element: <Dashboard />,
    //         },
    //         // {
    //         //     path: '/controlPanel',
    //         //     name: '远程控制面板',
    //         //     element: <div>远程控制面板</div>,
    //         //     enable: false
    //         // },
    //       ],
    // },
    {
        path: '/dashboard',name: 'Dashboard',icon: <DashboardOutlined />, element: <Dashboard />,
    },
    {
        path: '/home',
        name: '房间设置',
        element: <Home />,
        icon: <HomeOutlined />,
    },
    {
        path: '/player', name: '玩家管理', element: <div>玩家管理2</div>, icon: <TeamOutlined />,
    },
    {
        path: '/backup', name: '游戏备份', element: <Backup />, icon: <CloudSyncOutlined />,
    },
    {
        path: '/setting', name: '系统设置', element: <System />, icon: <SettingOutlined />,
    },
    {
        path: '/help', name: '帮助文档', element: <div>README4</div>, icon: <SmileOutlined />,
    },
    {
        path: 'laboratory',
        name: '实验室',
        icon: <ExperimentOutlined />,
        component: <></>,
        routes: [
            {
              path: 'dst/server',
              name: '饥荒服务器列表',
              element: <DstServerList />
            },
          ],
        
    },
] 