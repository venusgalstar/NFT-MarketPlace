const models = require("../../author/models/author");
const Hot_Collection = models.hot_collections;
const mongoose = require('mongoose');

 const CreateHot_Collection = async(req, res) =>
 {
    console.log("CreateHot_Collection 0");
    const new_Hot_Collection = new Hot_Collection(
        {
            ...req.body
        });
    await new_Hot_Collection.save(function(err){
        if(!err)
            res.status(200).send({success:true, message:"Successfully create a new hot collection"});
        else
            res.status(500).send({success:false, message:"Internal server Error"});
    });    
 }


const DeleteHot_Collection = (req, res) =>
{
    console.log("DeleteHot_Collection 0");
    Hot_Collection.deleteOne({_id:req.params.id}, function(err){
        if(!err)
            res.status(200).send({success:true, message:"Successfully delete a new hot collection."});
        else
            res.status(500).send({success:false, message:"Internal server Error"});
    });
}

const UpdateHot_Collection = async(req, res) =>
 {
    console.log("UpdateHot_Collection 0");
    try{
        await Hot_Collection.updateOne(
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
        console.log("Updating hot collection : " + err.message);
        res.status(500).send({success:false, message:"Internal server Error"});
        return;
    }    
    console.log("Updating hot collection : succeed.");
    res.status(200).json({success:true, message:"Successfully Update a Hot Collection"})
    
 }

// modify
const FindHot_Collection = (req, res) =>
{
    console.log("FindHot_Collection 0");
    Hot_Collection.find({}, function (err, docs) {  
      if(err)
      {
        console.log("Hot collection doesn't exisit"+ err.message);
        res.status(500).send({success:false, message:"Internal server Error"});
      }
      else
      {        
        return res.status(200).send({success:true, data: docs , message:"success"});
      }
    });
}

//exception
const FindOneHot_Collection = (req, res) =>
 {
    console.log("FindOneHot_Collection 0" );
    Hot_Collection.findOne({_id:req.params.id}, function (err, docs) {
      if(err)
      {
        console.log("Hot collection doesn't exisit"+ err.message);
        res.status(500).send({success:false, message:"Internal server Error"});
      }
      else
      {
        if(docs !== null && docs !== undefined)  return res.status(200).send({success:true, data : docs, message:"success"});
        else return res.status(404).send({success:true, data: docs, message:"Can not find hot collections"});        
      }
    });
}

/// not check
const CountHot_Collection = (req, res) =>
{

}


module.exports = {
    CreateHot_Collection,
    DeleteHot_Collection,
    UpdateHot_Collection, 
    FindHot_Collection, 
    FindOneHot_Collection, 
    CountHot_Collection
};
