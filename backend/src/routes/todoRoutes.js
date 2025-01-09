import express from 'express';
import { create_todo, read_todo ,delete_todo,edit_todo} from '../controllers/todoController.js';
import {isAuth} from '../middleware/isAuth.js';

const router=express.Router();

router.post('/create',isAuth,create_todo);
router.get('/read',isAuth,read_todo);

router.delete('/:id',isAuth,delete_todo);

router.patch('/edit/:id',isAuth,edit_todo)


export default router;