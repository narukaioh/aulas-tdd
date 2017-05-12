const sinon  	= require('sinon')
const chai 		= require('chai')
const expect 	= chai.expect

const mogoose 	= require('mongoose')
require('sinon-mongoose')

const Todo 		= require('../models/todo.model')

describe("Get all todo", function(){
	it("should returns get all todos", function(done){
		const TodoMock = sinon.mock(Todo)
		const expectResult = {status: true, todo: []}

		TodoMock.expects('find').yields(null, expectResult)
		Todo.find(function(err, result){
			TodoMock.verify()
			TodoMock.restore()
			expect(result.status).to.be.true;
			done()
		})
	})

	it('should return error', function(done){
		const TodoMock = sinon.mock(Todo)
		const expectResult = { status: false, error: "Something went wrong" }
		TodoMock.expects('find').yields(expectResult, null)
		Todo.find(function(err, result){
			TodoMock.verify()
			TodoMock.restore()
			expect(err.status).to.not.be.true
			done()
		})
	})
})

describe("Post a new todo", function(){
	it("should create new post", function(done){
		const TodoMock = sinon.mock(new Todo({ todo: 'Save new todo from mock'}));
		const todo = TodoMock.object;
		const expectedResult = { status: true };
		TodoMock.expects('save').yields(null, expectedResult);
		todo.save(function (err, result) {
			TodoMock.verify();
			TodoMock.restore();
			expect(result.status).to.be.true;
			done();
		});
	});
	// Test will pass if the todo is not saved
	it("should return error, if post not saved", function(done){
		const TodoMock = sinon.mock(new Todo({ todo: 'Save new todo from mock'}));
		const todo = TodoMock.object;
		const expectedResult = { status: false };
		TodoMock.expects('save').yields(expectedResult, null);
		todo.save(function (err, result) {
			TodoMock.verify();
			TodoMock.restore();
			expect(err.status).to.not.be.true;
			done();
		});
	});
});

describe("Update a new todo by id", function(){
	it("should updated a todo by id", function(done){
		const TodoMock = sinon.mock(new Todo({ completed: true}));
		const todo = TodoMock.object;
		const expectedResult = { status: true };
		
		TodoMock.expects('save').withArgs({_id: 12345}).yields(null, expectedResult);
		
		todo.save(function (err, result) {
			TodoMock.verify();
			TodoMock.restore();
			expect(result.status).to.be.true;
			done();
		});
	});
	
	it("should return error if update action is failed", function(done){
		const TodoMock = sinon.mock(new Todo({ completed: true}));
		const todo = TodoMock.object;
		const expectedResult = { status: false };
		
		TodoMock.expects('save').withArgs({_id: 12345}).yields(expectedResult, null);
		
		todo.save(function (err, result) {
			TodoMock.verify();
			TodoMock.restore();
			expect(err.status).to.not.be.true;
			done();
		});
	});

});

describe("Delete a todo by id", function(){
    it("should delete a todo by id", function(done){
        const TodoMock = sinon.mock(Todo);
        const expectedResult = { status: true };
        TodoMock.expects('remove').withArgs({_id: 12345}).yields(null, expectedResult);
        Todo.remove({_id: 12345}, function (err, result) {
            TodoMock.verify();
            TodoMock.restore();
            expect(result.status).to.be.true;
            done();
        });
    });

    it("should return error if delete action is failed", function(done){
        const TodoMock = sinon.mock(Todo);
        const expectedResult = { status: false };
        TodoMock.expects('remove').withArgs({_id: 12345}).yields(expectedResult, null);
        Todo.remove({_id: 12345}, function (err, result) {
            TodoMock.verify();
            TodoMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});

