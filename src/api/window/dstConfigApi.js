import { parseClusterIni } from "./gameWindowsApi";

const fs = window.require('fs')
const path = window.require('path');

const configPath = './dst_config'

function writeDstConfigSync(data) {

    const file = readDstConfigSync()
    const steamcmd = file.steamcmd
    console.log(data);
    
    if(data.search('steamcmd=') === -1) {        
        data += 'steamcmd='+steamcmd+'\n'
    }

    const res =  fs.writeFileSync(configPath, data, 'UTF-8')
    return res
}

function readDstConfigSync() {
    var data = fs.readFileSync(configPath, 'UTF-8')
    return parseConfig(data)
}

function parseConfig(res) {
    const lines = res.split(/\r?\n/);
    let result = {}
    for (let line of lines) {
        const str = line.split('=')
        if (str[0].trim() === 'mode') {
            result.mode = parseInt(str[1],10)
        }
        if (str[0].trim() === 'steamcmd') {
            result.steamcmd = str[1]
        }
        if (str[0].trim() === 'doNotStarveTogether') {
            result.doNotStarveTogether = str[1]
        }
        if (str[0].trim() === 'cluster') {
            result.cluster = str[1]
        }
        if (str[0].trim() === 'force_install_dir') {
            result.force_install_dir = str[1]
        }
        if (str[0].trim() === 'backupPath') {
            result.backupPath = str[1]
        }
        if (str[0].trim() === 'beta') {
            result.beta = parseInt(str[1],10)
        }
    }
    if(result.beta === undefined || result.beta === '') {
        result.beta = 0
    }
    if(result.cluster === undefined || result.cluster === '') {
        result.beta = "Cluster_1"
    }
    const dst_base_path = path.join(window.process.env.USERPROFILE + "", "Documents","Klei","DoNotStarveTogether")
    result.doNotStarveTogether = dst_base_path
    return result
}

function getDstConfig(callback) {

    fs.readFile(configPath, { encoding: 'utf-8' }, (err, res) => {
        console.log("err", err, "res", res)
        let data = {}
        if (err === null) {
            data = parseConfig(res)
        }
        callback(err, data)
    })
}

function cluster_ini_path() {
    const config = readDstConfigSync()
    let dst_base_path
    if(config.beta) {
        dst_base_path = path.join(window.process.env.USERPROFILE + "", "Documents","Klei","DoNotStarveTogetherBetaBranch",config.cluster)
    } else {
        dst_base_path = path.join(window.process.env.USERPROFILE + "", "Documents","Klei","DoNotStarveTogether",config.cluster)
    }
    const cluster_ini_path = path.join(dst_base_path, "cluster.ini")
    return cluster_ini_path
}

function cluster_token_path() {
    const config = readDstConfigSync()
    let dst_base_path
    if(config.beta) {
        dst_base_path = path.join(window.process.env.USERPROFILE + "", "Documents","Klei","DoNotStarveTogetherBetaBranch",config.cluster)
    } else {
        dst_base_path = path.join(window.process.env.USERPROFILE + "", "Documents","Klei","DoNotStarveTogether",config.cluster)
    }
    const cluster_token_path = path.join(dst_base_path, "cluster_token.txt")
    return cluster_token_path
}

function master_leveldataoverride_path() {
    const config = readDstConfigSync()
    let dst_base_path
    if(config.beta) {
        dst_base_path = path.join(window.process.env.USERPROFILE + "", "Documents","Klei","DoNotStarveTogetherBetaBranch",config.cluster)
    } else {
        dst_base_path = path.join(window.process.env.USERPROFILE + "", "Documents","Klei","DoNotStarveTogether",config.cluster)
    }
    const master_leveldataoverride_path = path.join(dst_base_path, "Master", "leveldataoverride.lua")
    return master_leveldataoverride_path
}

function caves_leveldataoverride_path() {
    const config = readDstConfigSync()
    let dst_base_path
    if(config.beta) {
        dst_base_path = path.join(window.process.env.USERPROFILE + "", "Documents","Klei","DoNotStarveTogetherBetaBranch",config.cluster)
    } else {
        dst_base_path = path.join(window.process.env.USERPROFILE + "", "Documents","Klei","DoNotStarveTogether",config.cluster)
    }
    const caves_leveldataoverride_path = path.join(dst_base_path, "Caves", "leveldataoverride.lua")
    return caves_leveldataoverride_path
}

function modoverrides_path() {
    const config = readDstConfigSync()
    let dst_base_path
    if(config.beta) {
        dst_base_path = path.join(window.process.env.USERPROFILE + "", "Documents","Klei","DoNotStarveTogetherBetaBranch",config.cluster)
    } else {
        dst_base_path = path.join(window.process.env.USERPROFILE + "", "Documents","Klei","DoNotStarveTogether",config.cluster)
    }
    const modoverrides_path = path.join(dst_base_path, "Master", "modoverrides.lua")
    return modoverrides_path
}

function master_modoverrides_path() {
    const config = readDstConfigSync()
    let dst_base_path
    if(config.beta) {
        dst_base_path = path.join(window.process.env.USERPROFILE + "", "Documents","Klei","DoNotStarveTogetherBetaBranch",config.cluster)
    } else {
        dst_base_path = path.join(window.process.env.USERPROFILE + "", "Documents","Klei","DoNotStarveTogether",config.cluster)
    }
    const master_modoverrides_path = path.join(dst_base_path, "Master", "modoverrides.lua")
    return master_modoverrides_path
}

function caves_modoverrides_path() {
    const config = readDstConfigSync()
    let dst_base_path
    if(config.beta) {
        dst_base_path = path.join(window.process.env.USERPROFILE + "", "Documents","Klei","DoNotStarveTogetherBetaBranch",config.cluster)
    } else {
        dst_base_path = path.join(window.process.env.USERPROFILE + "", "Documents","Klei","DoNotStarveTogether",config.cluster)
    }
    const caves_modoverrides_path = path.join(dst_base_path, "Caves", "modoverrides.lua")
    return caves_modoverrides_path
}

function mods_setup_path() {
    const config = readDstConfigSync()
    const mods_setup_path = path.join(config.force_install_dir, "mods", "dedicated_server_mods_setup.lua")
    return mods_setup_path
}

function get_dst_home_info() {
    const config = readDstConfigSync()
    let dst_base_path
    if(config.beta) {
        dst_base_path = path.join(window.process.env.USERPROFILE + "", "Documents","Klei","DoNotStarveTogetherBetaBranch")
    } else {
        dst_base_path = path.join(window.process.env.USERPROFILE + "", "Documents","Klei","DoNotStarveTogether")
    }

    const homeDir = fs.readdirSync(dst_base_path)
    return homeDir.map(dir => {
        const home_file = fs.statSync(path.join(dst_base_path, dir))
        if(home_file.isDirectory()) {
            const homeConfig = {}
            const cluster_path = path.join(dst_base_path, dir, "cluster.ini")
            if(fs.existsSync(cluster_path)) {
                var data = fs.readFileSync(path.join(dst_base_path, dir, "cluster.ini"), 'UTF-8')
                const lines = data.split(/\r?\n/);
                parseClusterIni(lines, homeConfig)
                return {label: homeConfig.cluster_name, value: dir}
            }
        }
        return {}
    }).filter(item=> item.label !== undefined);

}

const saveDstConfig = (values)=>{
    let config = ''
    config += 'mode=' + values.mode + '\n'
    if (values.steamcmd !== undefined || values.steamcmd != null) {
        config += 'steamcmd=' + values.steamcmd + '\n'
    }
    config += 'force_install_dir=' + values.force_install_dir + '\n'
    config += 'doNotStarveTogether=' + values.doNotStarveTogether + '\n'
    config += 'cluster=' + values.cluster + '\n'
    config += 'backupPath=' + values.backupPath + '\n'
    config += 'beta=' + values.beta + '\n'
    writeDstConfigSync(config)
}

export {
    getDstConfig,
    readDstConfigSync,
    writeDstConfigSync,


    cluster_ini_path,
    cluster_token_path,
    master_leveldataoverride_path,
    caves_leveldataoverride_path,
    modoverrides_path,
    master_modoverrides_path,
    caves_modoverrides_path,
    mods_setup_path,

    get_dst_home_info,
    saveDstConfig
}