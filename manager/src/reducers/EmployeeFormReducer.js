import {
    EMPLOYEE_CREATE,
    EMPLOYEE_CREATE_SUCCESS,
    EMPLOYEE_SAVE_SUCCESS,
    EMPLOYEE_BACK
} from '../actions/types';

const INITIAL_STATE = {
    name: '',
    phone: '',
    shift: ''
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type){

        case EMPLOYEE_CREATE:    
               if (state.shift == '') {
               state.shift = 'Monday'
             }
        return { ...state, [action.payload.prop]: action.payload.value };
 
        case EMPLOYEE_CREATE_SUCCESS:
            return INITIAL_STATE;

        case EMPLOYEE_SAVE_SUCCESS:
            return INITIAL_STATE;

        case EMPLOYEE_BACK:
            return INITIAL_STATE;

        default:
            return state;
    }
};