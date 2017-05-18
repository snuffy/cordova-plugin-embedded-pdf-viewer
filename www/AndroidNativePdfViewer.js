var exec = require('cordova/exec');

exports.openPdfUrl = function(url, header,options,success, error) {
    exec(success, error, "AndroidNativePdfViewer", "openPdfUrl", [url,header,options]);
};

exports.openPdfUri = function(uri, title, options,success, error) {
    exec(success, error, "AndroidNativePdfViewer", "openPdfUri", [uri,title, options]);
};
