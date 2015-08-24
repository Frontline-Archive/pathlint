'use strict';

var gulp       = require( 'gulp' );
var mocha      = require( 'gulp-mocha' );
var istanbul   = require( 'gulp-istanbul' );
var pathLint   = require( './lib/pathlint' );
var prettyjson = require( 'prettyjson' );

gulp.task( 'test', [ 'path-lint' ], function () {

	var paths = {
		'cover' : [ 'lib/**/*.js' ],
		'test'  : [ 'test/*.js' ]
	};

	var mochaOpts = {
		'ui'       : 'bdd',
		'reporter' : 'spec',
		'bail'     : true,
		'globals'  : {
			'should' : require( 'should' )
		}
	};

	return gulp.src( paths.cover )
		.pipe( istanbul( { 'includeUntested' : true } ) )
		.pipe( istanbul.hookRequire() )
		.on( 'finish', function () {

			gulp.src( paths.test, { 'read' : false } )
				.pipe( mocha( mochaOpts )
					.on( 'error', function ( err ) {
						throw new Error( err );
					} ) )
				.pipe( istanbul.writeReports( {
					'reporters' : [ 'text', 'text-summary' ]
				} ) )
				.on( 'error', function ( err ) {
					throw new Error( err );
				} );
		} );
} );

gulp.task( 'path-lint', function ( done ) {

	var config = {
		'globRegexp' : {
			'lib/**/*'  : 'HYPHEN_CASE',
			'test/*.js' : 'HYPHEN_CASE',
			'bin/*'     : 'HYPHEN_CASE'
		}
	};

	pathLint( config, function ( err, results ) {

		console.log( prettyjson.render( results ) );

		if ( err ) {
			throw new Error( err );
		}

		done();

	} );

} );
