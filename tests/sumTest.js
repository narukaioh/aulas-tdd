const should = require('should');
const sum = require('../sum');

describe('sum.js', function(){
	it( 'sum of 2 + 3 should return 5', function(){
		sum(2,3).should.be.equal(5);
	});
	it( 'sum of 10 + 10 should return 20', function(){
		sum(10,10).should.be.equal(20);
	});
	it( 'If any parameter is not number, should return undefined', function(){
		should( sum(1, 'arroz') ).not.be.ok;
	})
});