import { HIDDEN, NOTHIDDEN } from '../actions/authenticate-actions';

export default function showNotificationReducer(state = '', action) {
    switch (action.type) {
        case HIDDEN:
            return action.newState;
        case NOTHIDDEN:
            return action.newState;
        default:
            return state;
    };
};