'use strict';

var utils = require( '../utils' );
var _     = require( 'lodash' );

module.exports = function pathLint ( args ) {
	// loop through osPaths return by the glob
	_.forEach( args.osPaths, function ( osPath ) {
		// get osPath's base name
		// e.g. test/foo.js -> foo.js (for files)
		// e.g. test/foo/bar -> bar (for directories)
		var basename       = utils.extractBaseName( osPath );
		var isBaseNameGood = args.pattern.test( basename );

		if ( !isBaseNameGood ) {
			args.errCounter++;
			args.results[ args.testPath ][ osPath ] = isBaseNameGood;
		}
	} );

	return {
		'results'    : args.results,
		'errCounter' : args.errCounter
	};
};
