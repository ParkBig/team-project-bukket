import axios from "axios";

const DATA_URL = `https://week5-assign.herokuapp.com/data`;

export function getData () {
    return axios.get(DATA_URL).then(response=>response.data)
}
// export function postData () {
//     return axios.post(DATA_URL).then()
// }