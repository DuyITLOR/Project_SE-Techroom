import express from 'express';
import { getDiscussion,createPost,deletePost,updatePost } from '../controllers/discussionController.js';   

const discussionRouter = express.Router();

discussionRouter.get('/discussion', getDiscussion);
discussionRouter.post('/discussion', createPost);
discussionRouter.delete('/discussion', deletePost);
discussionRouter.put('/discussion', updatePost);

export default discussionRouter