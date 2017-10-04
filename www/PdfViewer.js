var exec = require('cordova/exec');

exports.openPdf = function (uri, title, options, success, error) {
    switch (device.platform) {
        case "Android":
            exec(success, error, "AndroidNativePdfViewer", "openPdfUri", [uri, title, options]);
            break;
        case "iOS":
            exec(success, error, "SimplePDF", "showPDF", [uri, title, options.tintColor]);
            break;
        case "windows":
            windowsPdf(uri, title, function () {}, success, error, error);
            break;
        default:
            error("Your platform is not supported.");
    }
};

function windowsPdf(url, title, onShow, onClose, onMissingApp, onError) {
    if(document.getElementsByTagName('base').length > 0) {
        var temp = document.getElementsByTagName('base')[0].href;
        document.getElementsByTagName('base')[0].href = "";
    }
    var contentType = "application/pdf";
    var JS_HANDLE = "SitewaertsDocumentViewer";
    var CDV_HANDLE = "SitewaertsDocumentViewer";
    var CDV_HANDLE_ACTIONS = {
        VIEW_DOCUMENT: "viewDocument"
    };

    var errorPrefix = "Error in " + JS_HANDLE + ".viewDocument(): ";

    var _hideStatusBarOnClose = false;

    function _beforeShow(next) {
        if (next)
            next();
    }

    function _onShow() {
        if (onShow)
            onShow();
    }

    function _beforeClose(next) {
        if (_hideStatusBarOnClose) {
            _hideStatusBarOnClose = false;
            window.StatusBar.hide();
        }
        if(document.getElementsByTagName('base').length > 0)
            document.getElementsByTagName('base')[0].href = temp;
        if (next)
            next();
    }

    function _onClose() {
        _beforeClose(onClose);
    }

    function _logError(e) {
        window.console.error(errorPrefix, e);
    }

    function _onError(e,x) {
        console.error(x);
        _logError(e);
        _beforeClose(function () {
            if (onError)
                onError(e);
        });
    }

    try {
        options = {title: title};

        if (typeof options.title !== "string" || options.title.trim() === "")
            options.title = url.split('/').pop(); // strip file name from url
        if(!url)
            onError();
        else {
            _beforeShow(function () {
                exec(
                    function (result) {
                        var status = result ? result.status : null;

                        if (status == 1) {
                            _onShow();
                        }
                        else if (status == 0) {
                            _onClose();
                        }
                        else {
                            var errorMsg =
                                "unknown state '" + status
                                + "'";
                            window.console.error(
                                errorPrefix + errorMsg);
                        }
                    },
                    _onError,
                    CDV_HANDLE,
                    CDV_HANDLE_ACTIONS.VIEW_DOCUMENT,
                    [
                        {
                            url: url,
                            contentType: contentType,
                            options: options
                        }
                    ]
                );
            });
        }

    }
    catch (e) {
        _onError(e);
    }
}