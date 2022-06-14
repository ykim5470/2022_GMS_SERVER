const Sequelize = require("sequelize");

module.exports = class OrderLineRefund extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        LineReasonsOfRefund: {
          // 환불사유
          type: Sequelize.STRING(500),
          allowNull: true,
        },
        LineReasonsOfRefundOriginal: {
          // 반품 첨부파일 오리지널명
          type: Sequelize.STRING(1000),
          allowNull: true,
        },
        LineReasonsOfRefundFile: {
          // 반품 첨부파일 파일명
          type: Sequelize.STRING(1000),
          allowNull: true,
        },
        LineReasonsOfRefundPath: {
          // 반품 첨부파일 경로
          type: Sequelize.STRING(1000),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "OrderLineRefund",
        tableName: "orderLineRefund",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
