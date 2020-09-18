import axios from "axios";

const clienteAxios = axios.create({
    baseURL: "https://localhost:44322"
});
export default clienteAxios;