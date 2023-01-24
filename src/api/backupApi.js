import { http } from "../utils/http";

async function createBackupApi() {
    const url = '/api/dashboard'
    const response = await http.get(url)
    return response.data
}

export {createBackupApi}