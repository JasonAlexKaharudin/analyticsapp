const ROLE = {
    ADMIN: 'admin',
    BASIC: 'basic'
}

module.exports = {
    ROLE: ROLE,
    users: [
        {id:1, name:'Jason', role: ROLE.ADMIN},
        {id:2, name:'Bruce', role: ROLE.BASIC},
        {id:3, name: 'TA', role: ROLE.ADMIN}
    ],
    projects: [
        {id:1, name: "Jason's project", userId: 1},
        {id:2, name: "Bruce's project", userId: 2},
        {id:3, name: "TA's project", userId: 3}
    ]
}