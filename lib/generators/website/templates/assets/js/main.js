require.config({
    paths: {
		zepto: '../components/zepto/zepto.js',
        underscore: '../components/underscore/underscore.js'
    },
    shim: {
        zepto: {
            exports: '$'
        }
    }
});

require(['site'], function (site) {
    'use strict';
    site.initialize();
});