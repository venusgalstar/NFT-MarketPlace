const models = require("../../author/models/author");
const Bid = models.bid;
const mongoose = require('mongoose');

const CreateBid = async(req, res) =>
{
    console.log("CreateBid post accept"); 
    const new_Bid = new Bid(
        {
            ...req.body
        });
    await new_Bid.save(function(err){
        if(!err)
            res.status(200).send({success:true, message:"Successfully create a new Bid"});
        else
            res.status(500).send({success:false, message:"Internal server Error"});
    });    
}

//exception
const DeleteBid = (req, res) =>
 {
    console.log("DeleteBid 0");
    Bid.deleteOne({_id:req.params.id}, function(err){
        if(!err)
            res.status(200).send({success:true, message:"Successfully delete a new Bid"});
        else
            res.status(500).send({success:false, message:"Internal server Error"});
    });
 }

//exception
const UpdateBid = async(req, res) =>
 {
    console.log("UpdateBid 0");
    try{
        await Bid.updateOne(
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
        console.log("Updating bid : " + err.message);
        res.status(500).send({success:false, message:"Internal server Error"});
        return;
    }    
    console.log("Updating bid : succeed.");
    res.status(200).json({success:true, message:"Successfully Update a BId"})     
 }

// modify
const FindBid = (req, res) =>
{
    console.log("FindBid 0");
    Bid.find({}, function (err, docs){      
      if(err)
      {
        console.log("Bid doesn't exisit"+ err.message);
        res.status(500).send({success:false, message:"Internal server Error"});
      }
      else
      {        
        return res.status(200).send({success:true, data: docs, message:"success"});
      }
    });
}

const FindOneBid = (req, res) =>
 {
    console.log("FindOneBid ");
    Bid.findOne({_id:req.params.id}, function (err, docs) {     
      if(err)
      {
        console.log("Bid doesn't exisit"+ err.message);
        res.status(500).send({success:false, message:"Internal server Error"});
      }
      else
      {        
        if(docs !== null && docs !== undefined)  return res.status(200).send({success:true, data: docs, message:"success"});
        else return res.status(404).send({success:true, data:[], message:"Can not find bid"});      
      }
    });
}

/// not check


const CountBid = (req, res) =>
{

}


module.exports = {
    CreateBid,
    DeleteBid,
    UpdateBid, 
    FindBid, 
    FindOneBid, 
    CountBid
};
