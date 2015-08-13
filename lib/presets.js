'use strict';

module.exports = {

    'CAMEL_CASE' : new RegExp( /^[a-z]([a-zA-Z]+){0,}(\.[a-z]+){0,1}$/ ),
    'DASHED' :     new RegExp( /^[a-z]+(\-[a-z]+){0,}(\.[a-z]+){1,2}$/ )

};
