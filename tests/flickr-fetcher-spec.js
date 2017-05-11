//flickr-fetcher-spec.js

const should = require('should');

describe('FlickrFetcher', function(){
	it('should exist', function(){
		const FlickrFetcher = require('../flickr-fetcher.js');
		should(FlickrFetcher).not.be.ok;
	});
})