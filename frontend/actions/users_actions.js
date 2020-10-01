import * as UsersAPIUtil from '../util/users_api_util';

export const UPDATE_FUNDS = 'UPDATE_FUNDS';

const updateFunds = () => {
    return {
    type: UPDATE_FUNDS
}}

export const addFunds = (amount, id) => dispatch => (
    UsersAPIUtil.addFunds(amount, id).then(data => (
        dispatch(updateFunds())
    ))
);