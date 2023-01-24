import { http } from "../utils/http";

async function updateGameApi() {
    const url = '/api/dashboard'
    const response = await http.get(url)
    return response.data
}

async function startHomeApi(checked, type) {
    const url = '/api/dashboard'
    const response = await http.get(url)
    return response.data
}


async function getHomeConfigApi() {
    const url = '/api/game/config'
    const response = await http.get(url)
    return response.data
}

export {
    updateGameApi,
    startHomeApi,
    getHomeConfigApi
}