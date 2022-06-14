// const fs = require('fs')
// const path = require('path')
// const Sequelize = require('sequelize')
// const env = process.env.NODE_ENV || 'development'
// const config = require('./config')[env]

// const Channel = require('./webrtc/channel')
// const ChannelSetConfig = require('./webrtc/channel_set_config')
// const ChannelRecordManagementConfig = require('./webrtc/channel_record_management_conifg')
// const ChannelProductConfig = require('./webrtc/channel_product_set_config')
// const ChannelLikeLog = require('./webrtc/channel_like_log')
// const ChannelChatLog = require('./webrtc/channel_chat_log')
// const ChannelConcurrentUserLog = require('./webrtc/channel_ccu_log')


// const StoreBrand = require('./commerce/store_brand')
// const StoreProductDetail = require('./commerce/store_product_detail')
// const StoreProductCategory = require('./commerce/store_product_category')

// const User = require('./users/user')

// const Sessions = require('./auth/session')



// const db = {}
// const sequelize = new Sequelize(
//   config.database, 
//   config.username, 
//   config.password,
//   config  
// )

// fs.readdirSync(__dirname).forEach((model) => {
//   if (['index.js', '_migrations'].indexOf(model) !== -1) return
//   const modelFilePath = path.join(__dirname, model, 'index.js')
//   if (fs.existsSync(modelFilePath) && fs.lstatSync(modelFilePath).isFile()) {
//     model = require(modelFilePath)(sequelize, DataTypes)
//     db[model.name] = model
//   }
// })

// Object.keys(db).forEach((modelName) => {
//   if ('associate' in db[modelName]) {
//     db[modelName].associate(db)
//   }
// })

// db.sequelize = sequelize
// db.Channel = Channel
// db.ChannelSetConfig = ChannelSetConfig
// db.ChannelRecordManagementConfig = ChannelRecordManagementConfig
// db.ChannelProductConfig = ChannelProductConfig
// db.ChannelLikeLog = ChannelLikeLog
// db.ChannelChatLog = ChannelChatLog
// db.ChannelConcurrentUserLog = ChannelConcurrentUserLog


// db.StoreBrand = StoreBrand
// db.StoreProductDetail = StoreProductDetail
// db.StoreProductCategory = StoreProductCategory

// db.User = User
// // db.UserMy = UserMy


// db.Sessions = Sessions


// Channel.init(sequelize)
// ChannelSetConfig.init(sequelize)
// ChannelRecordManagementConfig.init(sequelize)
// ChannelProductConfig.init(sequelize)
// ChannelLikeLog.init(sequelize)
// ChannelChatLog.init(sequelize)
// ChannelConcurrentUserLog.init(sequelize)

// StoreBrand.init(sequelize)
// StoreProductDetail.init(sequelize)
// StoreProductCategory.init(sequelize)


// User.init(sequelize)


// Sessions.init(sequelize)

// Channel.hasMany(ChannelSetConfig, {
//   foreignKey: 'RoomId',
//   as: 'setConfig',
//   onDelete: 'cascade',
// })


// Channel.hasMany(ChannelProductConfig, {
//   foreignKey: 'RoomId',
//   onDelete: 'cascade',
// })

// Channel.hasMany(ChannelLikeLog, {
//   foreignKey: 'RoomId',
//   onDelete: 'cascade',
// })

// Channel.hasMany(ChannelChatLog, {
//   foreignKey: 'RoomId',
//   onDelete: 'cascade',
// })
// Channel.hasMany(ChannelConcurrentUserLog, {
//   foreignKey: 'RoomId',
//   onDelete: 'cascade',
// })


// StoreBrand.hasOne(StoreProductDetail, {
//   foreignKey: 'StoreBrandId',
//   onDelete: 'cascade'
// })

// StoreProductCategory.hasOne(StoreProductDetail, {
//   foreignKey: 'CategoryId',
//   onDelete: 'cascade'
// })
// module.exports = db


const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require('./config')[env]

// User
const User = require('./users/privacy/user')
const UserInfo = require('./users/privacy/user_info')
const UserProfile = require('./users/privacy/user_profile')
const Birthday = require('./users/privacy/birthday')
const Point = require('./users/privacy/point')
const Authority = require('./users/auth/authority')
const Auth = require('./users/auth/auth')
const Confirm = require('./users/auth/confirm')
const Status = require('./users/auth/status')
const Token = require('./users/auth/token')

// Logs
const LogsUser = require('./logs/auth/logs_user')
const LogsLogin = require('./logs/auth/logs_login')
const LogsPasswd = require('./logs/auth/logs_passwd')
const LogsPasswdChange = require('./logs/auth/logs_passwd_change')
const LogsToken = require('./logs/auth/logs_token')

// Product
const Category = require('./store/product/category')
const Product = require('./store/product/product')
const ProductThumbnail = require('./store/product/product_thumbnail')
const Stock = require('./store/product/stock')
const Sagawa = require('./store/product/sagawa')
const Cart = require('./users/order/cart')
const Order = require('./users/order/order')
const OrderLine = require('./users/order/order_line')
const RefundInformation = require('./users/order/refund_information')
const DeliveryTracking = require('./users/order/delivery_tracking')
const OrderRefund = require('./users/order/order_refund')
const OrderLineRefund = require('./users/order/order_line_refund')
const Review = require('./store/product/review')

// store
const StoreSetting = require('./store/setting/store_setting')
const StoreDelivery = require('./store/setting/store_delivery')
const StoreWeight = require('./store/setting/store_weight')
const StoreCity = require('./store/setting/store_city')


// channel
const Channel = require('./guide/channel')
const ChannelSetConfig = require('./guide/channel_set_config')
const ChannelRecordManagementConfig = require('./guide/channel_record_management_conifg')
const ChannelProductConfig = require('./guide/channel_product_set_config')
const ChannelLikeLog = require('./guide/channel_like_log')
const ChannelChatLog = require('./guide/channel_chat_log')
const ChannelConcurrentUserLog = require('./guide/channel_ccu_log')


// session
const Sessions = require('./session/session')



const db = {}
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
)

fs.readdirSync(__dirname).forEach((model) => {
  if (['index.js', '_migrations'].indexOf(model) !== -1) return
  const modelFilePath = path.join(__dirname, model, 'index.js')
  if (fs.existsSync(modelFilePath) && fs.lstatSync(modelFilePath).isFile()) {
    model = require(modelFilePath)(sequelize, DataTypes)
    db[model.name] = model
  }
})

Object.keys(db).forEach((modelName) => {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db)
  }
})

// ------------------------------------------

db.sequelize = sequelize

// User
db.User = User
db.UserInfo = UserInfo
db.UserProfile = UserProfile
db.Birthday = Birthday
db.Point = Point
db.Authority = Authority
db.Auth = Auth
db.Confirm = Confirm
db.Status = Status
db.Token = Token

// Logs
db.LogsUser = LogsUser
db.LogsLogin = LogsLogin
db.LogsPasswd = LogsPasswd
db.LogsPasswdChange = LogsPasswdChange
db.LogsToken = LogsToken

// Product
db.Category = Category
db.Product = Product
db.ProductThumbnail = ProductThumbnail
db.Stock = Stock
db.Sagawa = Sagawa
db.Cart = Cart
db.Order = Order
db.OrderLine = OrderLine
db.RefundInformation = RefundInformation
db.OrderRefund = OrderRefund
db.OrderLineRefund = OrderLineRefund
db.DeliveryTracking = DeliveryTracking
db.Review = Review

// store
db.StoreSetting = StoreSetting
db.StoreDelivery = StoreDelivery
db.StoreWeight = StoreWeight
db.StoreCity = StoreCity


// channel
db.Channel = Channel
db.ChannelSetConfig = ChannelSetConfig
db.ChannelRecordManagementConfig = ChannelRecordManagementConfig
db.ChannelProductConfig = ChannelProductConfig
db.ChannelLikeLog = ChannelLikeLog
db.ChannelChatLog = ChannelChatLog
db.ChannelConcurrentUserLog = ChannelConcurrentUserLog


// Sessions
db.Sessions = Sessions


// ------------------------------------------

// ------------------------------------------

// User
User.init(sequelize)
UserInfo.init(sequelize)
UserProfile.init(sequelize)
Birthday.init(sequelize)
Point.init(sequelize)
Authority.init(sequelize)
Auth.init(sequelize)
Confirm.init(sequelize)
Status.init(sequelize)
Token.init(sequelize)

// Logs
LogsUser.init(sequelize)
LogsLogin.init(sequelize)
LogsPasswd.init(sequelize)
LogsPasswdChange.init(sequelize)
LogsToken.init(sequelize)

// Product
Category.init(sequelize)
Product.init(sequelize)
ProductThumbnail.init(sequelize)
Stock.init(sequelize)
Sagawa.init(sequelize)
Cart.init(sequelize)
Order.init(sequelize)
OrderLine.init(sequelize)
RefundInformation.init(sequelize)
OrderRefund.init(sequelize)
OrderLineRefund.init(sequelize)
DeliveryTracking.init(sequelize)
Review.init(sequelize)

// store
StoreSetting.init(sequelize)
StoreDelivery.init(sequelize)
StoreWeight.init(sequelize)
StoreCity.init(sequelize)

// channel
Channel.init(sequelize)
ChannelSetConfig.init(sequelize)
ChannelRecordManagementConfig.init(sequelize)
ChannelProductConfig.init(sequelize)
ChannelLikeLog.init(sequelize)
ChannelChatLog.init(sequelize)
ChannelConcurrentUserLog.init(sequelize)

// session
Sessions.init(sequelize)


// ------------------------------------------

// ------------------------------------------

// USER
User.hasOne(UserInfo, {
  onDelete: 'CASCADE',
})
User.hasOne(Authority, {
  onDelete: 'CASCADE',
})
User.hasOne(Token, {
  onDelete: 'CASCADE',
})
User.hasOne(LogsUser, {
  onDelete: 'CASCADE',
})
User.hasMany(Cart, {
  onDelete: 'CASCADE',
})
User.hasMany(Product, {
  onDelete: 'CASCADE',
})
User.hasMany(Order, {
  onDelete: 'CASCADE',
})
LogsUser.hasOne(LogsLogin, {
  onDelete: 'CASCADE',
})
LogsUser.hasOne(LogsPasswd, {
  onDelete: 'CASCADE',
})
LogsUser.hasOne(LogsPasswdChange, {
  onDelete: 'CASCADE',
})
LogsUser.hasOne(LogsToken, {
  onDelete: 'CASCADE',
})
UserInfo.belongsTo(User)
Authority.belongsTo(User)
Token.belongsTo(User)
LogsUser.belongsTo(User)
Cart.belongsTo(User)
Product.belongsTo(User)
Order.belongsTo(User)
LogsLogin.belongsTo(LogsUser)
LogsPasswd.belongsTo(LogsUser)
LogsPasswdChange.belongsTo(LogsUser)
LogsToken.belongsTo(LogsUser)

// USER INFO
UserInfo.hasOne(UserProfile, {
  onDelete: 'CASCADE',
})
UserInfo.hasMany(Point, {
  onDelete: 'CASCADE',
})
UserInfo.hasOne(Birthday, {
  onDelete: 'CASCADE',
})
UserProfile.belongsTo(UserInfo)
Point.belongsTo(UserInfo)
Birthday.belongsTo(UserInfo)

// AUTH
Authority.hasOne(Auth, {
  onDelete: 'CASCADE',
})
Authority.hasOne(Confirm, {
  onDelete: 'CASCADE',
})
Authority.hasOne(Status, {
  onDelete: 'CASCADE',
})
Auth.belongsTo(Authority)
Confirm.belongsTo(Authority)
Status.belongsTo(Authority)

// store
StoreSetting.hasMany(Auth, {
  onDelete: 'CASCADE',
})
StoreSetting.hasMany(StoreDelivery, {
  onDelete: 'CASCADE',
})
StoreDelivery.hasOne(StoreWeight, {
  onDelete: 'CASCADE',
})
StoreDelivery.hasOne(StoreCity, {
  onDelete: 'CASCADE',
})
StoreSetting.hasMany(Product, {
  onDelete: 'CASCADE',
})
StoreSetting.hasMany(Category, {
  onDelete: 'CASCADE',
})

// StoreDelivery.belongsTo(StoreSetting);

// Product
Category.hasMany(Product, {
  onDelete: 'CASCADE',
})
Product.hasMany(Review, {
  onDelete: 'CASCADE',
})
Product.hasMany(ProductThumbnail, {
  onDelete: 'CASCADE',
})
// --------
Product.hasMany(Stock, {
  onDelete: 'CASCADE',
})
OrderLine.hasMany(Stock, {
  onDelete: 'CASCADE',
})
Product.hasOne(Sagawa, {
  onDelete: 'CASCADE',
})
Product.hasMany(Cart, {
  onDelete: 'CASCADE',
})
Product.hasMany(OrderLine, {
  onDelete: 'CASCADE',
})
Order.hasMany(OrderLine, {
  onDelete: 'CASCADE',
})
Order.hasOne(RefundInformation, {
  onDelete: 'CASCADE',
})
Order.hasOne(DeliveryTracking, {
  onDelete: 'CASCADE',
})

Order.hasMany(OrderRefund, {
  onDelete: 'CASCADE',
})
OrderLine.hasMany(OrderLineRefund, {
  onDelete: 'CASCADE',
})
Product.belongsTo(Category)
ProductThumbnail.belongsTo(Product)
Sagawa.belongsTo(Product)
OrderLine.belongsTo(Order)
RefundInformation.belongsTo(Order)
OrderRefund.belongsTo(Order)
OrderLineRefund.belongsTo(OrderLine)
DeliveryTracking.belongsTo(Order)


// channel 
Channel.hasMany(ChannelSetConfig, {
  foreignKey: 'RoomId',
  as: 'setConfig',
  onDelete: 'cascade',
})


Channel.hasMany(ChannelProductConfig, {
  foreignKey: 'RoomId',
  onDelete: 'cascade',
})

Channel.hasMany(ChannelLikeLog, {
  foreignKey: 'RoomId',
  onDelete: 'cascade',
})

Channel.hasMany(ChannelChatLog, {
  foreignKey: 'RoomId',
  onDelete: 'cascade',
})
Channel.hasMany(ChannelConcurrentUserLog, {
  foreignKey: 'RoomId',
  onDelete: 'cascade',
})

// ------------------------------------------

module.exports = db
