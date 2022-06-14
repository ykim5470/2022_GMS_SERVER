const Sequelize = require('sequelize')
module.exports = class Sessions extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        sid: {
          type: Sequelize.STRING,
          primaryKey: true,
        },
        expires: {
          type: Sequelize.DATE
        },
        data: {
          type: Sequelize.STRING(2000)
        }
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'Sessions',
        tableName: 'Sessions',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      },
    )
  }

}
