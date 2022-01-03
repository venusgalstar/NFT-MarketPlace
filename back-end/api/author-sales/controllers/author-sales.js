
const mongoose = require('mongoose');
const models = require("../../author/models/author");
const Authorsales = models.author_sales;
 
 const CreateAuthorSales = async (req, res) =>
 {
    console.log("CreateAuthorsales post accept");
    const new_Authorsales = new Authorsales(
        {
            ...req.body
        });
    await new_Authorsales.save(function(err){
        if(!err)
            res.status(200).send({success:true, message:"Successfully create a new Authorsales"});
        else
            res.status(500).send({success:false, message:"Internal server Error"});
    });
 }

//exception
const DeleteAuthorSales = (req, res) =>
 {
    console.log("DeleteAuthorSales 0");
    Authorsales.deleteOne({_id:req.params.id}, function(err){
        if(!err)
            res.send({success:true, message:"Successfully delete a new Authorsales"});
        else
            res.status(500).send({success:false, message:"Internal server Error"});
    });
 }

//exception
const UpdateAuthorSales = async(req, res) =>
 {
   try{
    await Authorsales.updateOne(
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
        console.log("Updating author sale : " + err.message);
        res.status(500).send({success:false, message:"Internal server Error"});
        return;
    }    
    console.log("Updating author sale: succeed.");
    res.status(200).json({success:true, message:"Successfully Update a Author Sales. "})
}

const FindAuthorSales = (req, res) =>
 {
    console.log("FindAuthorSales 0" );
    Authorsales.find({}, function (err, docs) {      
      if(err)
      {
        console.log("Author sales doesn't exisit"+ err.message);
        res.status(500).send({success:false, message:"Internal server Error"});
      }
      else
      {        
        return res.status(200).send({success:true, data: docs, message:"success"});
      }
    });
}

const FindOneAuthorSales = (req, res) =>
 {
    console.log("FindOneAuthorsales " + req.body.username);
    Authorsales.findOne({_id:req.params.id}, function (err, docs) {
      console.log("err : "+err);
      if(err)
      {
        console.log("Author sales doesn't exisit"+ err.message);
        res.status(500).send({success:false, message:"Internal server Error"});
      }
      else
      {        
        if(docs !== null && docs !== undefined)  return res.status(200).send({success:true, data: docs, message:"success"});
        else return res.status(404).send({success:false, data:[], message:"Can't find such author sales."});
      }
    });
}

/// not check
const CountAuthorSales = (req, res) =>
{

}


module.exports = {
    CreateAuthorSales,
    DeleteAuthorSales,
    UpdateAuthorSales, 
    FindAuthorSales, 
    FindOneAuthorSales, 
    CountAuthorSales
};
