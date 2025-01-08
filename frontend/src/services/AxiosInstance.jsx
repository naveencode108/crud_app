import axios from 'axios'

export const apiCall=axios.create({
    baseURL:'http://localhost:2000'
});