import { REMEMBER, DONTREMEMBER } from '../actions/authenticate-actions';

export default function rememberReducer(state = '', action) {
    switch (action.type) {
        case REMEMBER:
            return action.newState;
        case DONTREMEMBER:
            return action.newState;
        default:
            return state;
    };
};