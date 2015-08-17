'use strict';

var gulp            = require( 'gulp' );
var mocha           = require( 'gulp-mocha' );
var prettyjson      = require( 'prettyjson' );
var istanbul        = require( 'gulp-istanbul' );
var fileDirNameLint = require( './lib/filedirname-lint' );

gulp.task( 'test', function () {

    var paths = {
        'cover' : [
            '!lib/**/presets.js',
            'lib/**/*.js'
        ],
        'test' :  [ 'test/(!test-files/)/*.js' ]
    };

    var mochaOpts = {
		'ui' :       'bdd',
		'reporter' : 'spec',
		'bail' :     true,
		'globals' :  {
			'should' : require( 'should' )
		}
	};

    return gulp.src( paths.cover )
        .pipe( istanbul( { 'includeUntested' : true } ) )
        .pipe( istanbul.hookRequire() )
        .on( 'finish', function () {

            gulp.src( paths.test, { 'read' : false } )
                .pipe( mocha( mochaOpts )
                    .on( 'error', function() {
                        process.exit( 1 );
                    } ) )
                .pipe( istanbul.writeReports( {
                    'reporters' : [ 'text', 'text-summary' ]
                } ) )
                .on( 'error', function () {
                    process.exit( 1 );
                } )
                .on( 'end', function () {
                    process.exit( 1 );
                } );

        } );
} );
