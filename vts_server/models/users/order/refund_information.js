const Sequelize = require("sequelize");

module.exports = class RefundInformation extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        BankName: {
          // 은행명
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        Depositor: {
          // 입금자명
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        AccountNumber: {
          // 입금 계좌
          type: Sequelize.INTEGER(40),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "RefundInformation",
        tableName: "refundInformation",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
