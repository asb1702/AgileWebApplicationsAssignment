module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("category",
    {
        name: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        
    },

    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'category'
    }
    );

    return Category;
};