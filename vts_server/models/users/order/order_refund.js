const Sequelize = require("sequelize");

module.exports = class OrderRefund extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        ReasonsOfRefund: {
          // 환불사유
          type: Sequelize.STRING(500),
          allowNull: true,
        },
        ReasonsOfRefundOriginal: {
          // 반품 첨부파일 오리지널명
          type: Sequelize.STRING(1000),
          allowNull: true,
        },
        ReasonsOfRefundFile: {
          // 반품 첨부파일 파일명
          type: Sequelize.STRING(1000),
          allowNull: true,
        },
        ReasonsOfRefundPath: {
          // 반품 첨부파일 경로
          type: Sequelize.STRING(1000),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "OrderRefund",
        tableName: "orderRefund",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
