const app = require("./app")
const {sequelize} = require("./models")
const port = process.env.PORT || 3000
//sequelize


app.listen(3000, async()=>{
    await sequelize.sync({force : false})
    console.log(`Dababase Connected...`)
    console.log(`Running on http://127.0.0.1:3000`)    
})