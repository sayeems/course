import axios from 'axios'

// base url

const api = axios.create({
    baseURL: "http://localhost/courseContent/wp-json/sayeem/courses/"
})

export default api