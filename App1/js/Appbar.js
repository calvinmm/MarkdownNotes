(function () {
    "use strict";
    var page = WinJS.UI.Pages.define("default.html", {
        ready: function (element, options) {
            document.getElementById("cmdSave")
                .addEventListener("click", doClickSave, false);
            document.getElementById("cmdDelete")
                .addEventListener("click", doClickDelete, false);
        },
    });

    // Command button functions
    function doClickSave() {
        //WinJS.log && WinJS.log("Save button pressed");
        // Clean scenario output
        //WinJS.log && WinJS.log("", "sample", "status");

        // Verify that we are currently not snapped, or that we can unsnap to open the picker
        var currentState = Windows.UI.ViewManagement.ApplicationView.value;
        if (currentState === Windows.UI.ViewManagement.ApplicationViewState.snapped &&
            !Windows.UI.ViewManagement.ApplicationView.tryUnsnap()) {
            // Fail silently if we can't unsnap
            return;
        }

        // Create the picker object and set options
        var savePicker = new Windows.Storage.Pickers.FileSavePicker();
        savePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary;
        // Dropdown of file types the user can save the file as
        savePicker.fileTypeChoices.insert("HTML Document", [".html"]);
        // Default file name if the user does not type one in or select a file to replace
        savePicker.suggestedFileName = "markdown.html";

        savePicker.pickSaveFileAsync().then(function (file) {
            if (file) {
                // Prevent updates to the remote version of the file until we finish making changes and call CompleteUpdatesAsync.
                Windows.Storage.CachedFileManager.deferUpdates(file);
                // write to file

                //Windows.Storage.FileIO.writeTextAsync(file, file.name).done(function () {
                var fileout = document.getElementById('right_col_inner').innerHTML;

                //Windows.Storage.FileIO.writeTextAsync(file, $("#right_col_inner").html()).done(function () {
                Windows.Storage.FileIO.writeTextAsync(file, fileout).done(function () {
                    // Let Windows know that we're finished changing the file so the other app can update the remote version of the file.
                    // Completing updates may require Windows to ask for user input.
                    Windows.Storage.CachedFileManager.completeUpdatesAsync(file).done(function (updateStatus) {
                        if (updateStatus === Windows.Storage.Provider.FileUpdateStatus.complete) {
                            //WinJS.log && WinJS.log("File " + file.name + " was saved.", "sample", "status");
                            // Saved
                            var msg = new Windows.UI.Popups.MessageDialog(
                                        "File " + file.name + " successfully saved.");

                            // Add commands and set their command handlers
                            msg.commands.append(new Windows.UI.Popups.UICommand("Close"));

                            // Set the command that will be invoked by default
                            msg.defaultCommandIndex = 0;

                            // Set the command to be invoked when escape is pressed
                            msg.cancelCommandIndex = 1;

                            // Show the message dialog
                            msg.showAsync();
                        } else {
                            //WinJS.log && WinJS.log("File " + file.name + " couldn't be saved.", "sample", "status");
                            // Not saved
                            var msg = new Windows.UI.Popups.MessageDialog(
                                        "File " + file.name + " not saved.");

                            // Add commands and set their command handlers
                            msg.commands.append(new Windows.UI.Popups.UICommand("Close"));

                            // Set the command that will be invoked by default
                            msg.defaultCommandIndex = 0;

                            // Set the command to be invoked when escape is pressed
                            msg.cancelCommandIndex = 1;

                            // Show the message dialog
                            msg.showAsync();
                        }
                    });
                });
            } else {
                // Operation Cancelled
            }
        });
    }

    function doClickDelete() {
        //WinJS.log && WinJS.log("Delete button pressed");
        //$("#left_col_inner").html("");
        //$("#right_col_inner").html("");
        document.getElementById('left_col_inner').innerHTML = "";
        document.getElementById('right_col_inner').innerHTML = "";
    }
})();