(function () {
    "use strict";
    var page = WinJS.UI.Pages.define("default.html", {
        ready: function (element, options) {
            document.getElementById("cmdHome")
                .addEventListener("click", doClickHome, false);
            document.getElementById("cmdSave")
                .addEventListener("click", doClickSave, false);
            document.getElementById("cmdAdd")
                .addEventListener("click", doClickAdd, false);
            document.getElementById("cmdMail")
                .addEventListener("click", doClickMail, false);
            document.getElementById("cmdDelete")
                .addEventListener("click", doClickDelete, false);
            /*WinJS.log && WinJS.log("To show the bar, swipe up from " +
                "the bottom of the screen, right-click, or " +
                "press Windows Logo + z. To dismiss the bar, " +
                "tap in the application, swipe, right-click, " +
                "or press Windows Logo + z again.", "sample", "status");*/
        },
    });

    // Command button functions
    function doClickHome() {
        //WinJS.log && WinJS.log("Home button pressed");
    }

    function doClickSave() {
        //WinJS.log && WinJS.log("Save button pressed");
    }

    function doClickAdd() {
        //WinJS.log && WinJS.log("Add button pressed");
    }

    function doClickMail() {
        //WinJS.log && WinJS.log("Mail button pressed");
    }

    function doClickDelete() {
        //WinJS.log && WinJS.log("Delete button pressed");
        $("#left_col_inner").html("");
        $("#right_col_inner").html("");
    }

    WinJS.log = function (message) {
        var statusDiv = document.getElementById("statusMessage");
        if (statusDiv) {
            statusDiv.innerText = message;
        }
    };
})();