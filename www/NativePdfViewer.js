/*module.exports = {
    openPdf: function (url, header, options, success, error) {
        switch(device.platform){
            case "Android":
                exec(success, error, "AndroidNativePdfViewer", "openPdfUri", [uri, title, options]);
                break;
            case "iOS":
                exec(success, error, "SimplePDF", "showPDF", [ path, title, options.tintColor ]);
                break;
            default:
                error("Your platform is not supported.");
        }
    }
};*/

var exec = require('cordova/exec');

exports.openPdf = function (uri, title, options, success, error) {
    switch(device.platform){
        case "Android":
            exec(success, error, "AndroidNativePdfViewer", "openPdfUri", [uri, title, options]);
            break;
        case "iOS":
            exec(success, error, "SimplePDF", "showPDF", [ uri, title, options.tintColor ]);
            break;
        default:
            error("Your platform is not supported.");
    }
};