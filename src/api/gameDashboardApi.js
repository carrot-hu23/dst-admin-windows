import { http } from "../utils/http";

export async function getGameDashboardApi() {
    const url = '/api/dashboard'

    const response = await http.get(url)
    return response.data
}