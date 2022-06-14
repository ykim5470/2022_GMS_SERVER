const Sequelize = require('sequelize')

module.exports = class Auth extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        Id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        Auth: {
          // 0=사용자, 121=가이드, 125=가이드 관리자, 151=셀러, 155=셀러 관리자, 177=시스템 관리자
          type: Sequelize.INTEGER(10),
          allowNull: false,
          // defaultValue: "0",
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Auth',
        tableName: 'auth',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    )
  }
}
