
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

const AuthorSchema = new Schema(  
    {
    "avatar": {
      type: String,
      default:"/5e543256c480ac577d30f76f9120eb74.jpeg"
    },
    "name": {
      type:String,
      required:true,
    },
    "username": {
      type:String,
      required:true,
    },
    "email": {
      type:String,
      required:true,
      unique:true
    },
    "password": {
      type: String,
      required: true
    },
    "banner": {
      type:String,
      default:""
    },
    "social": {
      type: String,
      required: false
    },
    "wallet": {
      type: String,
      required: false
    },
    "aproved": {
        type: Number,
        required: false,
        default : 0
    },
    "about": {
      type: String,
      default: ""
    },
    "minting_fee": {
      type: Number,
      default: 0
    },
    "selling_fee": {
      type: Number,
      default: 0
    },
    "phone":{
      type:String,
      default:""
    },
    "followers": {
      type: Number,
      default: 0
    },
    "bid": {
      type : mongoose.Schema.Types.ObjectId ,
      ref: 'Bid'
    },
    "nfts": {
      type : mongoose.Schema.Types.ObjectId ,
      ref: 'NFT'
    },
    "author_sales": {
      type : mongoose.Schema.Types.ObjectId ,
      ref: 'Authorsales'
    },
    "hot_collections": {
      type : mongoose.Schema.Types.ObjectId ,
      ref: 'Hot_collection'
    },
});

const BidSchema = new Schema(
{
    "value":{
        type:Number
    },
    "nft":{
      type : mongoose.Schema.Types.ObjectId ,
      ref:'nft'
    },
    "author":{
      type : mongoose.Schema.Types.ObjectId ,
      ref:'Author'
    },
});

const nftSchema = new Schema(
{
    "hash": {
        type:String,
        required: false
      },
      "category": {
        type: String,
        enum: [
          'art',
          'music',
          'domain_names',
          'virtual_world',
          'trading_cards',
          'collectibles',
          'sports',
          'utility'
        ]
      },
      "method": {
        type :  String,
         enum : [
           'buy_now',
           'on_auction' ,
           'has_offers'
        ],
        default: 'buy_now'
      },
      "item_type": {
         type :  String,
         enum : [
           'single_items' ,
           'bundles'
        ],
        default: 'single_items'
      },
      "collections": {
         type :  String ,
         enum : [
           'abstraction' ,
           'patternlicious' ,
           'skecthify' ,
           'cartoonism' ,
           'virtuland' ,
           'papercut'
        ],
        default: 'abstraction'
      },
      "start_date": {
          type: Date
      },
      "expiration_date": {
         type :  Date 
      },
      "item_title": {
         type :  String 
      },
      "item_price": {
         type :  Number 
      },
      "bid": {
         type :  Number 
      },
      "max_bid": {
         type :  Number 
      },
      "item_start_price": {
        type: Number
      },
      "item_unlock": {
        type: String
      },
      "item_desc": {
         type :  String 
      },
      "item_royalties": {
        type: Number
      },
      // "views": {
      //    type :  Number ,
      //    default : 0
      // },
      "bids": {
         type : mongoose.Schema.Types.ObjectId ,
         ref: 'Bid' 
      },
      "priceover": {
         type :  Number 
      },
      "author": {
         type : mongoose.Schema.Types.ObjectId ,
         ref: 'Author' 
      },
      "showcase": {
         type :  Boolean ,
         default : false
      },
      "token_type": {
        type :  String,
        enum : [
           'BNB' ,
           'SPC'
        ],
        default: 'BNB'
      },
      "status": {
        type: String,
        enum: [
          'created',
          'minted',
          'bought'
        ],
        default: 'created'
      }
    //   "preview_image": {
    //      model :  file ,
    //      via :  related ,
    //      allowedTypes : [
    //        images ,
    //        files ,
    //        videos 
    //     ],
    //      plugin :  upload ,
    //      required : false,
    //      pluginOptions : {}
    //   },
});

const AuthorsalesSchema = new Schema(
{
    "author":{
      type : mongoose.Schema.Types.ObjectId ,
      ref:'Author'
    },
    "daily_sales":{
        type:Number,
        default:0
    },
    "weekly_sales":{
        type:Number,
        default:0
    },
    "floor_price":{
        type:Number,
        default:0
    },
    "volume":{
        type:Number,
        default:0
    },
    "monthly_sales":{
        type:Number,
        default:0
    },
    "yearly_sales":{
        type:Number,
        default:0
    },
    "top_seller":{
        type:String,
        default:null
    },
    "top_buyer":{
        type:String,
        default:null
    },
});

const Hot_CollectionSchema = new Schema(
{
    "unique_id": {
        type :  String 
    },
    "banner": {
        type:String,
        default:null
    },
    "author":{
        type : mongoose.Schema.Types.ObjectId ,
        ref: 'Author'
    },
    "name": {
        type : String 
    }
});

const author = mongoose.model('Author', AuthorSchema, "authors");
const bid = mongoose.model('Bid', BidSchema, "bids");
const author_sales = mongoose.model('Authorsales', AuthorsalesSchema, "author_sales");
const nfts = mongoose.model('NFT', nftSchema, "nfts");
const hot_collections = mongoose.model('Hot_Collection', Hot_CollectionSchema, "hot_collections");

module.exports = {
  author, 
  bid,
  author_sales,
  nfts,
  hot_collections,
}
