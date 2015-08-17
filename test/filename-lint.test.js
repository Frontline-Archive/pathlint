var fileNameLint = require( process.cwd() + '/lib/filedirname-lint' );
require( 'should' );

var config = {
    // 'nodir' : false,
    // 'removeFileExt' : false,
    'globRegexp' : {
        // 'test/test-files/**' : 'CAMEL_CASE'
        'test/test-files/**/*.html' : 'DASHED',
        'test/test-files/**/*.js' :   'CAMEL_CASE',
    }
};

// describe( '' )
