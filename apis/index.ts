import axios from "axios"

export const signUp = (data: { email: string, nickname: string, password: string }) => {
    axios.post('/api/users', data)
        .then((res) => { console.log(res) })
        .catch((e) => { console.error(e) })
        .finally(() => { })
}