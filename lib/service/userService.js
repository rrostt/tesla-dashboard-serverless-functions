const userAdapter = require('../adapters/userData')

const getUser = userAdapter.getUser
const getUsers = userAdapter.getAll

const updateUser = ({ email, ...data }) =>
    userAdapter.getUser({ email })
        .then(user =>
            userAdapter.setUser({ email, ...user, ...data})
        )

module.exports = {
    getUser,
    updateUser,
    getUsers
}
