'use strict';

var linter     = require( process.cwd() + '/lib/index' );
var proxyquire = require( 'proxyquire' );

require( 'should' );

describe( 'linter', function () {
	var error, result;

	describe( 'when empty config is passed', function () {
		before(  function () {
			linter( {}, function ( err, res ) {
				error  = err;
				result = res;
			} );
		} );

		it( '-- should return error', function () {
			error.should.be.equal( 'No config found.' );
		} );
	} );

	describe( 'when unknown adapter is in config', function () {
		before(  function () {
			linter( { 'test' : 'unknown' }, function ( err, res ) {
				error  = err;
				result = res;
			} );
		} );

		it( '-- should return error', function () {
			error.test.should.be.equal( 'Unknown adapter in config.' );
		} );
	} );

	describe( 'when custom regex pattern is used', function () {
		before( function ( done ) {
			var config = {
				'pathLint' : {
					'nodir'      : true,
					'globRegexp' : {
						'test/test-files/withErrors/*' : 'test'
					}
				}
			};

			linter( config, function ( err, res ) {
				error  = err;
				result = res;
				done();
			} );
		} );

		it( '-- should return empty', function () {
			JSON.stringify( result ).should.be.equal( '{}' );
		} );
	} );

	describe( 'when unexpected error occurs', function () {
		before( function ( done ) {
			var config = {
				'pathLint' : {
					'nodir' : false,

					'globRegexp' : {
						'test/test-files/camelCase/*' : 'CAMEL_CASE'
					}
				}
			};

			var globStub = function ( path, options, callback ) {
				callback( 'error', null );
			};

			var pathLintProxy = proxyquire( process.cwd() + '/lib/index', { 'glob' : globStub } );

			pathLintProxy( config, function ( err, res ) {
				error  = err;
				result = res;
				done();
			} );
		} );

		it( '-- should return error', function () {
			error.pathLint.should.be.equal( 'error' );
		} );
	} );

	describe( 'when linting error occurs', function () {
		before( function ( done ) {
			var config = {
				'pathLint' : {
					'nodir' : true,

					'globRegexp' : {
						'test/test-files/withErrors/*' : 'CAMEL_CASE'
					}
				}
			};

			linter( config, function ( err, res ) {
				error  = err;
				result = res;
				done();
			} );
		} );

		it( '-- should return error', function () {
			error.pathLint.message.should.be.equal( '1' );
		} );
	} );

	describe( 'when linter executes successfully', function () {
		before( function ( done ) {
			var config = {
				'pathLint' : {
					'nodir'      : false,
					'globRegexp' : {
						'test/test-files/camelCase/*' : 'CAMEL_CASE'
					}
				},

				'messageLint' : {
					'globRegexp' : {
						'test/test-files/messageType/*' : 'CAMEL_CASE'
					}
				}
			};

			linter( config, function ( err, res ) {
				error  = err;
				result = res;
				done();
			} );
		} );

		it( '-- should return result object', function () {
			result.messageLint[ 'test/test-files/messageType/*' ].should.have
				.property( 'test/test-files/messageType/messageType1.js' );
			result.messageLint[ 'test/test-files/messageType/*' ].should.have
				.property( 'test/test-files/messageType/messageType2.js' );
		} );

		it( '-- should not return error object', function () {
			var hasError = error.pathLint === undefined;

			hasError.should.be.equal( true );
		} );
	} );
} );
