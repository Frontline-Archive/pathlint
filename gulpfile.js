'use strict';

var gulp       = require( 'gulp' );
var mocha      = require( 'gulp-mocha' );
var istanbul   = require( 'gulp-istanbul' );

gulp.task( 'test', function () {

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
