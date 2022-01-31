import axios from "axios"

export const signUp = (data: { email: string, nickname: string, password: string }) => {
    return new Promise((resolve) => {
        axios.post('/api/users', data)
            .then((res) => { resolve(res.data) })
            .catch((e) => { console.error(e), resolve(e.response.data) })
        // .finally(() => { return console.error('finally')})
    });
}

export const login = (data: { email: string, password: string }) => {
    return new Promise((resolve) => {
        axios.post('/api/users/login', data, { withCredentials: true })
            .then((res) => {
                return res.data?.email === data.email ? resolve('ok') : resolve('error')
            })
            .catch((e) => { console.error(e), resolve(e.response.data) })
        // .finally(() => { return console.error('finally')})
    });
}