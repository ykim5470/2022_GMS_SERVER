const Sequelize = require("sequelize");

module.exports = class Authority extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Authority",
        tableName: "authority",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
