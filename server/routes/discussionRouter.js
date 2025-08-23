import express from 'express';
import { getDiscussion,createPost,deletePost,updatePost } from '../controllers/discussionController.js';   
import upload from '../middlewares/uploads.js';

const discussionRouter = express.Router();

discussionRouter.get('/discussion', getDiscussion);
discussionRouter.post('/discussion',upload.array("link", 10), createPost);
discussionRouter.delete('/discussion', deletePost);
discussionRouter.put('/discussion', updatePost);

export default discussionRouter