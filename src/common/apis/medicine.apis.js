import { getRequest, postrequest, deleteRequest ,putRequest } from "../request"



export const getAllMedicinesData =(path) =>{
    return getRequest("posts")
}

export const addMedicineData= (data) =>{
    return postrequest("posts/" ,data)
}

export const deleteMedicineData = (id) =>{
    return deleteRequest("posts/" , id)
}

export const putMedicineData =(data) =>{
    return putRequest("posts/" , data)
}