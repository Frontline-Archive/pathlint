'use strict';

var messageLint = require( process.cwd() + '/lib/adapters/message-lint' );

require( 'should' );

describe( 'messagelint', function () {
	var res;

	var args = {
		'osPaths'    : [ 'test/test-files/messageType/messageType1.js' ],
		'results'    : { 'test/test-files/messageType/*' : {} },
		'errCounter' : 0,
		'testPath'   : 'test/test-files/messageType/*',
		'pattern'    : /^[a-z]+([^\W_]*$)/
	};

	describe( 'when invoked', function () {
		before( function () {
			res = messageLint( args );
		} );

		it( '-- should return correct object', function () {
			res.results[ 'test/test-files/messageType/*' ].should.have
				.property( 'test/test-files/messageType/messageType1.js' )
				.and.have.property( 'v1Test' ).and.be.equal( true );
		} );
	} );

	describe( 'when linting error occurs', function () {
		before( function () {
			args.osPaths = [ 'test/test-files/messageType/messageType2.js', 'test/test-files/camelCase/testJavascript2.js' ];

			res = messageLint( args );
		} );

		it( '-- should return result with error', function () {
			res.results[ 'test/test-files/messageType/*' ].should.have
				.property( 'test/test-files/messageType/messageType2.js' )
				.and.have.property( 'v1.Test' ).and.be.equal( false );
		} );
	} );

} );
