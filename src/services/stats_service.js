import axios from "axios";
import { config } from "../config/config";


export async function getStats() {
    try {
        const response = await axios.get(`${config.apiUrl}/stats`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
    }
    