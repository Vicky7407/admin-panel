import * as AT from '../reducer/ActionType'

const initVal = {
    counter: 0,
};

console.log();
export const counterReducer = (state = initVal, action) => {
    switch(action.type){
        case AT.INCREMENT:
            return { counter : state.counter + 1};
            break;
        case AT.DECREMENT:
            return { counter : state.counter - 1};
            break;
            default: return state;
    }

};

export default counterReducer;