const express 	= require('express')
const router 	= express.Router()

const Todo 		= require('../models/todo.model')
const TodoCtrl 	= require('../constrollers/todo.controller')(Todo)

router.get('/todo', TodoCtrl.getTodo)
router.post('/todo', TodoCtrl.postTodo)
router.delete('/todo/:id', TodoCtrl.deleteTodo)
router.put('/todo/:id', TodoCtrl.updateTodo)

module.exports = router