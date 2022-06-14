const Sequelize = require('sequelize')

module.exports = class UserInfo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        Mail: {
          // 추가 mail
          type: Sequelize.STRING(40),
          allowNull: true,
        },
        Nick: {
          // 닉네임
          type: Sequelize.STRING(15),
          allowNull: true,
        },
        Name: {
          // 이름
          type: Sequelize.STRING(15),
          allowNull: true,
        },
        Memo: {
          // 가이드 설명
          type: Sequelize.TEXT('long'),
          allowNull: true,
        },
        PhoneNumber: {
          // 핸드폰 전화번호
          type: Sequelize.STRING(20),
          allowNull: true,
        },
        Signup_Path: {
          // 가입경로
          type: Sequelize.STRING(200),
          allowNull: true,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'UserInfo',
        tableName: 'userInfo',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    )
  }
}
