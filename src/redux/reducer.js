import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,ALL_DATA_GET } from "./actionTypes"

export const initstate = {
    isAuth: false,
    isLoading: false,
    isError: false,
    username: "",
    avatar_url: "",
    username_fullname: "",
    user_id: "",
    description:"",
    department:"",
    joiningDate:"",
    gender:"",
    payment:[],
    AllData:[]
}

const reducer = (state = initstate, { type, payload }) => {
    switch (type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                isAuth: false,
                isError: false,
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuth: true,
                isError: false,
                user_id: payload.user_id,
                username: payload.username,
                description:payload.description,
                username_fullname: payload.username_fullname,
                avatar_url: payload.avatar_url,
                department:payload.department,
                joiningDate:payload.joiningDate,
                gender:payload.gender,
                payment:payload.payment
                
            }

        case ALL_DATA_GET:
                return {
                    ...state,
                    AllData:payload
    
                }    
        case LOGIN_FAILURE:
            return {
                ...state,
                isError: true,
                isLoading: false,
                isAuth: false,

            }
        default:
            return state
    }
}

export default reducer