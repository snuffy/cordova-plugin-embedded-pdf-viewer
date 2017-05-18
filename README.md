# cordova-plugin-native-pdf-viewer


### Installation cordova plugin 

```
$ cordova plugin add https://stash.itizzimo.com/scm/cor/cordova-plugin-native-pdf-viewer.git --save
```

### Supported Platforms
- Android
- iOS

### Example

```
var options = { 
                headerColor:"#000000", //Not supported under iOS
                tintColor: "#000000", //Not supported under Android
                showScroll:true, //Not supported under iOS
                showShareButton:true, //Not supported under iOS
                showCloseButton:true, //Not supported under iOS
                swipeHorizontal:false //Not supported under iOS
              };
              
AndroidNativePdfViewer.openPdfUrl(uri, title, options, 
                        function(success){
                        // success callback
                        },function(error){
                        // error callback
                        });
```

### Sources
https://github.com/neinhart/cordova-plugin-android-native-pdfviewer  
https://github.com/shlomnissan/cordova-plugin-simple-pdf  