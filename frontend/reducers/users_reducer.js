import { RECEIVE_CURRENT_USER } from '../actions/session_actions';
import { UPDATE_FUNDS} from '../actions/users_actions';

const usersReducer = (state = {}, action) => {

    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign({}, state, { [action.currentUser.id]: action.currentUser });
        case UPDATE_FUNDS:
            return Object.assign({}, state, { [action.funds.id]: action.funds });
        default:
            return state;
    }
};

export default usersReducer;
