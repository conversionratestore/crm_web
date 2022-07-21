import axios from 'axios'



export default axios.create({
    // baseURL: 'http://localhost:4000',
    baseURL: 'https://server.crs-dev.fun',
    headers: {
        'Content-Type': 'application/json',
        'crs-auth-token': sessionStorage.getItem('access_token') ? JSON.parse(sessionStorage.getItem('access_token')) : 'none'
    }
})