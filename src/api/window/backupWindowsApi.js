import { http } from "../../utils/http"

async function createBackupApi() {
    const url = '/api/dashboard'
    const response = await http.get(url)
    return response.data
}

function getBackupApi() {
    return [{
        "createTime": "2023-01-27T16:07:25.2839413+08:00",
        "fileName": "test2027 - 副本.zip",
        "fileSize": 2232891,
        "time": 1674806845
    }]
}

async function deleteBackupApi(fileNames) {
    const url = '/api/game/backup'
    const response = await http.delete(url, {
        data: {
            fileNames: fileNames,
        }
    })
    return response.data
}

async function renameBackupApi(data) {
    const url = '/api/game/backup'
    const response = await http.put(url, data)
    return response.data
}

async function downloadBackupApi(fileName) {
    const url = '/api/game/backup/download'
    const response = await http.get(url, {
        params: {
            fileName: fileName
        },
        responseType: 'blob',
    })
    return response.data
}

export {
    createBackupApi,
    getBackupApi,
    deleteBackupApi,
    downloadBackupApi,
    renameBackupApi
}
