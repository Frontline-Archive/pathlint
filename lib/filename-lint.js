'use strict';

var glob    = require( 'glob' );
var path    = require( 'path' );
var fs      = require( 'fs' );
var presets = require( './presets' );

function extractBaseName ( osPath, removeFileExt ) {

    var basename = path.basename( osPath );

    if ( removeFileExt ) {

        // if it is a file, remove the file extension ( only the last part of the filename separated by a dot )
        // e.g. foo.bar.js -> foo.bar
        if ( !fs.lstatSync( filePath ).isDirectory() ) {

            basename = basename.replace( /\.[^/.]+$/, '' );

        }

    }

    return basename;
}

function fileNameLint ( config, callback ) {

    var nodir         = config.nodir || true; // we exclude directories by default
    var removeFileExt = config.removeFileExt || true; // we remove file extensions by default
    var pathPatterns  = config.globRegexp || {};
    var globs         = Object.keys( pathPatterns ); // create an array of globs
    var results       = {};
    var counter       = 0;

    function getFilesFromGlob () {

        if ( counter < globs.length ) {

            var globStr       = globs[ counter ]; // get current glob
            var fileNameRegex = pathPatterns[ globStr ]; // get regex assigned to the current glob
            var regex;

            // If specified regex is one of the presets, use it. If not, then make a new RegExp object
            if ( presets[ fileNameRegex ] ) {
                regex = presets[ fileNameRegex ];
            } else {
                regex = fileNameRegex;
            }

            glob( globStr, { 'nodir' : nodir }, function ( err, osPaths ) {

                results[ globStr ] = {};

                // loop through osPaths return by the glob
                osPaths.forEach( function ( osPath ) {

                    // get osPath's base name
                    // e.g. test/foo.js -> foo.js (for files)
                    // e.g. test/foo/bar -> bar (for directories)
                    var basename = extractBaseName( osPath, config.removeFileExt );

                    results[ globStr ][ osPath ] = regex.test( basename );

                } );

                counter++;
                getFilesFromGlob();

            } );

        } else {
            callback( results );
        }

    }

    getFilesFromGlob();

}

module.exports = fileNameLint;
