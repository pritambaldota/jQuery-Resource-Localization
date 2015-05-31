# jQuery-Resource-Localization
Create client side (JavaScript) based Resource Localization in any web application. Extremely light-weight library, just 3KB (Minified) and 8KB(Debug) version.

Implementing client side localization into any web application is always challenge. Most of web technologies provide localization using server-side technologies. For e.g. .Net application uses Resources Files(.resx) to implement localization into globalize application. 

Nowadays world is extensively moving towards Asynchronous development models like AJAX / SPA. Several frameworks, libraries are already available on the web. To access these server side resources requires custom REST services / handlers to be additionally implemented into the host application. 

This plugin makes life easier where you can manage all your localized resources into plain Text or JavaScript file. Based on current culture provided to this plugin, it loads associated resource entries for use. To enhance performance it uses Cache mechanication for subsequent Initialization calls. So now no more server side development required for managing locationzation. It can be used in any web applications like SharePoint On-Premise / Online, Php, ASP.Net MVC, JAVA and many more as long as these technologies supports JavaScript.


## Installing via the [NuGet](https://www.nuget.org/packages/PritamBaldota.JqueryResourceLocalization) Package
Jquery Resource Localization plugin is a NuGet package that augments an existing empty ASP.NET project. Just install using NuGet and then run demo.html!

```nuget
Install-Package PritamBaldota.JqueryResourceLocalization
```
Search for  **Jquery Resource Localization** into NuGet Gallery and click install. See image below
![](/add_nuget_package.JPG)

## Run demo-localization.html file to see working example.
![](/demo_1.JPG)

# Documentation
Follow below steps to integrate jQuery Resource Localization plugin to your web application.
## Solution Structure
Keep your resource files to any of the folder. Default folder structure will be Scripts/Global_Resources. You have add seperate resource files per locale which you want to include into your solution. Along with this one default resource file without locale identifier must be added as fallback option. This default file will be used to load resources if culture is not specified.
![](/solution_structure.JPG)

## File Names for Resources
Resource files must have same name for all locale. Add culture as part of file name for each culture. For e.g if your web application supports for English United States(en-US), Marathi India (mr-IN), French France (fr-fr)  language, then you must have 4 resource files. One default without any locale identifier and one for each locale. So say your resource file base name is myWebAppresource, then resulting file names will be -
```html
myWebAppresource.txt
myWebAppresource.en-US.txt
myWebAppresource.mr-IN.txt
myWebAppresource.fr-fr.txt
```

## Creating Resource Entries into Text Files
Each resource entry most be on new line. Do not put line breaks into your resource values. Resource keys must not have any special characters or spaces, it must be one valid word. For e.g. **ResKey1** is valid where as **Res Key 1** is invalid.

Sample Resource entries for **myResourceFile.txt** default file.
```text
ResKey1:Text Resource 1
ResKey2:Text Resource 2
ResKey3:Text Resource 3 <span> Html Text </span>
```
Sample Resource entries for **myResourceFile.mr-IN.txt** Localized Marathi resource file.
```text
ResKey1:चाचणी 1
ResKey2:कसोटी 2
ResKey3:चाचणी 3 <span> Html मजकूर </span>
```

## Include Reference
After intalling libraries via Nuget or manually, include them into head section of web page.
```html
  <!-- Dependent Libraries-->
  <script src="Scripts/jquery-1.10.0.min.js"></script>
  <script src="Scripts/jquery-cultureinfo-1.0.0.0.min.js"></script>

  <!-- Plugin Reference-->
  <script src="Scripts/jquery-resource-localization.1.0.0.0.min.js"></script>
```

## Initialization of Plugin
Initialize plugin by calling its Initialize method and pass necessary options as show below.

```javascript
$(document).ready(function () {
            jqueryLocalization.Initialize({
                resourceName: "myResourceFile", // Resource File name
                callback: resourceLoaded, // Success call back handler. After this call back you can use resources.
                errorCallback: errorOnResourceLoad, // Error call back handler
                scriptRoot: "Scripts/Global_Resources", // Relative Location for Resource files
                resxExtension: 'txt', // Default Resource file type will be txt if not provided. Valid types will either js or txt.
                culture: "mr-IN", // Provide either culture or lcid. culture will have higher priority, if provided lcid will be ignored.
                //lcid: 1033,
                //cache: true,  // Default will be true if not provided. If Initialize called multiple times, it will return result from cache.
            });
        });
```

## Usage to access resource values
Access the resources only inside success callback of Initialize() method. This ensures all resources has been loaded properly.  
```javascript
    // Success callback handler
    function resourceLoaded() {
        // Start accessing resource
        //Show all culture information. 
        $("#cultureInfo").text(JSON.stringify(jqueryLocalization.CurrentCulture));

        // Show Resource Values 
        // Usage like Array : provide key name in brackets
        $("#resValue1").text(jqueryLocalization.Resources["ResKey1"]);

        // Usage like Object : provide key name as property
        $("#resValue2").text(jqueryLocalization.Resources.ResKey2);

        // Usage like Object : provide key name as property
        $("#resValue3").text(jqueryLocalization.Resources.ResKey3);
    }
```

## Error Handling
Any errors can be handled into errorCallback. This callback has JSON error object with **message** property, which tells about error.
```javascript
    //error callback
    function errorOnResourceLoad(error) {
        if (error !== undefined) {
            console.log(error.message);
        }
    }
```

Sharing is Caring :-)
