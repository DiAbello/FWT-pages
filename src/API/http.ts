import axios from "axios";

const $api = axios.create({
    baseURL: 'https://test-front.framework.team/',
    headers: {'Access-Control-Allow-Origin': "*"}
})
export default $api