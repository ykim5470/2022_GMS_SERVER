const Sequelize = require("sequelize");

module.exports = class OrderLine extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        ProductCount: {
          // 상품 수량
          type: Sequelize.INTEGER(14),
          allowNull: true,
        },
        ProductPrice: {
          // 상품 금액
          type: Sequelize.INTEGER(100),
          allowNull: true,
        },
        WeightPrice: {
          // 상품 중량 금액
          type: Sequelize.INTEGER(15),
          allowNull: true,
        },
        OrderDetailState: {
          // 처리상태
          type: Sequelize.STRING(10),
          allowNull: true,
        },
        RefundCheck: {
          // 환불 가능여부
          type: Sequelize.INTEGER(10),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "OrderLine",
        tableName: "orderLine",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
