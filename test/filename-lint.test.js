// temporary test
'use strict';

var fileNameLint = require( process.cwd() + '/lib/filedirname-lint' );

require( 'should' );

var config = {
	'globRegexp' : {
		'test/test-files/**/*.html' : 'DASHED',
		'test/test-files/**/*.js'   : 'CAMEL_CASE'
	}
};

describe( 'filedirname-lint', function () {

	before( function () {
		console.log( fileNameLint );
		console.log( config );
	} );

	it( 'should work as expected', function () {
		true.shoud.be.equal( true );
	} );

} );
