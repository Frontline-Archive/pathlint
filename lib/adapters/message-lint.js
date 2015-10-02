'use strict';

var _  = require( 'lodash' );
var fs = require( 'fs' );

module.exports = function messageLint ( args ) {
	// loop through osPaths return by the glob
	_.forEach( args.osPaths, function ( osPath ) {
		var messageType = fs.readFileSync( process.cwd() + '/' + osPath, 'utf8' )
							.replace( /\s/g, '' )
							.match( /'messageType':((\[[a-zA-Z0-9.,']+\]?)|('[a-zA-Z0-9.]+'?))/g );

		if ( !messageType ) {
			return;
		}

		messageType = messageType[ 0 ]
						.split( ':' )[ 1 ]
						.replace( /'|\[|\]/g, '' )
						.split( ',' );

		_.forEach( messageType, function ( message ) {
			var isBaseNameGood = args.pattern.test( message );

			if ( !isBaseNameGood ) {
				args.errCounter++;
			}

			args.results[ args.testPath ][ osPath ]            = args.results[ args.testPath ][ osPath ] || {};
			args.results[ args.testPath ][ osPath ][ message ] = isBaseNameGood;
		} );
	} );

	return {
		'results'    : args.results,
		'errCounter' : args.errCounter
	};
};
