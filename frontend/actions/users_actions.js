import * as UsersAPIUtil from '../util/users_api_util';

export const UPDATE_FUNDS = 'UPDATE_FUNDS';

const updateFunds = (funds) => {
    return {
    type: UPDATE_FUNDS,
    funds
}}

export const addFunds = (amount, id) => dispatch => (
    UsersAPIUtil.addFunds(amount, id).then(data => (
        dispatch(updateFunds(data))
    ))
);