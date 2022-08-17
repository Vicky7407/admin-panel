import { idID } from '@mui/material/locale';
import axios from 'axios';
import { BASE_URL } from '../redux/Share/Url';
 
const AxiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 2000,
});
  
export const sendRequest = (config) =>{
   return  AxiosInstance.request(config)
}

export const getRequest =(path) =>{
    return sendRequest({
        method:'GET',
        url:path
    })
}

export const postrequest = (path,data) =>{
    return sendRequest({
        method:'POST',
        url:path,
        data:JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        },
    })
}
export const deleteRequest = (path) =>{
    return sendRequest({
        method:'POST',
        url:path +idID,
        
    })
}
export const putRequest = (path,data) => {
    return sendRequest({
       method:'PUT',
       url:path + data.idID,
       data:JSON.stringify(data),
       headers: {
           "Content-Type": "application/json",
       },
   })
}