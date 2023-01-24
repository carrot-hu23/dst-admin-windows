import { http } from "../utils/http";

const dstHomeServerListUrl = "/api/dst/home/server"
const dstHomeServerDetailUrl = "/api/dst/home/server/detail"
const dstVersionAUrl = "/api/dst/version"

async function getHomeListApi(params) {
    // const url = '/dst/index/serverlist/getserverlist.html'

    const response = await http.post(dstHomeServerListUrl, {
        page: params.current,
        paginate: 10,
        sort_type: 'name',
        sort_way: 1,
        search_type: 1,
        search_content: params.name,
        mod: 1
    }, {
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    return response.data
}

export async function dstHomeListApi(params) {
    const response =  await getHomeListApi(params)
    const responseData = JSON.parse(response)
    let data = responseData.successinfo.data
    const homelist = data.map(value => {
        return {
            __rowId: value[0],
            clienthosted: value[1],
            dedicated: value[2],
            fo: value[3],
            kleiofficial: value[4],
            connected: value[5],
            maxconnections: value[6],
            intent: value[7],
            mode: value[8],
            mods: value[9],
            name: value[10],
            password: value[11],
            platform: value[12],
            pvp: value[13],
            season: value[14],
            clanonly: value[15],
            steamclanid: value[16],
            regionName: value[17],
            countryCode: value[18],
            isp: value[19],
            region: value[20]

        }
    })
    let temp = {
        data: homelist,
        total_count: responseData.successinfo.total_count,
        total: responseData.successinfo.total,
        per_page: responseData.successinfo.per_page,
        current_page: responseData.successinfo.current_page,
        last_page: responseData.successinfo.last_page,
        fetch_time_delta: responseData.successinfo.fetch_time_delta
    }
    console.log(temp);
    
    return temp
}

export async function dstHomeDetailApi(params) {
    // const url = '/dst/index/serverlist/getserverdetail.html'

    const response = await http.post(dstHomeServerDetailUrl, {
        rowId: params.rowId,
        region: params.region
    }, {
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    return response.data
}

export function getPlayer(response) {
    const success = response.success
    if(!success) {
        return []
    } else {
        return response.successinfo.players
    }
}

export async function dstHomePlayersApi(params) {
    // const url = '/dst/index/serverlist/getserverdetail.html'

    const response = await http.post(dstHomeDetailApi, {
        rowId: params.rowId,
        region: params.region
    }, {
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        }
    })
    return response.data
}

async function dstVersionApi() {
    // const url = '/version/getLocalVersion'
    const response = await http.get(dstVersionAUrl)
    return response.data
}


export {
    dstVersionApi
}