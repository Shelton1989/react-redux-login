import { UPDATEUSERNAME } from '../actions/authenticate-actions';

export default function updateUsernameReducer(state = '', action) {
    switch (action.type) {
        case UPDATEUSERNAME:
            return action.newState;
        default:
            return state;
    };
};