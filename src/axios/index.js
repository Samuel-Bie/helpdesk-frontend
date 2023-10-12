import axios from 'axios'

axios.defaults.baseURL = 'http://localhost/api'

axios.defaults.withCredentials = true;

export default axios;