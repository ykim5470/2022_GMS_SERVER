const Sequelize = require("sequelize");

module.exports = class OrderState extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        OrderState: {
          // 상태
          type: Sequelize.STRING(10),
          allowNull: true,
        },
        StateModifier: {
          // 상태 변경자
          type: Sequelize.STRING(40),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "OrderState",
        tableName: "orderState",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
