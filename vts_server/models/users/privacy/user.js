const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        Email: {
          // id 및 email
          type: Sequelize.STRING(40),
          allowNull: true,
          unique: true,
        },
        Password: {
          // hash 비밀번호
          type: Sequelize.STRING(100),
          allowNull: true,
        },
        Provider: {
          // local=로컬, kakao=카카오
          type: Sequelize.STRING(10),
          allowNull: false,
          defaultValue: "local",
        },
        SnsId: {
          // SNS 고유 ID (kakao)
          type: Sequelize.STRING(30),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "User",
        tableName: "user",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
