'use strict';

var fileNameLint = require( process.cwd() + '/lib/filedirname-lint' );

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
			fileNameLint( config, function ( err, results ) {
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
			fileNameLint( config, function ( err, results ) {
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
			fileNameLint( config, function ( err, results ) {
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
			fileNameLint( config, function ( err, results ) {
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

} );
