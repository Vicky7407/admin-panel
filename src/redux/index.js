import { combineReducers } from "redux";
import counterReducer from "./reducer/counterReducer";
import { MedicineReducer } from "./reducer/Medicine.Reducer";



const rootReducer = combineReducers({
      counter:counterReducer,
      Medicine:MedicineReducer
})

export default rootReducer;