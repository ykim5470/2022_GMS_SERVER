'use strict'

const express = require('express')
const passport = require('../middle/passport')
const { v4: uuidV4 } = require('uuid')
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
router.get('/createRoomNumber', (req, res) => {
  const randomRoomId = uuidV4()
  try {
    return res.status(200).json({ roomId: randomRoomId })
  } catch (err) {
    return res.status(404).json(err)
  }
})


/**
 * Room Information
 * @returns {Array}
 */
router.get('/roomInfo/:id', async(req,res)=>{
  const {id} = req.params

  let roomTitle = await Models.ChannelSetConfig.findOne({
    where: {RoomId: id},
    attributes: ['Title']
  })

  let likeLog = await Models.ChannelLikeLog.findAll({
    where: {RoomId: id}
  })
  
  
  let likeCountTotal = likeLog.length

  console.log(likeCountTotal)

  const {Title} = roomTitle
  
  return res.status(200).json({
    title: Title,
    likeCountTotal: likeCountTotal
  })
})


/**
 * Host Information
 * @returns {Array}
 */
 router.get('/hostInfo/:id', async(req,res)=>{
  const {id} = req.params

  let hostId = await Models.ChannelSetConfig.findOne({
    where: {RoomId: id},
    attributes: [ 'Host']
  })

  const { Host} = hostId 
  let hostInfo = await Models.UserMy.findOne({
    where: {id: Host},
    attributes: ['nickName', 'profile_image']
  })

  const {nickName, profile_image} = hostInfo
  
  
  return res.status(200).json({
    nickName: nickName,
    profileImage : profile_image
  })
})

/**
 * brand Information
 * @returns {Array}
 */
 router.get('/brandInfo/:id', async(req,res)=>{
  const {id} = req.params


  let brandInfoJson = await Models.ChannelSetConfig.findOne({
    where: {roomId : id},
    attributes : ['BrandConfig']
  })
  
  const {BrandConfig} = brandInfoJson

  let productList = await Promise.all(BrandConfig.map((el) => {
    let brandId = el.id
    let productItems =  Models.StoreProductDetail.findAll({
      where:  {StoreBrandId: brandId},
      attributes: ['Name', 'Price', 'Stock', 'Image']
    })
    return productItems
    }))    

  return res.status(200).json(
    productList
  )
})



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
  where:{IsActivate: 1},
  attributes: ['RoomId']
 })

 const roomListObject = JSON.parse(JSON.stringify(roomList, null, 2))


 res.status(200).json(roomListObject)
})

/**
 * brand items List
 * @returns {Array}
 */
router.get('/brandList', async(req,res)=>{
  try{
    let brandList = await Models.StoreBrand.findAll({
      attributes: ['Id','Name']
    })
    res.status(200).json(brandList)
    

  }catch(err){
    console.error(err)
    res.status(500).json(err)
  }
})


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
  try{
  const {
    guideInfo, title, roomId, brandConfig
  } = req.body
  const { fieldname, originalname, destination, filename, path, size } =
    req.file

  const guideId = JSON.parse(guideInfo).token.id
  
  await Models.Channel.create({
    RoomId: roomId,
  }, {transaction: sequelizeTransaction})

  await Models.ChannelSetConfig.create({
    RoomId: roomId,
    Title: title,
    Host: guideId,
    Thumbnail: filename,
    BrandConfig: brandConfig
  }, {transaction: sequelizeTransaction}).then((result) => {    
    return result
  })


  await sequelizeTransaction.commit()
  res.status(200).json('roomCreate sucess')
}catch(err){
  console.log(err)
  res.status(400).json(err)
  await sequelizeTransaction.rollback()
}
})


router.post('/createChatLog', async(req,res) =>{
 try{
	const {RoomId, User, Text} = req.body
	await Models.ChannelChatLog.create({
		RoomId: RoomId,
		User: User,
		Text: Text
	})
	res.status(200).json('Chat log added')
	}catch(err){
	res.status(400).json(err)}
 })


router.post('/recordMediaUpload',recResourceUpload.array('resources',  2), async(req,res)=>{
  try{
    const {roomId, title, host, roomCategory} = req.body
    
    let filesArray = []
    req.files.forEach(el => {
      const file = {
        fileName: el.originalname,
        filePath: el.path,
        fileType: el.mimetype, 
        fileSize: fileSizeFormatter(el.size,2)
      }
      filesArray.push(file)
    })
    
    let thumbnail = {}
    let media = {}
    if(filesArray.length !== 2){
      throw Error('Invalid upload count')
    }else{
      filesArray.map((el,idx) => {
        if(el.fileType.split('/')[0] === 'image') {return thumbnail = {...filesArray[idx]}}
        if(el.fileType.split('/')[0] === 'video')  {return media = {...filesArray[idx]}}
      })
    }
    
    await Models.ChannelRecordManagementConfig.create({
      RoomId: roomId,
      Media: media.fileName,
      FileSize: media.fileSize,
      Thumbnail: thumbnail.fileName,
      Title: title, 
      Host: host,
      RoomCategory:roomCategory,
    })

    
  res.status(200).json('recordMediaUpload success')
  }catch(err){
    console.log(err)
    res.status(400).json(err)
  }
})


router.post('/addLike', async(req,res)=>{
  const sequelizeTransaction = await sequelize.transaction()
  try{  
  const {RoomId, UserSocketId, action} = req.body
  await Models.ChannelLikeLog.create({
    RoomId: RoomId, 
    User: UserSocketId, 
    Like: action 
  },{transaction: sequelizeTransaction})

  await sequelizeTransaction.commit()

  res.status(200).json('add like to the channel success')
  }catch(err){
    console.log(err)
    res.status(500).json(err)
  }
})

router.post('/guideLogin',passport.authenticate('local'),(req,res,next)=>{
  try{
	console.log('login post request from client')
	console.log(req.session)
    res.status(200).json({token: req.session.passport.user})
  }catch(err){
    console.error(err)
  }
})

module.exports = router
