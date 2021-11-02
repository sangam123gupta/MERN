const express =require('express');



const {

    GetAllPosts,
    GetPostDetailById,
    DeletePostById,

    UpdatePostDeailsById,

    AddPost,
} =require("../Contoller/PostController")

const router=express.Router();

router.get('/',GetAllPosts);

router.get('/:id',GetPostDetailById);

router.delete('/:id',DeletePostById);

router.put('/:id',UpdatePostDeailsById);

router.post('/',AddPost);






module.exports = router;

