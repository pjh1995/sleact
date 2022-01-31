import axios from 'axios';

const fetcher = (url: string) => {
    return axios.get(`http://localhost:3095/api/${url}`, { withCredentials: true }).then((res) => res.data)
}

export default fetcher