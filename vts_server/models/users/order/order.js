const Sequelize = require("sequelize");

module.exports = class Order extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        State: {
          // 상태
          type: Sequelize.STRING(10),
          allowNull: true,
        },
        PayMethod: {
          // 결제방식
          type: Sequelize.STRING(10),
          allowNull: true,
        },
        Total: {
          // 전체 결제 금액
          type: Sequelize.INTEGER(15),
          allowNull: true,
        },
        SubTotal: {
          // 전체 상품 금액
          type: Sequelize.INTEGER(15),
          allowNull: true,
        },
        TotalWeight: {
          // 전체 상품 중량 금액
          type: Sequelize.INTEGER(15),
          allowNull: true,
        },
        DomesticShippingFee: {
          // 국내 배송비
          type: Sequelize.INTEGER(15),
          allowNull: true,
        },
        InternationalShippingFee: {
          // 해외 배송비
          type: Sequelize.INTEGER(15),
          allowNull: true,
        },
        Point: {
          // 포인트
          type: Sequelize.INTEGER(15),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Order",
        tableName: "order",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
