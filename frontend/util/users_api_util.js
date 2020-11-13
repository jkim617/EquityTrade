export const addFunds = (amount, id) => (
    $.ajax({
        method: 'PATCH',
        url: `/api/users/${id}`,
        data: { amount }
    })
)

export const refreshUser = (id) => (
    $.ajax({
        method: 'GET',
        url: `/api/users/${id}`
    })
)


