const app = require("./app")
const { sequelize } = require("./model")

app.listen(3000, async () => {
    await sequelize.sync({ force: false })
    console.log(`back server open`)
})
