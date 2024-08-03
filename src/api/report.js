import axios from "axios";

const serverAddress = import.meta.env.VITE_SERVER_ADDRESS;

export const getReportByYear = async (year) => {
    const response = await axios.get(`${serverAddress}/api/v1/cement-swift/report/findByYear?year=${year}`)
    return response.data.item;
}