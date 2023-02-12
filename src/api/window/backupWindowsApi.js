import { readDstConfigSync } from "./dstConfigApi"
import { message } from 'antd';
import { zip } from "../compressing";
import { getHomeConfigWindowApi } from "./gameWindowsApi";

const fs = window.require('fs')
const path = window.require('path');
const { shell } = window.require("electron");

window.Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "h+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
}

async function createBackupApi(backupName) {

    const config = readDstConfigSync()

    const dst_base_path = path.join(window.process.env.USERPROFILE + "", "Documents", "Klei", "DoNotStarveTogether", config.cluster)
    const backupPath = config.backupPath

    const clusterName = new Date().format("yyyyMMddhhmmss") + '_' + getHomeConfigWindowApi().cluster_name
    const dest = path.join(backupPath, clusterName)

    console.log(dst_base_path, dest);

    //创建游戏备份
    await zip(dst_base_path, dest,()=>{}, error=>{message.error("创建备份失败")})
}

function getBackupApi() {
    const backupPath = readDstConfigSync().backupPath
    const backupDir = fs.readdirSync(backupPath)
    const newBackupDir = backupDir.filter(item => path.extname(item) === '.zip' || path.extname(item) === '.tar')

    const backupList = newBackupDir.map(item => {
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
    fileNames.map(fileName => fs.unlinkSync(path.join(backupPath, fileName)))
}

async function renameBackupApi(data) {

    const backupPath = readDstConfigSync().backupPath
    const { fileName, newName } = data
    console.log('re', data);

    fs.renameSync(path.join(backupPath, fileName), path.join(backupPath, newName))

}

function openDir(filePath) {
    if (!fs.existsSync(filePath)) {
        message.warning(filePath + ' 文件不存在')
    }
    shell.showItemInFolder(filePath)
}

function openBackupDir(fileName) {

    const baseBackupPath = readDstConfigSync().backupPath

    const filePath = path.join(baseBackupPath, fileName)

    if (!fs.existsSync(filePath)) {
        message.warning(filePath + ' 文件不存在')
    }
    shell.showItemInFolder(filePath)
}

function removeDir(dir) {
    if (!fs.existsSync(dir)) {
        return
    }
    let files = fs.readdirSync(dir)
    for(var i=0;i<files.length;i++){
      let newPath = path.join(dir,files[i]);
      let stat = fs.statSync(newPath)
      if(stat.isDirectory()){
        //如果是文件夹就递归下去
        removeDir(newPath);
      }else {
       //删除文件
        fs.unlinkSync(newPath);
      }
    }
    fs.rmdirSync(dir)//如果文件夹是空的，就将自己删除掉
}

export {
    createBackupApi,
    getBackupApi,
    deleteBackupApi,
    renameBackupApi,
    openBackupDir,
    openDir,
    removeDir
}
