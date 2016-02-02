'use strict';

var presets = require( process.cwd() + '/lib/presets' );

require( 'should' );

describe( 'presets', function () {
	describe( 'camel case', function () {
		it( '-- should match CAMEL_CASE pattern only', function () {
			presets.CAMEL_CASE.test( 't' ).should.be.equal( true );
			presets.CAMEL_CASE.test( 'tC' ).should.be.equal( true );
			presets.CAMEL_CASE.test( 'tCsSS' ).should.be.equal( true );
			presets.CAMEL_CASE.test( 't12' ).should.be.equal( true );
			presets.CAMEL_CASE.test( 'testHTTPS' ).should.be.equal( true );
			presets.CAMEL_CASE.test( 't3444444' ).should.be.equal( true );
			presets.CAMEL_CASE.test( 't3sT' ).should.be.equal( true );

			presets.CAMEL_CASE.test( 'T' ).should.be.equal( false );
			presets.CAMEL_CASE.test( 'TT' ).should.be.equal( false );
			presets.CAMEL_CASE.test( '1' ).should.be.equal( false );
			presets.CAMEL_CASE.test( 't12.sdfsTest' ).should.be.equal( false );
			presets.CAMEL_CASE.test( 'test-HTTPS' ).should.be.equal( false );
			presets.CAMEL_CASE.test( 't34_44444' ).should.be.equal( false );
			presets.CAMEL_CASE.test( 'hELLo wOrld' ).should.be.equal( false );
			presets.CAMEL_CASE.test( '' ).should.be.equal( false );
		} );
	} );

	describe( 'upper case', function () {
		it( '-- should match UPPER_CASE pattern only', function () {
			presets.UPPER_CASE.test( 'T' ).should.be.equal( true );
			presets.UPPER_CASE.test( 'TEST' ).should.be.equal( true );
			presets.UPPER_CASE.test( 'T3ST' ).should.be.equal( true );

			presets.UPPER_CASE.test( 't' ).should.be.equal( false );
			presets.UPPER_CASE.test( '1' ).should.be.equal( false );
			presets.UPPER_CASE.test( 'T T' ).should.be.equal( false );
			presets.UPPER_CASE.test( 'WWW.TEST' ).should.be.equal( false );
			presets.UPPER_CASE.test( '' ).should.be.equal( false );
			presets.UPPER_CASE.test( 'T_T' ).should.be.equal( false );
		} );
	} );

	describe( 'lower case', function () {
		it( 'should match LOWER_CASE pattern only', function () {
			presets.LOWER_CASE.test( 't' ).should.be.equal( true );
			presets.LOWER_CASE.test( 'test' ).should.be.equal( true );
			presets.LOWER_CASE.test( 't3st' ).should.be.equal( true );

			presets.LOWER_CASE.test( 'T' ).should.be.equal( false );
			presets.LOWER_CASE.test( 'tT' ).should.be.equal( false );
			presets.LOWER_CASE.test( '1' ).should.be.equal( false );
			presets.LOWER_CASE.test( 't t' ).should.be.equal( false );
			presets.LOWER_CASE.test( 'www.test' ).should.be.equal( false );
			presets.LOWER_CASE.test( '' ).should.be.equal( false );
			presets.LOWER_CASE.test( 't_t' ).should.be.equal( false );
		} );
	} );

	describe( 'hyphen case', function () {
		it( '-- should match HYPHEN_CASE pattern only', function () {
			presets.HYPHEN_CASE.test( 't-t' ).should.be.equal( true );
			presets.HYPHEN_CASE.test( 'v1' ).should.be.equal( true );
			presets.HYPHEN_CASE.test( 't3st-test-test' ).should.be.equal( true );

			presets.HYPHEN_CASE.test( 'T' ).should.be.equal( false );
			presets.HYPHEN_CASE.test( 'tT' ).should.be.equal( false );
			presets.HYPHEN_CASE.test( '1T' ).should.be.equal( false );
			presets.HYPHEN_CASE.test( 't t' ).should.be.equal( false );
			presets.HYPHEN_CASE.test( 'www.test' ).should.be.equal( false );
			presets.HYPHEN_CASE.test( '' ).should.be.equal( false );
			presets.HYPHEN_CASE.test( 't_t' ).should.be.equal( false );
			presets.HYPHEN_CASE.test( 'test-' ).should.be.equal( false );
		} );
	} );

	describe( 'snake case', function () {
		it( '-- should match SNAKE_CASE pattern only', function () {
			presets.SNAKE_CASE.test( 't_t' ).should.be.equal( true );
			presets.SNAKE_CASE.test( 'v1' ).should.be.equal( true );
			presets.SNAKE_CASE.test( 't3st_test_test' ).should.be.equal( true );

			presets.SNAKE_CASE.test( 'T' ).should.be.equal( false );
			presets.SNAKE_CASE.test( 'tT_' ).should.be.equal( false );
			presets.SNAKE_CASE.test( '1T' ).should.be.equal( false );
			presets.SNAKE_CASE.test( 't t' ).should.be.equal( false );
			presets.SNAKE_CASE.test( 'www.test' ).should.be.equal( false );
			presets.SNAKE_CASE.test( '' ).should.be.equal( false );
			presets.SNAKE_CASE.test( 't_t_ ' ).should.be.equal( false );
			presets.SNAKE_CASE.test( 'test.js' ).should.be.equal( false );
		} );
	} );

	describe( 'pascal case', function () {
		it( '-- should match PASCAL_CASE pattern only', function () {
			presets.PASCAL_CASE.test( 'T' ).should.be.equal( true );
			presets.PASCAL_CASE.test( 'TC' ).should.be.equal( true );
			presets.PASCAL_CASE.test( 'TcsSS' ).should.be.equal( true );
			presets.PASCAL_CASE.test( 'T12' ).should.be.equal( true );
			presets.PASCAL_CASE.test( 'TestHTTPS' ).should.be.equal( true );
			presets.PASCAL_CASE.test( 'T3444444' ).should.be.equal( true );
			presets.PASCAL_CASE.test( 'T3sT' ).should.be.equal( true );

			presets.PASCAL_CASE.test( 't' ).should.be.equal( false );
			presets.PASCAL_CASE.test( 'tT' ).should.be.equal( false );
			presets.PASCAL_CASE.test( '1' ).should.be.equal( false );
			presets.PASCAL_CASE.test( 'T12.sdfsTest' ).should.be.equal( false );
			presets.PASCAL_CASE.test( 'Test-HTTPS' ).should.be.equal( false );
			presets.PASCAL_CASE.test( 'T34_44444' ).should.be.equal( false );
			presets.PASCAL_CASE.test( 'HELLo wOrld' ).should.be.equal( false );
			presets.PASCAL_CASE.test( '' ).should.be.equal( false );
		} );
	} );

	describe( 'dot case', function () {
		it( '-- should match DOT_CASE pattern only', function () {
			presets.DOT_CASE.test( 'test.js' ).should.be.equal( true );
			presets.DOT_CASE.test( 'v1' ).should.be.equal( true );
			presets.DOT_CASE.test( 't3st.test.test' ).should.be.equal( true );

			presets.DOT_CASE.test( 'T' ).should.be.equal( false );
			presets.DOT_CASE.test( 'tT_' ).should.be.equal( false );
			presets.DOT_CASE.test( '1T' ).should.be.equal( false );
			presets.DOT_CASE.test( 't t' ).should.be.equal( false );
			presets.DOT_CASE.test( 'www.Test' ).should.be.equal( false );
			presets.DOT_CASE.test( '' ).should.be.equal( false );
			presets.DOT_CASE.test( 't_t_ ' ).should.be.equal( false );
			presets.DOT_CASE.test( 'Test.js' ).should.be.equal( false );
		} );
	} );
} );
