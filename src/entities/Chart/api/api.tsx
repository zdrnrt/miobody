import axios from "axios"
const API_URL = 'http://localhost:8000/api'

const getChart = (id:number, signal: AbortSignal) => {
  return axios.get(`${API_URL}/dataset/${id}`, {
    signal: signal
  })
}
const getAll = (signal: AbortSignal) => {
  return axios.get(`${API_URL}/datasets`, {
    signal: signal
  })
}
const uploadChart = (formData: FormData) => {
  return axios.post(`${API_URL}/dataset`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export {getChart, getAll, uploadChart}