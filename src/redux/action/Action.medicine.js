import { addMedicineData, getAllMedicinesData } from '../../common/apis/medicine.apis'
import * as AT from '../reducer/ActionType'
import { BASE_URL } from '../Share/Url'



export const Medicinedata = () => (dispatch) =>{
      try{
        dispatch(LoadingMD(LoadingMD))

        setTimeout( function() { 
          getAllMedicinesData()
          .then((data) =>dispatch({type : AT.GET_MEDICINE, payload:data.data}))
          .catch((error) =>dispatch(errorMD(error.message)))
          .catch((error) =>dispatch(errorMD(error.message)))
          fetch(BASE_URL + "posts")
          .then((response) => {
            if (response.ok) {
              return response;
            } else {
              var error = new Error('An Error occurred ' + response.status + ': ' + response.statusText);
              error.response = response;
              throw error;
            }
          },
            error => {
              var errmess = new Error(error.message);
              throw errmess;
            })
          
          .then((response) => response.json())
          .then((data) =>dispatch({type : AT.GET_MEDICINE, payload:data}))
          .catch((error) =>dispatch(errorMD(error.message)))
        }, 2000)
      }
      catch(error){
        dispatch(errorMD(error.message))
      }
}

export const AddData = (data) => (dispatch) => {
     try{
        addMedicineData(data)
        .then((data) =>dispatch({type :AT.ADD_MEDICINE, payload:data.data}))
        fetch(BASE_URL + "posts",{
          method:"POST",
          body:JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error('An Error occurred ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
          }
        },
          error => {
            var errmess = new Error(error.message);
            throw errmess;
          })
        .then((response) => response.json())
        .then((data) =>dispatch({type :AT.ADD_MEDICINE, payload:data}))
     }catch(error){
        dispatch(errorMD(error.message))
     }
}

export const DeleteData = (id) => (dispatch) =>{
  console.log(id);
     try{
        fetch(BASE_URL + "posts/" + id,{
          method:"DELETE",
        })
        .then((response) => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error('An Error occurred ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
          }
        },
          error => {
            var errmess = new Error(error.message);
            throw errmess;
          })
        .then((response) => response.json())
        .then(dispatch({type :AT.DELETE_DATA, payload:id}))
     }catch(error){
        dispatch(errorMD(error.message))
     }
}
 
export const UpdateData = (data) =>(dispatch) =>{
  console.log(data.id);
  try{
    fetch(BASE_URL + "posts/" + data.id,{
      method:"PUT",
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('An Error occurred ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      })
    .then((response) => response.json())
    .then((data) =>dispatch({type :AT.UPDATE_DATA, payload:data}))
 }catch(error){
    dispatch(errorMD(error.message))
 }
}
export const LoadingMD = () => (dispatch) =>{
      dispatch({
        type:AT.LOADING_MEDICINE
      });
};

export const errorMD = (error) => (dispatch)=>{
     dispatch({
        type:AT.ERROR_MEDICINE,
        playload:error
      });
};