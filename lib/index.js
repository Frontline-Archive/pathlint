'use strict';

var _        = require( 'lodash' );
var async    = require( 'async' );
var glob     = require( 'glob' );
var presets  = require( './presets' );
var adapters = require( './adapters' );
var Promise  = require( 'bluebird' );

function traversePath ( config, adapter ) {
	return new Promise( function ( resolve, reject ) {
		var pathPatterns  = config.globRegexp || {};
		var results       = {};
		var errCounter    = 0;

		async.forEachOf( pathPatterns, function ( pattern, testPath, callback ) {
			pattern = presets[ pattern ] || pattern;

			if ( !( pattern instanceof RegExp ) ) {
				pattern = new RegExp( pattern );
			}

			glob( testPath, { 'nodir' : config.nodir }, function ( err, osPaths ) {
				if ( err ) {
					return callback( {
						'results'      : results,
						'errorMessage' : err
					} );
				}

				results[ testPath ] = {};

				var args = {
					'osPaths'    : osPaths,
					'results'    : results,
					'errCounter' : errCounter,
					'testPath'   : testPath,
					'pattern'    : pattern
				};

				var res = adapter( args );

				results    = res.results;
				errCounter = res.errCounter;

				return callback();
			} );
		}, function ( err ) {
			if ( err ) {
				return reject( {
					'results'      : err.results,
					'errorMessage' : err.errorMessage
				} );
			}

			resolve( {
				'results' : results,
				'errors'  : errCounter
			} );
		} );
	} );
}

function linter ( config, callback ) {
	if ( _.isEmpty( config ) || !config ) {
		return callback( 'No config found.', null );
	}

	var result = {
		'errors'  : {},
		'results' : {}
	};

	async.forEachOf( config, function ( value, key, cb ) {
		var adapter = adapters[ key ];

		if ( adapter === undefined ) {
			result.errors[ key ]  = 'Unknown adapter in config.';
			result.results[ key ] = null;
			return cb();
		}

		traversePath( value, adapter )
			.then( function ( data ) {
				if ( data.errors > 0 ) {
					result.errors[ key ]  = new Error( 'linter: ' + data.errors + ' error/s found.' );
					result.results[ key ] = data.results;
					return cb();
				}
				result.errors[ key ]  = null;
				result.results[ key ] = data.results;
				cb();
			} )
			.catch( function ( error ) {
				result.errors[ key ]  = error.errorMessage;
				result.results[ key ] = error.results;
				cb();
			} );
	}, function () {
		callback( result.errors, result.results );
	} );
}

module.exports = linter;
