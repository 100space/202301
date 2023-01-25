const config = {
    db: {
        development: {
            database: "friday",
            username: "root",
            password: "1q2w3e4r!",
            host: "127.0.0.1",
            port: "3306",
            dialect: "mysql",
            define: {
                freezeTableName: true,
                timestamps: false,
            },
        },
        test: {
            database: "friday",
            username: "root",
            password: "1q2w3e4r!",
            host: "127.0.0.1",
            port: "3306",
            dialect: "mysql",
            define: {
                freezeTableName: true,
                timestamps: false,
            },
        },
    },
}
module.exports = config
