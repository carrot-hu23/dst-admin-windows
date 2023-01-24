import Home from "../pages/Home"
import DstServerList from "../pages/Dst/DstServerList";
import Dashboard from "../pages/Dashboard";
import System from "../pages/System";

import Players from "../component/dst/Players";
import WordSettings from "../component/dst/homeSetting/WordSetting";

import { ProfileOutlined, 
    TeamOutlined, 
    SettingOutlined, 
    CloudSyncOutlined, 
    SmileOutlined,
    ExperimentOutlined,
    HomeOutlined ,
    DashboardOutlined
} from '@ant-design/icons';
//SyncOutlined

export const menus = [
    {
        path: '/',
        name: '首页',
        icon: <ProfileOutlined />,
        routes: [
            {
              path: '/dashboard',
              name: 'Dashboard',
              icon: <DashboardOutlined />,
              element: <Dashboard />,
            },
            // {
            //     path: '/controlPanel',
            //     name: '远程控制面板',
            //     element: <div>远程控制面板</div>,
            //     enable: false
            // },
          ],
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
        path: '/backup', name: '游戏备份', element: <div>游戏备份3</div>, icon: <CloudSyncOutlined />,
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
            {
                path: 'dst/player',
                name: '饥荒玩家列表',
                element: <Players />
            },
            {
                path: 'dst/setting',
                name: '饥荒森林世界设置',
                element: <WordSettings />
            }
          ],
        
    },
] 