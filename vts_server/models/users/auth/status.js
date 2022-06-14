const Sequelize = require("sequelize");

module.exports = class Status extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        Status: {
          // 700=정상, 704=인증필요, 708=휴먼, 709=정지
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: 704,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Status",
        tableName: "status",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
