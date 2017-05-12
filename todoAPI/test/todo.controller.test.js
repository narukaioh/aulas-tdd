"use strict";

const should = require('should'),
	sinon = require('sinon'),
	mongoose = require('mongoose');

require('sinon-mongoose');

const TodoModel = require('../models/todo.model');

describe('TodoController testing', function () {

	describe('Todo Post test', function () {

		it('Should save todo', function (done) {
			const todoMock = sinon.mock(new TodoModel({ todo: 'Save new todo from mock'}));
			const todo = todoMock.object;

			todoMock
			.expects('save')
			.yields(null, 'SAVED');

			todo.save(function(err, result) {
				todoMock.verify();
				todoMock.restore();
				should.equal('SAVED', result, "Test fails due to unexpected result")
				done();
			});
		});

	});

	describe('Get all Todo test', function () {
		it('Should call find once', function (done) {
			const TodoMock = sinon.mock(TodoModel);
			TodoMock
			.expects('find')
			.yields(null, 'TODOS');

			TodoModel.find(function (err, result) {
				TodoMock.verify();
				TodoMock.restore();
				should.equal('TODOS', result, "Test fails due to unexpected result")
				done();
			});
		});
	});

	describe('Delete todo test', function () {
		it('Should delete todo of gived id', function (done) {
			const TodoMock = sinon.mock(TodoModel);

			TodoMock
			.expects('remove')
			.withArgs({_id: 12345})
			.yields(null, 'DELETED');

			TodoModel.remove({_id: 12345}, function(err, result){
				TodoMock.verify();
				TodoMock.restore();
				done();
			})


		});
	});

	describe('Update a todo', function () {
		it('Should update the todo with new value', function (done) {
			const todoMock = sinon.mock(new TodoModel({ todo: 'Save new todo from mock'}));
			const todo = todoMock.object;

			todoMock
			.expects('save')
			.withArgs({_id: 12345})
			.yields(null, 'UPDATED');

			todo.save({_id: 12345}, function(err, result){
				todoMock.verify();
				todoMock.restore();
				done();
			})

		});
	});

});