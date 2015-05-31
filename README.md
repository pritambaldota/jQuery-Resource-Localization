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

## See Demo
![](https://github.com/pritambaldota/jQuery-Resource-Localization/blob/master/demo_1.JPG)
