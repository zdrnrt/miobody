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

export {getChart, getAll}