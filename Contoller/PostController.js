
const { isValidObjectId } = require('mongoose');
const PostSchema=require('../Model/PostSchema');
const joi =require('joi');

const { validatePost }=require("../Validator/PostValidator")

module.exports.GetAllPosts=async (req,res)=>{

   

    const data=await PostSchema.find().sort({_id: -1});

   return res.status(200).send({data});

    
};



module.exports.GetPostDetailById=async (req,res)=>{

    const {id}=req.params;

    if(!isValidObjectId(id))
    {
        return res.status(400).send({message:"Invalid object Id"});
    }

    const data=await PostSchema.findById(id);

    if(!data)
    {
        return res.status(404).send({message:"Post not found"})

    }

    return res.status(200).send({data})



    
};


module.exports.DeletePostById=async(req,res)=>{

    const {id}=req.params;

    if(!isValidObjectId(id))
    {
        return res.status(400).send({message:"Invalid object Id"});
    }

    const data=await PostSchema.findOneAndDelete({_id: id});

    if(!data.rowCount ===0)
    {
        return res.status(404).send({message:"No Data found to delete with that Id"})

    }

    return res.status(200).send({data});



    
};

///  Update api 


module.exports.UpdatePostDeailsById= async (req,res)=>{

    
//id data

const {
    body,
    params:{id},
}=req;

if(!isValidObjectId(id) )
{
    return res.status(400).send({message:"Invalid object id"});
}

const {error,value}=validatePost({body});

if(error)
{
    return res.status(404).send({message:"invalid form data"});
}

const data=await PostSchema.findOneAndUpdate({_id:id},{...value});

if(!data)
{
    return res.status(404).send({message:"No data found"});
}

return res.status(200).send({data});


}

module.exports.AddPost=async (req,res)=>{

const {body}=req;

const {error,value}=validatePost({ body });

if(error)
{
    return res.status(400).send({error, message:"Invalid form data"});
}

const newPost=new PostSchema({...value});

const post = await newPost.save();

if(!post)
{
    return res.status(404).send({message:"Empty Post object"});
}

 res.status(200).send({data:post,message:"Data Added Successfully"});


}