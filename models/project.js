module.exports = (sequelize, Sequelize) => {
    const Project = sequelize.define("project",
    {
        name: {
            type: Sequelize.STRING
        },
        version: {
            type: Sequelize.STRING
        },
        categoryId: {
            type: Sequelize.INTEGER
        },
        releaseDate: {
            type: Sequelize.DATE
        },
        description: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },

    },

    {
        timestamps: false,
        freezeTableName: true,
        tableName: 'project'
    }
    );

    return Project;
};