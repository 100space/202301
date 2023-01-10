// const findAll = 
// }
module.exports = (mysql) =>{
    return {
        findAll :async() => {
            const result = await mysql.query("select * from Comment")
            return result
        }
    }
}
