const config ={
    db:{
        username : "root",
        password :"1q2w3e4r!",
        host:"127.0.0.1",
        port:"3306",
        database:"sample",
        dialect:"mysql",
        define:{
            freezeTableName: true,
            timestamps:false
        },
    }
}

module.exports = config