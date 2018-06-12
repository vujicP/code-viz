import axios from 'axios'


const defaults = {
  baseURL: 'http://localhost:8000/api/res/',
  transformResponse: (response) => {
    if(response === "") return response;
    var json_response = JSON.parse(response);
    return json_response.hasOwnProperty('objects') 
              ? JSON.parse(json_response.objects[0].data) 
              : JSON.parse(json_response.data)
    },
}


Object.assign(axios.defaults, defaults)

export const searchConcepts = (searchstring) => {
  return axios.get(`/code/search/${searchstring}`).catch((error) => Promise.reject(error))
}

export const fetchCodeProvenance = (codeid) => {
  return axios.get(`/code/provenance/${codeid}`).catch((error) => Promise.reject(error))
}

export const fetchClosestConnections = (codeid) => {
  return axios.get(`/code/${codeid}`).catch((error) => Promise.reject(error))
}




