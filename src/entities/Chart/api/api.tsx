import axios from "axios"
const API_URL = 'http://localhost:8000/api'

const getChart = (id:number) => {
  return axios.get(`${API_URL}/dataset/${id}`)
}
const getAll = () => {
  return axios.get(`${API_URL}/datasets`)
}

export {getChart, getAll}