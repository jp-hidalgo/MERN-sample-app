import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertMovie = payload => api.post(`/registry`, payload)
export const getAllMovies = () => api.get(`/registries`)
export const updateMovieById = (id, payload) => api.put(`/registry/${id}`, payload)
export const deleteMovieById = id => api.delete(`/registry/${id}`)
export const getMovieById = id => api.get(`/registry/${id}`)

const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
}

export default apis