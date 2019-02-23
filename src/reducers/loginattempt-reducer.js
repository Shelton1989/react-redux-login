import { FAILEDATTEMPT } from '../actions/authenticate-actions';

export default function loginAttempReducer(state = '', action) {
    switch (action.type) {
        case FAILEDATTEMPT:
            return action.newState;
        default:
            return state;
    };
};