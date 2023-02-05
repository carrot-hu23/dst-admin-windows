import { readDstConfigSync } from "./dstConfigApi"
import { message } from 'antd';

const fs = window.require('fs')
const path = window.require('path');
const { shell } = window.require("electron");


async function createBackupApi(backupName) {
    const config = readDstConfigSync()
    const dst_base_path = path.join(window.process.env.USERPROFILE + "", "Documents","Klei","DoNotStarveTogether",config.cluster)
    const backupPath = config.backupPath

    //创建游戏备份

}

function getBackupApi() {
    const backupPath = readDstConfigSync().backupPath
    const backupDir = fs.readdirSync(backupPath)
    const newBackupDir = backupDir.filter(item => path.extname(item) === '.zip' || path.extname(item) === '.tar')

    const backupList = newBackupDir.map(item=>{
       const file = fs.statSync(path.join(backupPath, item))    
       return {
        fileName: item,
        fileSize: file.size,
        createTime: file.ctime,
        time: file.mtime
       }
    })

    return backupList
}

async function deleteBackupApi(fileNames) {
    const backupPath = readDstConfigSync().backupPath
    fileNames.map(fileName=>fs.unlinkSync(path.join(backupPath, fileName)))
}

async function renameBackupApi(data) {

    const backupPath = readDstConfigSync().backupPath
    const {fileName, newName} = data
    console.log('re', data);
    
    fs.renameSync(path.join(backupPath, fileName),path.join(backupPath, newName))
    
}

function openBackupDir(fileName) {

    const baseBackupPath = readDstConfigSync().backupPath
    
    const filePath = path.join(baseBackupPath, fileName)
    
    if(!fs.existsSync(filePath)) {
        message.warning(filePath+' 文件不存在')
    }
    shell.showItemInFolder(filePath)
}

export {
    createBackupApi,
    getBackupApi,
    deleteBackupApi,
    renameBackupApi,
    openBackupDir
}
