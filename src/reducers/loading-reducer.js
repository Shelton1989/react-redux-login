import { LOADING, LOADINGCOMPLETE } from '../actions/authenticate-actions';

export default function loadingReducer(state = '', action) {
    switch (action.type) {
        case LOADING:
            return action.newState;
        case LOADINGCOMPLETE:
            return action.newState;
        default:
            return state;
    };
};