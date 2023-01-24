import LayoutApp from "../layout"
import { menus } from "../config/menu"

import Begin from "../pages/begin";

import { translateRoutes } from "../utils/routeUtils";

const temp = translateRoutes(menus)
console.log("menus: ",temp)

export const routes = [
    {
        path: '/',
        name: '首页',
        element: <LayoutApp />,
        children: temp
    },
    {
        path: '/begin',
        name: '开始',
        element: <Begin />,
        // children: temp
    },
]