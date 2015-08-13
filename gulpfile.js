'use strict';

var gulp         = require( 'gulp' );
var prettyjson   = require( 'prettyjson' );
var fileNameLint = require( './lib/filename-lint' );

var config = {
    // 'nodir' : false,
    // 'removeFileExt' : false,
    'globRegexp' : {
        // 'test/test-files/**' : 'CAMEL_CASE'
        'test/test-files/**/*.html' : 'DASHED',
        'test/test-files/**/*.js' :   'CAMEL_CASE',
    }
};

gulp.task( 'test', function () {
    fileNameLint( config, function ( results ) {
        console.log( prettyjson.render( results ) );
    } );
} );
