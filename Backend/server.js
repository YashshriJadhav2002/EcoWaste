
require('dotenv').config() //attach the environment variables to process object

const express = require('express')
const mongoose = require('mongoose')

//Importing routes
const buyerRegister = require('./routes/vendor/buyerRegister')
const sellerRegister = require('./routes/sellerRegister')
const companyRegister = require('./routes/companyRegister')
const companyLogin = require('./routes/companyLogin')
const buyerLogin = require('./routes/vendor/buyerLogin')
const sellerLogin = require('./routes/sellerLogin')
const pricePrediction = require('./routes/pricePrediction')
const product = require('./routes/exactPrice')
const profile=require('./routes/seller_Profile')
const sellerExactPrice=require('./routes/seller_ExactPrice')
const sellerBuyRefurbishedProduct=require('./routes/sellerBuyRefurbishedProduct')
const sellerSellingPrice=require('./routes/seller_sellingPrice')

const sellerHome = require('./routes/sellerHome')
const updateprofile=require('./routes/supdateprofile')
const exactPrice=require('./routes/exactPrice')
const sellProduct = require('./routes/sellProduct')
const sellerCart = require('./routes/sellerCart')
const sellerHistory=require('./routes/seller_History')
const deleteSellerHistory = require('./routes/deleteSellerHistory')
const vendorHome = require('./routes/vendor/vendorHome')
const vendorProfile=require('./routes/vendor/buyerProfile')
const vendorUpdateProfile=require('./routes/vendor/bprofileupdate')
const vendorExactPrice=require('./routes/vendor/vendorExactPrice')
const vendorPricePrediction = require('./routes/vendor/vendorPricePrediction')
const vendorSellPrice = require('./routes/vendor/VendorSellPrice')
const sellRefurbishedProduct = require('./routes/vendor/sellRefurbishedProduct')
const vendorCart = require('./routes/vendor/VendorCart')

const buyProduct = require('./routes/vendor/buyProduct')
const vendorHistory = require('./routes/vendor/vendorHistory')
const deleteVendorHistory = require('./routes/vendor/deleteVendorHistory')
const contactMail = require('./routes/contactMail')
const sellerVerify=require('./routes/sellerVerify')
const app = express()

//middleware
app.use(express.json())
app.use((req, res, next) => {

    console.log(req.path, req.method)
    next()

})

//route 
app.use('/api/seller/register',sellerRegister)
app.use('/api/buyer/register', buyerRegister)
app.use('/api/company/register', companyRegister)
app.use('/api/seller/login', sellerLogin)
app.use('/api/buyer/login', buyerLogin)
app.use('/api/company/login', companyLogin)
app.use('/api/product/prediction', pricePrediction)
app.use('/api/product/details', product)
app.use('/api/seller/update/profile', updateprofile)
app.use('/api/seller/profile',profile)
app.use('/api/seller/home',sellerHome)
app.use('/api/seller/exactprice',sellerExactPrice)
app.use('/api/seller/product/buy',sellerBuyRefurbishedProduct)
app.use('/api/seller/sellerSellingPrice',sellerSellingPrice)

app.use('/api/product/exactPrice',exactPrice)
app.use('/api/product/sell',sellProduct)
app.use('/api/product/cart',sellerCart)
app.use('/api/product/history',sellerHistory)
app.use('/api/product/deletehistory',deleteSellerHistory)
app.use('/api/vendor/home',vendorHome)
app.use('/api/vendor/profile',vendorProfile)
app.use('/api/vendor/update/profile',vendorUpdateProfile)
app.use('/api/vendor/exactprice',vendorExactPrice)
app.use('/api/refurbishedproduct/prediction', vendorPricePrediction)
app.use('/api/vendor/product/buy',buyProduct)
app.use('/api/vendor/refurbishedproduct/sell',vendorSellPrice)
app.use('/api/vendor/history',vendorHistory)
app.use('/api/vendor/history/delete',deleteVendorHistory)
app.use('/api/contact/email',contactMail)
app.use('/api/refurbishedproduct/sell',sellRefurbishedProduct)
app.use('/api/vendor/cart',vendorCart)

app.use('/verify/', sellerVerify);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        //Start the express server
        app.listen(process.env.PORT, () => {
        console.log('Connected to DB and listening on port', process.env.PORT)

})
    })
    .catch((error) => {
        console.log(error)
    })
