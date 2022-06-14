const Sequelize = require("sequelize");

module.exports = class Confirm extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        Confirm: {
          // 10 : 승인 대기중, 44 = 반려, 54 = 승인취소, 99 = 승인
          type: Sequelize.INTEGER(10),
          allowNull: true,
        },
        ConfirmMemo: {
          // 반려사유
          type: Sequelize.STRING(500),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Confirm",
        tableName: "confirm",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
