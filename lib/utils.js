'use strict';

var path = require( 'path' );
var fs   = require( 'fs' );

module.exports = {
	'extractBaseName' : function ( osPath ) {
		var basename = path.basename( osPath );

		// if it is a file, remove the file extension ( only the last part of the filename separated by a dot )
		// e.g. foo.bar.js -> foo.bar
		if ( !fs.lstatSync( osPath ).isDirectory() ) {
			basename = basename.replace( /\.[^/.]+$/, '' );
		}

		return basename;
	}
};
