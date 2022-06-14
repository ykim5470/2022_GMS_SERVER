const Sequelize = require("sequelize");

module.exports = class Point extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        PointMemo: {
          // 적립금 메모
          type: Sequelize.STRING(500),
          allowNull: true,
        },
        PointPrice: {
          // 적립 금액
          type: Sequelize.INTEGER(15),
          allowNull: true,
        },
        Confirm: {
          // 승인여부
          type: Sequelize.INTEGER(10),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Point",
        tableName: "point",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
