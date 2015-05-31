(function (jqL) {
    if (jqL == undefined) {
        console.log("plugin not loaded. Include plugin reference to the web page.")
        return;
    }

    // Define all your resource entries as Key value pair. Don't change any other code.
    jqL.Resources = {
        ResKey1: "चाचणी 1",
        ResKey2: "चाचणी 2",
        ResKey3: "चाचणी 3 <span> Html मजकूर </span>",
    };
})(jqueryLocalization); // name for the js