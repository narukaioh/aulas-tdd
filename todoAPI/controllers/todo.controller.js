const Todo = require('../models/todo.model')

const TodoCtrl = {
	getTodo: function(req, res, next){
		Todo.find({}, function(err, todos){
			if(err) { res.json({status: false, error: "Something went wrong"} ) }
			res.json({status: true, todo: todos });
		});
	},
	postTodo: function(req, res, next){
		const todo = new Todo(req.body);
		todo.save(function(err, todo) {
			if (err) { res.json({status: false, error: "Something went wrong"}) }
			res.json({ status: true, message: "Todo saved!" })
		})
	},
	deleteTodo: function(req, res, next){
		Todo.remove({_id: req.params.id }, function(err, todos) {
			if (err) { 
				res.json({status: false, error: "Deleting todo is not successfull"});
				return
			}
			res.json({ status: true, message: "Status updated successfully"});

		})
	},
	updateTodo: function(req, res, next){}
}