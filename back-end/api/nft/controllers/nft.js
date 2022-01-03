const models = require("../../author/models/author");
const Nft = models.nfts;
const mongoose = require('mongoose');

 const CreateNfts = async(req, res) =>
 {
    console.log("CreateNfts post accept");
    console.log(req.body);
    const new_Nft = new Nft(
        {
            ...req.body
        });
    await new_Nft.save(function(err){
        if(!err)
            res.status(200).send({success:true, message:"Successfully create a new Nft"});
        else
            res.status(500).send({success:false, message:"Internal server Error : "});
    });    
 }

//exception
const DeleteNfts = (req, res) =>
 {
    console.log("DeleteNfts 0");
    Nft.deleteOne({_id:req.params.id}, function(err){
        if(!err)
            res.status(200).send({success:true, message:"Successfully delete a new Nft"});
        else
            res.status(500).send({success:false, message:"Internal server Error"});
    });
 }

//exception
const UpdateNfts = async(req, res) =>
{   
    console.log("UpdateNfts 0");
    try{
        await Nft.updateOne(
           { _id : req.params.id },
            {
                $set: {
                    ...req.body
                },
                $currentDate: {
                    ends: true,
                }
            },
            { upsert: true }
        );
    }catch(err) {
        console.log("Updating NFTs : " + err.message);
        res.status(500).send({success:false, message:"Internal server Error"});
        return;
    }    
    console.log("Updating NFTs : succeed.");
    res.status(200).json({success:true, message:"Successfully Update a NFT"})
}

// modify
const FindNfts = (req, res) =>
 {
    console.log("FindNfts 0");
    if((req.query.author !== undefined && req.query.author !== null) || (req.query.status !== undefined && req.query.status !== null))
    {
        const param = {};
        if (req.query.author) {
            param.author = req.query.author;
        }
        if (req.query.status) {
            param.status = req.query.status;
        }
        Nft.find(param).populate('author').exec(function (err, docs) {          
          if(err)
          {
            return res.status(500).send({success:false, message:"Internal server Error"});
          }
          else
          {       
            if(docs !== undefined && docs !== null ) return res.status(200).send({success:true, data: docs, message:"finding succeed."});
            else return res.status(404).send({success:false, message:"Cannot find such NFTs."});
          }
        });
    } else if (req.query.hash !== undefined && req.query.hash !== null) {
        Nft.findOne({'hash':req.query.hash}, function (err, docs) {
            if(err)
            {
              console.log("Nft doesn't exisit"+ err.message);
              res.status(500).send({success:false, message:"Internal server Error"});
            }
            else
            {        
              if(docs !== null && docs !== undefined)  return res.status(200).send({success:true, data: docs, message:"success"});
              else return res.status(404).send({success:true, data:[], message:"Can not find Nfts"});
            }
        });
    }
    else{
        Nft.find( function (err, docs) {          
          if(err)
          {
            console.log("Nft doesn't exisit"+ err.message);
            return res.status(500).send({success:false, message:"Internal server Error"});
          }
          else
          {       
            return res.status(200).send({success:true, data: docs, message:"success"});
          }
        });
    }
}

//exception
const GetNFTDetail = (req, res) =>
 {
    console.log("GetNFTDetail 0");
    Nft.findOne({_id:req.params.id}, function (err, docs) {
      if(err)
      {
        console.log("Nft doesn't exisit"+ err.message);
        res.status(500).send({success:false, message:"Internal server Error"});
      }
      else
      {        
	    if(docs !== null && docs !== undefined)  return res.status(200).send({success:true, data: docs, message:"success"});
        else return res.status(404).send({success:true, data:[], message:"Can not find Nfts"});       
      }
    });
}

/// not check


const CountNfts = (req, res) =>
{

}

const ShowcasesNfts = (req, res) =>
{

}

module.exports = {
    CreateNfts,
    DeleteNfts,
    UpdateNfts, 
    FindNfts, 
    GetNFTDetail, 
    CountNfts,
    ShowcasesNfts
};
