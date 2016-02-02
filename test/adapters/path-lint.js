'use strict';

var pathLint = require( process.cwd() + '/lib/adapters/path-lint' );

require( 'should' );

describe( 'pathlint', function () {
	var res;

	var args = {
		'osPaths'    : [ 'test/test-files/camelCase/camelCaseDir1', 'test/test-files/camelCase/camelCaseDir2' ],
		'results'    : { 'test/test-files/camelCase/*' : {} },
		'errCounter' : 0,
		'testPath'   : 'test/test-files/camelCase/*',
		'pattern'    : /^[a-z]+([^\W_]*$)/
	};

	describe( 'when invoked', function () {
		before( function () {
			res = pathLint( args );
		} );

		it( '-- should return correct object', function () {
			res.results[ 'test/test-files/camelCase/*' ].should.have
				.property( 'test/test-files/camelCase/camelCaseDir1' );
			res.results[ 'test/test-files/camelCase/*' ].should.have
				.property( 'test/test-files/camelCase/camelCaseDir2' );
		} );
	} );

	describe( 'when linting error occurs', function () {
		before( function () {
			args.osPaths = [ 'test/test-files/camelCase/testJavascript1.js', 'test/test-files/withErrors/testWith-Errors.js' ];

			res = pathLint( args );
		} );

		it( '-- should return result with error', function () {
			res.results[ 'test/test-files/camelCase/*' ].should.have
				.property( 'test/test-files/withErrors/testWith-Errors.js' );
		} );
	} );
} );
