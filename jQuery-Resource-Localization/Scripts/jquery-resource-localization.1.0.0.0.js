/***********************************************************************
Author  :   Pritam Baldota
Web Url :   http://www.pritambaldota.com

The MIT License (MIT)

Copyright (c) 2015 pritambaldota

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

***********************************************************************/

(function ($) {
    window.jqueryLocalization = {
        Author: "Pritam Baldota",
        Version: "1.0.0.0",
        Resources: {},
        CurrentCulture: {}, // Fill the Culture Information. It depends upon another plugin https://github.com/pritambaldota/Jquery-Culture-Info 
        Initialize: function (options) {
            // A comma separates the different values
            var optionsinternal = {
                resourceName: options.resourceName || "", // Name of Resource File without local and extension for e.g. myProjectresource.1033.txt is file so your app name will be myProjectresource
                callback: options.callback, // Callback once all resource has been loaded, so user can use after this
                errorCallback: options.errorCallback,
                culture: options.culture, // language en-US to load resource for this culture. If this parameter is provided then lcid is ignored. Either of one will be accepted.
                lcid: options.lcid, // lcid for e.g. 1033 to load resource for this locale.
                scriptRoot: options.scriptRoot || "Scripts/Global_Resources", // Resoruce files relative folder location. If not provided default will be used
                resxExtension: options.resxExtension || "txt", // Type of resources to create default is text file based, it can be either JS or TXT
                cache: options.cache === undefined ? true : options.cache, // Default cache is true
            };

            // Local file extensino postfix
            var fileNamePostfix = "";
            var jqL = this;
            //Cache Object if resources already loaded then cache is true then return the same result
            if (optionsinternal.cache && this.Resources !== undefined && this.Resources.__Exists) {
                // Do nothign as Resource is already having values
                console.log("Resource availabe in Cache.");
                return;
            }

            if (optionsinternal.resourceName === undefined) {
                console.log("No Resource File Name provided.");
                return;
            }

            if (typeof $.GetCultureInfoByCultureName === 'function' && typeof $.getCultureInfoByLCID === 'function') {
                if (optionsinternal.culture !== undefined) {
                    this.CurrentCulture = $.GetCultureInfoByCultureName(optionsinternal.culture);
                }
                else if (optionsinternal.lcid !== undefined) {
                    this.CurrentCulture = $.getCultureInfoByLCID(optionsinternal.lcid);
                }
                else {
                    // Throw exception
                    options.errorCallback({ "message": "Please provide either culture or lcid" });
                    return;
                }

                if (this.CurrentCulture == undefined) {
                    console.log("No culture found for given input. Loading resources from default file");
                    // Take Default fallback Resource file
                    fileNamePostfix = "." + optionsinternal.resxExtension;
                }
                else {
                    fileNamePostfix = "." + this.CurrentCulture.CultureName + "." + optionsinternal.resxExtension;
                }
            }
            else {
                // Take Default fallback Resource file
                fileNamePostfix = "." + optionsinternal.resxExtension;
            }

            //Inject scripts
            var filename = optionsinternal.scriptRoot + "/" + optionsinternal.resourceName + fileNamePostfix;
            console.log("Resource identified - " + filename);
            //Clear Resource before processing
            jqL.Resources = {};

            if (optionsinternal.resxExtension.toLowerCase() === "js") {
                this.LoadDynamicJSCss(filename, "js", function () {
                    //Set Resource Filled flag
                    jqL.Resources["__Exists"] = "1";
                    console.log("Resource ready for use.")
                    optionsinternal.callback();
                });
            }
            else {
                // Load Non JS Resource file 
                $.get(filename, function (data) {
                    $.each(data.split("\r\n"), function (i, item) {
                        item = $.trim(item);
                        var pos = item.indexOf(":");
                        if (pos !== -1 && item.length > pos) { // Valid resource item with  key value pair
                            var itemRow = item.substring(0, pos);
                            var itemCell = item.substring(pos + 1);
                            jqL.Resources[$.trim(itemRow)] = $.trim(itemCell);
                        }
                    });

                    //Set Resource Filled flag
                    jqL.Resources["__Exists"] = "1";
                    console.log("Resource ready for use.")
                    optionsinternal.callback();
                });
            }
        },
        LoadDynamicJSCss: function (url, type, callback) {
            var script = {};
            if (type == "js") {
                script = document.createElement("script");
                script.type = "text/javascript";
                script.src = url;
            }
            else if (type == "css") {
                script = document.createElement("link");
                script.type = "text/css";
                script.rel = "stylesheet";
                script.href = url;
            }

            if (script.readyState) {  //IE
                script.onreadystatechange = function () {
                    if (script.readyState == "loaded" ||
                            script.readyState == "complete") {
                        script.onreadystatechange = null;
                        callback();
                    }
                };
            } else {  //Others
                script.onload = function () {
                    callback();
                };
            }

            document.body.appendChild(script);
        }
    };
})(jQuery);