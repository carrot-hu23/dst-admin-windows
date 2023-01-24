const fs = window.require('fs')


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
    }
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

export {
    getDstConfig,
    readDstConfigSync,
    writeDstConfigSync
}