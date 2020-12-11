import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE,ALL_DATA_GET} from "./actionTypes"
import axios from 'axios'

export const loginRequest = (payload) => ({
    type:LOGIN_REQUEST,
    payload
})

export const loginSuccess = (payload) => ({
    type:LOGIN_SUCCESS,
    payload
})


export const loginfailure = (payload) => ({
    type:LOGIN_FAILURE,
    payload
})


export const allUsersData = (payload) => ({
    type:ALL_DATA_GET,
    payload
})

export const getUserData = (payload) => dispatch => {
    console.log(payload);
    dispatch(loginRequest())
    return axios.get("http://localhost:3000/users")
    .then(res=> {
        res.data.filter((item)=> {
            if(item.username == payload.username && item.password==payload.password){
                return (dispatch(loginSuccess(item)))
            } 
        })
    })
  
    .catch(err=>dispatch(loginfailure(err)))
}

export const getdata = (payload) => dispatch => {
    console.log(payload)
    var search = "" || payload.searchItem
    console.log("getdata activate")
    return axios.get("http://localhost:3000/users",{
        params:{
            q:search
        }
    }).then(res=> dispatch(allUsersData(res.data)))
}

export const PatchUserData = (payload) => dispatch => {
    console.log(payload);
    var id =Number( payload.user_id)
    return axios.patch(`http://localhost:3000/users/${id}`,{
        username_fullname:payload.Changename,
        gender:payload.Changegender,
        department:payload.Changedepartment,
        joiningDate:payload.Changedate
    })
    .then(res=> dispatch(getdata()))
    .catch(err=>dispatch(loginfailure(err)))
}