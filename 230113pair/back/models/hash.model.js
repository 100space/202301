module.exports = (sequelize, Sequelize) =>{
    class Hash extends Sequelize.Model{
        static createTable(){
            return this.init(
                {
                    tagid:{
                        primaryKey:true,
                        type:Sequelize.INTEGER,
                        autoIncrement:true, 
                    },
                    tagname:{
                        type:Sequelize.STRING(20),
                        allowNull:false,
                        unique: true
                    },
                },{
                    sequelize,
                    timestamps:false,
                }
            )
        }
    }
    Hash.createTable()
    return Hash
}
