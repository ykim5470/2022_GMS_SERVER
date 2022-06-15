'use strict'

const express = require('express')
const passport = require('../middle/passport')
const { v4: uuidV4 } = require('uuid')
const path = require('path')
const fs = require('fs')
const router = express.Router()

const liveThumbnailMulterSet = require('../middle/multer/liveThumbnailMulter')
const recResourceUpload = require('../middle/multer/recUploadMulter')
const fileSizeFormatter = require('../helpers/fileUploaderController')
const Models = require('../../../models')
const { sequelize } = require('../../../models')


/**
 * Unique Room ID 
 * @return {UUID}
 */
router.get('/createRoomNumber/:sid', async (req, res, next) => {
  try {
    const { sid } = req.params
    console.log(sid)
    let hostInfo = await Models.Sessions.findOne({
      where: { sid: sid },
      attributes: ['data']
    })
    if (hostInfo == null) throw new Error('unAuthorizedError', 401, 'Session is expired! Please login again')
    console.log('undefined catch')
    console.log(hostInfo)

    const randomRoomId = uuidV4()
    return res.status(200).json({ roomId: randomRoomId })
  } catch (err) {
    console.log(err.message)
    switch (err.message) {
      case 'unAuthorizedError':
        return res.status(401).json(err)
      case 'BadRequest':
        return res.status(400).json(err)
      default:
        return res.status(500).json(err)
    }
  }
  next()
})


/**
 * Room Information
 * @returns {Array}
 */
router.get('/roomInfo/:id', async (req, res) => {
  // const {id} = req.params

  // let roomTitle = await Models.ChannelSetConfig.findOne({
  //   where: {RoomId: id},
  //   attributes: ['Title']
  // })

  // let likeLog = await Models.ChannelLikeLog.findAll({
  //   where: {RoomId: id}
  // })


  // let likeCountTotal = likeLog.length
  // console.log(likeCountTotal)

  // const {Title} = roomTitle

  return res.status(200).json({
    // title: Title,
    // likeCountTotal: likeCountTotal
    'aaa': "aaa"
  })
})

/**
 * User Id
 * @returns {Object}
 */
router.get('/user/:sid', async (req, res) => {
  try {
    const { sid } = req.params

    let hostInfo = await Models.Sessions.findOne({
      where: { sid: sid },
      attributes: ['data']
    })
    if (hostInfo == null) throw new Error('unAuthorizedError', 401, 'Session is expired! Please login again')

    const { data } = hostInfo

    const { Id } = JSON.parse(data).passport.user
    res.status(200).json(Id)
  } catch (err) {
    console.log(err.message)
    switch (err.message) {
      case 'unAuthorizedError':
        return res.status(401).json(err)
      case 'BadRequest':
        return res.status(400).json(err)
      default:
        return res.status(500).json(err)
    }
  }
})



/**
 * Host Information
 * @returns {Array}
 */
router.get('/hostInfo/:id', async (req, res) => {
  const { id } = req.params

  let hostId = await Models.ChannelSetConfig.findOne({
    where: { RoomId: id },
    attributes: ['Host']
  })

  // const { Host} = hostId 

  // let hostInfo = await Models.UserMy.findOne({
  //   where: {id: Host},
  //   attributes: ['nickName', 'profile_image']
  // })

  // const {nickName, profile_image} = hostInfo


  return res.status(200).json({
    'dummy_nick': 'dummy'
    // nickName: nickName,
    // profileImage : profile_image
  })
})

// /**
//  * brand Information
//  * @returns {Array}
//  */
//  router.get('/brandInfo/:id', async(req,res)=>{
//   const {id} = req.params


//   let brandInfoJson = await Models.ChannelSetConfig.findOne({
//     where: {roomId : id},
//     attributes : ['BrandConfig']
//   })

//   const {BrandConfig} = brandInfoJson

//   let productList = await Promise.all(BrandConfig.map((el) => {
//     let brandId = el.id
//     let productItems =  Models.StoreProductDetail.findAll({
//       where:  {StoreBrandId: brandId},
//       attributes: ['Name', 'Price', 'Stock', 'Image']
//     })
//     return productItems
//     }))    

//   return res.status(200).json(
//     productList
//   )
// })



/**
 *  Guide Rec Contents 
 * @returns {Array} 
 */
router.get('/guideRoomList', async (req, res) => {
  let roomList = await Models.Channel.findAll({
    include: [
      {
        model: Models.ChannelSetConfig,
        as: 'setConfig',
        attributes: ['Title', 'Host', 'Thumbnail', 'CreatedAt']
      }
    ],
    order: [['createdAt', 'DESC']],
    attributes: ['RoomId']
  })

  const roomListObject = JSON.parse(JSON.stringify(roomList, null, 2))


  res.status(200).json(roomListObject)

})

router.get('/roomList', async (req, res) => {
  let roomList = await Models.Channel.findAll({
    include: [
      {
        model: Models.ChannelSetConfig,
        as: 'setConfig',
        attributes: ['Title', 'Host', 'Thumbnail', 'CreatedAt']
      }
    ],
    where: { IsActivate: 1 },
    order: [['createdAt', 'DESC']],
    attributes: ['RoomId']
  })

  const roomListObject = JSON.parse(JSON.stringify(roomList, null, 2))


  res.status(200).json(roomListObject)
})

// /**
//  * brand items List
//  * @returns {Array}
//  */
// router.get('/brandList', async(req,res)=>{
//   try{
//     let brandList = await Models.StoreBrand.findAll({
//       attributes: ['Id','Name']
//     })
//     res.status(200).json(brandList)


//   }catch(err){
//     console.error(err)
//     res.status(500).json(err)
//   }
// })

// chunk split video test 
router.get('/recordMedia/:media', async (req, res, next) => {
  const { media } = req.params
  const mediaSourcePath = path.join(__dirname, `../middle/uploads/GUIDE/streaming/rec/resources/${media}`)
  console.log(mediaSourcePath)
  let stream = fs.createReadStream(mediaSourcePath)
  let count = 0
  stream.on('data', (data) => {
    count += 1
    console.log('data count= ', count)
    res.write(data)
  })
  stream.on('end', () => {
    console.log('end streaming')
    res.end
  })
  stream.on('error', (err) => {
    res.end('404 Page Not Found')
  })
  next()
}
)


/**
 * Create Live Channel
 * @argument {guideId} int
 * @argument {title} str
 * @argument {roomId} uuid 
 * @argument {brandConfig} array
 * @argument {filename} formData
 */
router.post('/roomCreate', liveThumbnailMulterSet.single('thumbnail'), async (req, res) => {
  const sequelizeTransaction = await sequelize.transaction()
  try {
    console.log(req.body)
    console.log(req.file)
    const {
      guideInfo, title, roomId, brandConfig
    } = req.body
    console.log(title)
    const { fieldname, originalname, destination, filename, path, size } =
      req.file

    // const guideId = JSON.parse(guideInfo).token.id
    const guideId = 1

    await Models.Channel.create({
      RoomId: roomId,
    }, { transaction: sequelizeTransaction })

    await Models.ChannelSetConfig.create({
      RoomId: roomId,
      Title: title,
      Host: guideId,
      Thumbnail: filename,
      BrandConfig: brandConfig
    }, { transaction: sequelizeTransaction }).then((result) => {
      return result
    })


    await sequelizeTransaction.commit()
    res.status(200).json('roomCreate sucess')
  } catch (err) {
    console.log(err)
    res.status(400).json(err)
    await sequelizeTransaction.rollback()
  }
})



router.post('/createChatLog', async (req, res) => {
  try {
    const { RoomId, User, Text } = req.body
    await Models.ChannelChatLog.create({
      RoomId: RoomId,
      User: User,
      Text: Text
    })
    res.status(200).json('Chat log added')
  } catch (err) {
    res.status(400).json(err)
  }
})




router.post('/recordMediaUpload/:sid', recResourceUpload, async (req, res) => {
  const sequelizeTransaction = await sequelize.transaction()
  try {
    const { sid } = req.params
    const { title, brandConfig } = req.body
    const { thumbnail, media } = req.files



    if (thumbnail[0].mimetype.split('/')[0] !== 'image') throw ('Invalid thumbnail type error')
    if (media[0].mimetype.split('/')[0] !== 'video') throw ('Invalid media type error')


    let hostInfo = await Models.Sessions.findOne({
      where: { sid: sid },
      attributes: ['data']
    })

    if (hostInfo == null) throw new Error('unAuthorizedError', 401, 'Session is expired! Please login again')


    const { data } = hostInfo

    const { Id } = JSON.parse(data).passport.user


    await Models.ChannelRecordManagementConfig.create({
      Media: media[0].filename,
      FileSize: media[0].filename,
      Thumbnail: thumbnail[0].filename,
      Title: title,
      Host: Id,
      RoomBrand: brandConfig
    }, { transaction: sequelizeTransaction })
    await sequelizeTransaction.commit()

    res.status(200).json('recordMediaUpload success')
  } catch (err) {
    console.log(err.message)
    switch (err.message) {
      case 'unAuthorizedError':
        return res.status(401).json(err)
      case 'BadRequest':
        return res.status(400).json(err)
      default:
        return res.status(500).json(err)
    }
  }
})

// router.get('/recordResources/:sid', async(req,res, next)=>{
router.get('/recordResources/:sid', async (req, res, next) => {

  try {
    const { sid } = req.params

    let hostInfo = await Models.Sessions.findOne({
      where: { sid: sid },
      attributes: ['data']
    })
    if (hostInfo == null) throw new Error('unAuthorizedError', 401, 'Session is expired! Please login again')

    const { data } = hostInfo

    const { Id } = JSON.parse(data).passport.user


    let recordResources = await Models.ChannelRecordManagementConfig.findAll({
      where: { Host: Id },
      order: [['createdAt', 'DESC']],
      attributes: ['Id', 'Media', 'Thumbnail', 'Title', 'RoomBrand', 'createdAt']
    })

    res.status(200).json(recordResources)
  } catch (err) {
    console.log(err.message)
    switch (err.message) {
      case 'unAuthorizedError':
        return res.status(401).json(err)
      case 'BadRequest':
        return res.status(400).json(err)
      default:
        return res.status(500).json(err)
    }
  }
})

// session destroy 
router.post('/guideLogout/:sid', async (req, res) => {
  try {
    res.status(201).json('logout successfully')
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/insert', async (req, res) => {
  // const Models = require("../../../models");

  // 판매점 세팅 추가
  async function StoreSetting() {
    console.log("----------------------");
    console.log("----------------------");
    console.log("StoreSetting");
    const a = await Models.StoreSetting.create({
      StoreNeme: "브이알에듀",
      RegistrationNumber: 1111111111,
    });
    const b = await Models.StoreSetting.create({
      StoreNeme: "홍차사업자",
      RegistrationNumber: 2222222222,
    });
    const c = await Models.StoreSetting.create({
      StoreNeme: "모니터사업자",
      RegistrationNumber: 3333333333,
    });
    const d = await Models.StoreSetting.create({
      StoreNeme: "화장품업체",
      RegistrationNumber: 4444444444,
    });
    const e = await Models.StoreSetting.create({
      StoreNeme: "본체회사",
      RegistrationNumber: 5555555555,
    });
    const f = await Models.StoreSetting.create({
      StoreNeme: "애플",
      RegistrationNumber: 6666666666,
    });
    const g = await Models.StoreSetting.create({
      StoreNeme: "에어컨업체",
      RegistrationNumber: 7777777777,
    });
    console.log("----------------------");
    console.log("----------------------");
  }
  // ------------------------------------------------------------------------
  // 판매점 세팅
  async function StoreDelivery() {
    console.log("----------------------");
    console.log("----------------------");
    console.log("StoreDelivery");
    const a = await Models.StoreDelivery.create({
      TypeTitle: "도서판매",
      DefaultDeliveryPay: 3000,
      FreeShipping: 50000,
      StoreSettingId: 1,
    });
    const b = await Models.StoreDelivery.create({
      TypeTitle: "용품판매",
      DefaultDeliveryPay: 2000,
      FreeShipping: 38000,
      StoreSettingId: 1,
    });
    console.log("----------------------");
    console.log("----------------------");
  }
  // ------------------------------------------------------------------------

  // 카테고리 추가
  async function Category() {
    console.log("----------------------");
    console.log("----------------------");
    console.log("Category");
    const a = await Models.Category.create({
      CategoryName: "컴퓨터",
      Url: 10000000,
      StoreSettingId: 1,
    });
    const b = await Models.Category.create({
      CategoryName: "가구",
      Url: 20000000,
      StoreSettingId: 1,
    });
    console.log("----------------------");
    console.log("----------------------");
  }
  // ------------------------------------------------------------------------
  // 상품 추가
  async function Product() {
    console.log("----------------------");
    console.log("----------------------");
    console.log("Product");
    const a = await Models.Product.create({
      ProductName: "전자레인지 A",
      RetailPrice: 13000,
      DiscountPrice: 11300,
      DetailsPage: "전자레인지 상세 설명",
      SizeX: 180,
      SizeY: 70,
      SizeZ: 50,
      Weight: 80,
      CategoryId: 1,
      StoreSettingId: 1,
    });
    const b = await Models.Product.create({
      ProductName: "전자레인지 B",
      RetailPrice: 14000,
      DiscountPrice: 11400,
      DetailsPage: "전자레인지 상세 설명",
      SizeX: 190,
      SizeY: 70,
      SizeZ: 50,
      Weight: 90,
      CategoryId: 1,
      StoreSettingId: 1,
    });
    const c = await Models.Product.create({
      ProductName: "전자레인지 C",
      RetailPrice: 15000,
      DiscountPrice: 11500,
      DetailsPage: "전자레인지 상세 설명",
      SizeX: 200,
      SizeY: 70,
      SizeZ: 50,
      Weight: 100,
      CategoryId: 1,
      StoreSettingId: 1,
    });
    console.log("----------------------");
    console.log("----------------------");
  }
  // ------------------------------------------------------------------------
  // ------------------------------------------------------------------------
  StoreSetting()
  StoreDelivery()
  Category()
  Product()

  // ------------------------------------------------------------------------
  // StoreSetting()
})


router.post('/addLike', async (req, res) => {
  const sequelizeTransaction = await sequelize.transaction()
  try {
    const { RoomId, UserSocketId, action } = req.body
    await Models.ChannelLikeLog.create({
      RoomId: RoomId,
      User: UserSocketId,
      Like: action
    }, { transaction: sequelizeTransaction })

    await sequelizeTransaction.commit()

    res.status(200).json('add like to the channel success')
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

router.post('/guideLogin', passport.authenticate('local'), (req, res, next) => {
  try {
    console.log('login post request from client')
    console.log(req.session)
    console.log(req.sessionID)
    let sessionToken = req.sessionID
    res.status(200).json({ token: sessionToken })
  } catch (err) {
    console.error(err)
  }
})

router.post('/authenticate', async (req, res, next) => {
  try {
    const { userToken } = req.body
    console.log('아래는 클라이언트로 부터 받은 세션 아이디 토큰 값')
    console.log(userToken)

    if (userToken == null) {
      return res.status(401).json({ isSessionValid: false })
    }
    let matchedData = await Models.Sessions.findOne({
      where: { sid: userToken },
      attributes: ['data']
    })
    if (matchedData == null) {
      return res.status(404).json({ isSessionValid: false })
    }
    const { data } = matchedData

    const AuthenticatedInfo = JSON.parse(data).passport.user
    return res.status(200).json({ isSessionValid: true })
  } catch (err) {
    console.error(err)
  }
})

router.post('/addPeer', async (req, res) => {
  const sequelizeTransaction = await sequelize.transaction()
  try {
    const { RoomId, User, Status } = req.body
    await Models.ChannelConcurrentUserLog.create({
      RoomId: RoomId,
      User: User,
      Status: Status
    }, { transaction: sequelizeTransaction })
    await sequelizeTransaction.commit()
    res.status(200).json(`${User} successfully joined to room : ${RoomId}`)
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

router.put('/addPeer', async (req, res, next) => {
  const sequelizeTransaction = await sequelize.transaction()
  try {
    const { User, Status } = req.body
    await Models.ChannelConcurrentUserLog.update(
      { Status: Status },
      { where: { User: User } },
      { transaction: sequelizeTransaction }
    )
    await sequelizeTransaction.commit()
    res.status(200).json(`${User} status disconnected`)
  } catch (err) {
    console.error(err)
    res.status(500).json(err)
  }
})

module.exports = router
