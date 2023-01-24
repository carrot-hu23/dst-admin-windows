function translateRoutes(routes) {

    if(!Array.isArray(routes) || routes.length < 1) {
        return null
    }

    return routes.map((item)=>{
        const hasChildren = Array.isArray(item.routes) && item.routes.length > 0;
        if(hasChildren) {
            return {
                path: item.path,
                name: item.name,
                element: item.element,
                children: translateRoutes(item.routes)
            }
        }
        return item
    })
}

export {translateRoutes}