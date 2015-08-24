'use strict';

var pathLint = require( process.cwd() + '/lib/pathlint' );

require( 'should' );

describe( 'pathlint', function () {

	describe( 'camelCase with directories ENABLED', function () {

		var checkResults = {};
		var config       = {
			'nodir'      : false,
			'globRegexp' : {
				'test/test-files/camelCase/*' : 'CAMEL_CASE'
			}
		};

		before( function ( done ) {
			pathLint( config, function ( err, results ) {

				if ( err ) {
					console.log( err );
				}

				checkResults = results;
				done();

			} );
		} );

		it( 'should return WITH directories', function () {
			checkResults[ 'test/test-files/camelCase/*' ].should.have
				.property( 'test/test-files/camelCase/camelCaseDir1' );
			checkResults[ 'test/test-files/camelCase/*' ].should.have
				.property( 'test/test-files/camelCase/camelCaseDir2' );
		} );

	} );

	describe( 'camelCase with directories DISABLED', function () {

		var checkResults = {};
		var config       = {
			'nodir'      : true,
			'globRegexp' : {
				'test/test-files/camelCase/*' : 'CAMEL_CASE'
			}
		};

		before( function ( done ) {
			pathLint( config, function ( err, results ) {

				if ( err ) {
					console.log( err );
				}

				checkResults = results;
				done();

			} );
		} );

		it( 'should return WITHOUT directories', function () {
			checkResults[ 'test/test-files/camelCase/*' ].should.not
				.have.property( 'test/test-files/camelCase/camelCaseDir1' );
			checkResults[ 'test/test-files/camelCase/*' ].should.not
				.have.property( 'test/test-files/camelCase/camelCaseDir2' );
		} );

	} );

	describe( 'camelCase removeFileExtensions ENABLED', function () {

		var checkResults = {};
		var config       = {
			'removeFileExt' : false,
			'globRegexp'    : {
				'test/test-files/camelCase/*' : 'CAMEL_CASE'
			}
		};

		before( function ( done ) {
			pathLint( config, function ( err, results ) {

				if ( err ) {
					console.log( err );
				}

				checkResults = results;
				done();

			} );
		} );

		it( 'should return with filenames with no fileExtensions checked', function () {
			checkResults[ 'test/test-files/camelCase/*' ]
				[ 'test/test-files/camelCase/testJavascript1.js' ].should.be.equal( false );
			checkResults[ 'test/test-files/camelCase/*' ]
				[ 'test/test-files/camelCase/testJavascript1.js' ].should.be.equal( false );
		} );

	} );

	describe( 'check with a regex not in the presets (custom regex)', function () {

		var checkResults = {};
		var config       = {
			'globRegexp' : {
				'test/test-files/camelCase/*' : new RegExp( /^([^0-9]*)$/ )
			}
		};

		before( function ( done ) {
			pathLint( config, function ( err, results ) {

				if ( err ) {
					console.log( err );
				}

				checkResults = results;
				done();

			} );
		} );

		it( 'should return with filenames checked with custom regex', function () {
			checkResults[ 'test/test-files/camelCase/*' ]
				[ 'test/test-files/camelCase/testJavascript1.js' ].should.be.equal( false );
			checkResults[ 'test/test-files/camelCase/*' ]
				[ 'test/test-files/camelCase/testJavascript1.js' ].should.be.equal( false );
		} );

	} );

	describe( 'globRegexp is not passed', function () {

		var checkResults = {};
		var config       = {}; // there are no arguments passed

		before( function ( done ) {
			pathLint( config, function ( err, results ) {

				if ( err ) {
					console.log( err );
				}

				checkResults = results;
				done();

			} );
		} );

		it( 'should return empty result', function () {
			Object.keys( checkResults ).length.should.equal( 0 );
		} );

	} );

	describe( 'an error occurred during globbing', function () {

		var proxyquire = require( 'proxyquire' );

		var globStub = function ( globStr, options, callback ) {
			callback( new Error( 'An error occurred while globbing' ), {} );
		};

		var pathLintProxy = proxyquire( process.cwd() + '/lib/pathlint', { 'glob' : globStub } );

		var checkResults = {};

		var config = {
			'globRegexp' : {
				'test/test-files/camelCase/*' : new RegExp( /^([^0-9]*)$/ )
			}
		};

		var inducedError;

		before( function ( done ) {
			pathLintProxy( config, function ( err, results ) {

				if ( err ) {
					inducedError = err;
				}

				checkResults = results;
				done();

			} );
		} );

		it( 'should return an error', function () {
			inducedError.should.be.an.instanceOf( Error );
			inducedError.message.should.be.equal( 'An error occurred while globbing' );
			Object.keys( checkResults ).length.should.equal( 0 );
		} );

	} );

	describe( 'when a string pattern is passed and it is not one of the presets', function () {

		var checkResults = {};

		var config = {
			'globRegexp' : {
				'test/test-files/camelCase/*' : 'INVALID_PATTERN_NAME'
			}
		};

		var inducedError;

		before( function ( done ) {
			pathLint( config, function ( err, results ) {

				if ( err ) {
					inducedError = err;
				}

				checkResults = results;
				done();

			} );
		} );

		it( 'should return an error', function () {
			inducedError.should.be.an.instanceOf( Error );
			inducedError.message.should.be.equal( 'Invalid pattern for "test/test-files/camelCase/*"' );
			Object.keys( checkResults ).length.should.equal( 0 );
		} );

	} );

} );
