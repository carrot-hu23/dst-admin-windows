import {
    cluster_ini_path,
    cluster_token_path,
    master_leveldataoverride_path,
    caves_leveldataoverride_path,
    modoverrides_path,
    master_modoverrides_path,
    caves_modoverrides_path,
    mods_setup_path
} from "./dstConfigApi";

const fs = window.require('fs')

function readFile(filePath, callback) {
    //读取文件
    fs.readFile(filePath, { encoding: 'utf-8' }, (err, res) => {
        console.log("err", err, "res", res)
        callback(err, res)
    })
}

function read_cluster_ini() {

    var data = fs.readFileSync(cluster_ini_path(), 'UTF-8')
    const lines = data.split(/\r?\n/);

    return lines

}

function read_cluster_token() {
    var data = fs.readFileSync(cluster_token_path())
    return data.toString()
}

function read_master_leveldataoverride() {
    var data = fs.readFileSync(master_leveldataoverride_path())
    return data.toString()
}

function read_caves_leveldataoverride() {
    var data = fs.readFileSync(caves_leveldataoverride_path())
    return data.toString()
}

function read_modoverrides() {
    var data = fs.readFileSync(modoverrides_path())
    return data.toString()
}

function parseClusterIni(data, homeConfig) {
    for (const line of data) {
        if (line.search('game_mode') !== -1) {
            const str = line.split('=')
            homeConfig.game_mode = str[1].trim() + ''
        }
        if (line.search('max_players') !== -1) {
            const str = line.split('=')
            homeConfig.max_players = parseInt(str[1].trim(), 10)
        }
        if (line.search('pvp') !== -1) {
            const str = line.split('=')
            homeConfig.pvp = (str[1].trim() === 'true')
        }
        if (line.search('pause_when_empty') !== -1) {
            const str = line.split('=')
            homeConfig.pause_when_empty = (str[1].trim() === 'true')
        }
        if (line.search('cluster_password') !== -1) {
            const str = line.split('=')
            homeConfig.cluster_password = str[1].trim()
        }
        if (line.search('cluster_description') !== -1) {
            const str = line.split('=')
            homeConfig.cluster_description = str[1].trim()
        }
        if (line.search('cluster_name') !== -1) {
            const str = line.split('=')
            homeConfig.cluster_name = str[1].trim()
        }
        if (line.search('cluster_language') !== -1) {
            const str = line.split('=')
            homeConfig.cluster_language = str[1].trim()
        }
        if (line.search('cluster_intention') !== -1) {
            const str = line.split('=')
            homeConfig.cluster_intention = str[1].trim()
        }
        if (line.search('max_snapshots') !== -1) {
            const str = line.split('=')
            homeConfig.max_snapshots = parseInt(str[1].trim(), 10)
        }
        if (line.search('vote_enabled') !== -1) {
            const str = line.split('=')
            homeConfig.vote_enabled = (str[1].trim() === 'true')
        }

    }
}

function getHomeConfigWindowApi() {
    const home_config = {}

    parseClusterIni(read_cluster_ini(), home_config)

    home_config.token = read_cluster_token()
    home_config.masterMapData = read_master_leveldataoverride()
    home_config.cavesMapData = read_caves_leveldataoverride()
    home_config.modData = read_modoverrides()

    return home_config
}

function write_cluster_ini(data) {
    let clusterIni = ''
    clusterIni += '[GAMEPLAY]' + '\n'
    clusterIni += 'game_mode = ' + data.game_mode + '\n'
    clusterIni += 'max_players = ' + data.max_players + '\n'
    clusterIni += 'pvp = ' + data.pvp + '\n'
    clusterIni += 'pause_when_empty = ' + data.pause_when_empty + '\n'
    clusterIni += 'vote_enabled = ' + data.vote_enabled + '\n'
    //投票踢人
    //vote_kick_enabled = false
    clusterIni += '\n'
    clusterIni += '\n'

    //#局域网游戏
    clusterIni += '[NETWORK]' + '\n'

    clusterIni += 'lan_only_cluster = false\n'
    clusterIni += 'cluster_intention = ' + data.cluster_intention + '\n'
    clusterIni += 'cluster_password = ' + data.cluster_password + '\n'
    clusterIni += 'cluster_description = ' + data.cluster_description + '\n'
    clusterIni += 'cluster_name = ' + data.cluster_name + '\n'

    // #离线服务器，只有局域网用户能加入，并且依赖所有Steam的任何功能都失效，比如礼物掉落
    // offline_cluster = false
    // #服务器语言
    clusterIni += 'cluster_language = zh' + '\n'
    clusterIni += 'whitelist_slots = 0' + '\n'
    //#每秒通信次数，越高体验越好，但是会增大服务负担
    clusterIni += 'tick_rate = 15' + '\n'
    clusterIni += '\n'
    clusterIni += '\n'

    clusterIni += '[MISC]' + '\n'
    clusterIni += 'console_enabled = true' + '\n'
    //#最大快照数量
    clusterIni += 'max_snapshots = 6' + '\n'
    clusterIni += '\n'
    clusterIni += '\n'

    clusterIni += '[SHARD]' + '\n'
    //#服务器共享，开启洞穴必须要开启这个
    clusterIni += 'shard_enabled = true' + '\n'
    //#服务器监听的地址，当所有实例都运行在同一台机器，可填写 127.0.0.1，会被server.ini 覆盖
    clusterIni += 'bind_ip = 127.0.0.1' + '\n'
    //#master 服务器的 IP，针对非 master 服务器，若与 master 服务器运行在同一台机器时，可填写 127.0.0.1，会被 server.ini 覆盖
    clusterIni += 'master_ip = 127.0.0.1' + '\n'
    //#监听 master 服务器的 UDP 端口，所有连接至 master 服务器的非 master 服务器必须相同
    clusterIni += 'master_port = 10888' + '\n'
    //#连接密码，每台服务器必须相同，会被server.ini 覆盖
    clusterIni += 'cluster_key = defaultPass' + '\n'
    clusterIni += '\n'
    clusterIni += '\n'

    clusterIni += '[STEAM]' + '\n'
    //# 只允许某 Steam 组的成员加入
    clusterIni += 'steam_group_only = false' + '\n'
    //# 指定某个 Steam 组，填写组 ID         
    clusterIni += 'steam_group_id = 0' + '\n'
    //# 开启后，Steam 组的管理员拥有服务器的管理权限            
    clusterIni += 'steam_group_admins = false' + '\n'
    clusterIni += '\n'

    const res = fs.writeFileSync(cluster_ini_path(), clusterIni, 'UTF-8')
    return res
}

function write_cluster_token(data) {
    const res = fs.writeFileSync(cluster_token_path(), data, 'UTF-8')
    return res
}

function write_master_leveldataoverride(data) {
    const res = fs.writeFileSync(master_leveldataoverride_path(), data, 'UTF-8')
    return res
}

function write_caves_leveldataoverride(data) {
    const res = fs.writeFileSync(caves_leveldataoverride_path(), data, 'UTF-8')
    return res
}

function write_modoverrides(data) {
    fs.writeFileSync(master_modoverrides_path(), data, 'UTF-8')
    fs.writeFileSync(caves_modoverrides_path(), data, 'UTF-8')
}

function write_mod_setup(mods) {
    const pattern = /workshop-\w[-\w+]*/g;
    let serverModSetup = ""
    const workshops = mods.match(pattern)
    if (workshops === undefined || workshops === null) {
        return
    }
    for (const workshop of workshops) {
        const split = workshop.split("-")
        const workshopId = split[1].trim()
        console.log('workshopId', workshopId);
        serverModSetup += 'ServerModSetup("' + workshopId + '")\n'
    }

    const res = fs.writeFileSync(mods_setup_path(), serverModSetup, 'UTF-8')
    return res
}

export {

    // cluster_ini_path,
    // cluster_token_path,
    // master_leveldataoverride_path,
    // caves_leveldataoverride_path,
    // modoverrides_path,

    readFile,
    read_cluster_ini,
    read_cluster_token,
    read_master_leveldataoverride,
    read_caves_leveldataoverride,
    read_modoverrides,
    getHomeConfigWindowApi,

    write_cluster_token,
    write_master_leveldataoverride,
    write_caves_leveldataoverride,
    write_modoverrides,
    write_mod_setup,
    write_cluster_ini,

    parseClusterIni
}