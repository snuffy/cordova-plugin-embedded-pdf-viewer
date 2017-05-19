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
                headerColor:"#000000",  //Not supported under iOS and Windows
                tintColor: "#000000",   //Not supported under Android and Windows
                showScroll:true,        //Not supported under iOS and Windows
                showShareButton:true,   //Not supported under iOS and Windows
                showCloseButton:true,   //Not supported under iOS and Windows
                swipeHorizontal:false   //Not supported under iOS and Windows
              };
              
PdfViewer.openPdfUrl(uri, title, options, 
                        function(success){
                        // success callback
                        },function(error){
                        // error callback
                        });
```

### Sources
https://github.com/neinhart/cordova-plugin-android-native-pdfviewer  
https://github.com/shlomnissan/cordova-plugin-simple-pdf  
https://github.com/sitewaerts/cordova-plugin-document-viewer  

### License
The MIT License

Copyright (c) 2008-2016 Betamark

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.