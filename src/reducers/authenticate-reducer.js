import { LOGIN, LOGOUT } from '../actions/authenticate-actions';

export default function authReducer(state = '', action) {
    switch (action.type) {
        case LOGIN:
            return action.newState;
        case LOGOUT:
            return action.newState;
        default:
            return state;
    };
};