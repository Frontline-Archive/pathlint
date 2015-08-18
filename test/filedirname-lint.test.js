'use strict';

var fileDirNameLint = require( process.cwd() + '/lib/filedirname-lint' );

require( 'should' );

describe( 'filedirname-lint', function () {

	describe( 'camelCase with directories ENABLED', function () {

		var checkResults = {};
		var config       = {
			'nodir'      : false,
			'globRegexp' : {
				'test/test-files/camelCase/*' : 'CAMEL_CASE'
			}
		};

		before( function ( done ) {
			fileDirNameLint( config, function ( err, results ) {
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
			fileDirNameLint( config, function ( err, results ) {
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
			fileDirNameLint( config, function ( err, results ) {
				checkResults = results;
				done();
			} );
		} );

		it( 'should return with filenames with no fileExtensions checked', function () {
			checkResults[ 'test/test-files/camelCase/*' ]
				[ 'test/test-files/camelCase/testJavascript1.js' ].should.be.false;
			checkResults[ 'test/test-files/camelCase/*' ]
				[ 'test/test-files/camelCase/testJavascript1.js' ].should.be.false;
		} );

	} );

	describe( 'check with a regex not in the presets (custom regex)', function () {

		var checkResults = {};
		var config       = {
			'globRegexp'    : {
				'test/test-files/camelCase/*' : new RegExp( /^([^0-9]*)$/ )
			}
		};

		before( function ( done ) {
			fileDirNameLint( config, function ( err, results ) {
				checkResults = results;
				done();
			} );
		} );

		it( 'should return with filenames checked with custom regex', function () {
			checkResults[ 'test/test-files/camelCase/*' ]
				[ 'test/test-files/camelCase/testJavascript1.js' ].should.be.false;
			checkResults[ 'test/test-files/camelCase/*' ]
				[ 'test/test-files/camelCase/testJavascript1.js' ].should.be.false;
		} );

	} );

	describe( 'globRegexp is not passed', function () {

		var checkResults = {};
		var config       = {}; // there are no arguments passed

		before( function ( done ) {
			fileDirNameLint( config, function ( err, results ) {
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

		var fileDirNameLintProxy = proxyquire( process.cwd() + '/lib/filedirname-lint', { 'glob' : globStub } );

		var checkResults = {};

		var config = {
			'globRegexp'    : {
				'test/test-files/camelCase/*' : new RegExp( /^([^0-9]*)$/ )
			}
		};

		var inducedError;

		before( function ( done ) {
			fileDirNameLintProxy( config, function ( err, results ) {

				if ( err )
					inducedError = err;

				checkResults = results;

				done();
			} );
		} );

		it( 'should retun an error', function () {
			inducedError.should.be.an.instanceOf( Error );
			inducedError.message.should.be.equal( 'An error occurred while globbing' );
		} )

	} );

} );
