(function (jqL) {
    if (jqL == undefined) {
        console.log("plugin not loaded. Include plugin reference to the web page.")
        return;
    }

    // Define all your resource entries as Key value pair. Don't change any other code.
    jqL.Resources = {
        ResKey1: "JS Resource 1",
        ResKey2: "JS Resource 2",
        ResKey3: "JS Resource 3 <span>Html Text</span>",
    };
})(jqueryLocalization); // name for the js