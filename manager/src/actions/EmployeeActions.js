import { 
    EMPLOYEE_CREATE,
    EMPLOYEE_CREATE_SUCCESS,
    EMPLOYEES_FETCH_SUCCESS,
    EMPLOYEE_SAVE_SUCCESS,
    EMPLOYEE_BACK
} from './types';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const employeeCreate = ({ prop, value }) => {
    return {
        type: EMPLOYEE_CREATE,
        payload: { prop, value }
    };
};

export const newEmployee = ({ name, phone, shift }) => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
    firebase.database().ref(`/users/${currentUser.uid}/employees`)
    .push({ name, phone, shift })
    .then(() => { 
        dispatch({ type: EMPLOYEE_CREATE_SUCCESS})
        Actions.employeeList( { type: 'reset' } )
      });
    };
};

export const employeesFetch = () => {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
        firebase.database().ref(`/users/${currentUser.uid}/employees`)
        .on('value', snapshot => {
           dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() }); 
        });
    };
};

export const employeeSave = ({ name, phone, shift, uid}) => {
      const { currentUser } = firebase.auth();

      return (dispatch) => {
          firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
          .set({ name, phone, shift})
          .then(() => {
            dispatch({ type: EMPLOYEE_SAVE_SUCCESS})
              Actions.employeeList( { type: 'reset' } );
              alert('Employee saved successfully!');
      });
      };
};

export const employeeDelete = ({ uid }) => {
    const { currentUser } = firebase.auth();

    return () => {
        firebase.database().ref(`/users/${currentUser.uid}/employees/${uid}`)
        .remove()
        .then(() => {
            Actions.employeeList( { type: 'reset' } );
            alert('Employee deleted successfully!');
        });
    };
};

export const employeeBack = () => {
    return (dispatch) => {
        dispatch( { type: EMPLOYEE_BACK })
    };
};