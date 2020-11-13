export const addFunds = (amount, id) => (
    $.ajax({
        method: 'PATCH',
        url: `/api/users/${id}`,
        data: { amount }
    })
)


