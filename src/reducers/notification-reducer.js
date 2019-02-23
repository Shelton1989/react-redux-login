import { LOGINSUCCESSFUL, LOGINUNSUCCESSFUL } from '../actions/authenticate-actions';

export default function notificationReducer(state = '', action) {
    switch (action.type) {
        case LOGINSUCCESSFUL:
            return action.newState;
        case LOGINUNSUCCESSFUL:
            return action.newState;
        default:
            return state;
    };
};