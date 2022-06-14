const Sequelize = require("sequelize");

module.exports = class Token extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        Type: {
          // pwFails=비밀번호 실패, pwFinds=비밀번호 찾기, pwChange=비밀번호 변경, email=이메일 인증, dormant=휴먼계정, Withdrawal=회원탈퇴
          type: Sequelize.STRING(15),
          allowNull: true,
        },
        Token: {
          // 랜덤 토큰
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Token",
        tableName: "token",
        paranoid: true,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
};
