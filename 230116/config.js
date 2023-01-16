const config = {
    env:process.env.NODE_ENV || "development",
    db :{
        development:{
            username:'root',
            password:'1q2w3e4r!',
            database:'baeks',
            port:'3306',
            host:"127.0.0.1",
            dialect : 'mysql',
            define:{
                freezeTableName:true,
                timestamps:false,
            }
        }
    }
}

module.exports = config