import * as AT from "../reducer/ActionType";
const initVal={
    isLoading:false,
    MD:[],
    error:''
}

export const MedicineReducer = (state=initVal,action) =>{
      switch (action.type) {
        case AT.GET_MEDICINE:
            return{
                ...state,
                isLoading:false,
                MD:action.payload
            }
        case AT.LOADING_MEDICINE:
            return{
                ...state,
                isLoading:true,
                error:""
            }
        case AT.ERROR_MEDICINE:
            return{
                ...state,
                isLoading:false,
                error:action.payload
            }
        case AT.ADD_MEDICINE:
            return{
                ...state,
                isLoading:false,
                MD:state.MD.concat(action.payload)
            }
        case AT.DELETE_DATA:
            return{
                ...state,
                isLoading:false,
                MD:state.MD.filter(((i) => i.id !== action.payload))
            }
        case AT.UPDATE_DATA:
            return{
                ...state,
                isLoading:false,
                MD:state.MD.map((l) =>{
                    if(l.id===action.payload.id){
                    return action.payload;
                    }else{
                    return l;
                    }
                }),
            }
      
        default:
            return state;
      }
}