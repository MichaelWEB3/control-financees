import axios from "axios";

export default  async function api(path){
    return axios.get(path)
}   