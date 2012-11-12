// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll());

            // Retrieve the button and register our event handler
            //var helloButton = document.getElementById("helloButton");
            //var bodyClick = document.getElementById("body");
            //bodyClick.addEventListener("click", buttonFocus, false);
            //bodyClick.addEventListener("keydown", buttonFocus, false);
            //document.addEventListener("click", buttonFocus, false);
            //document.addEventListener("keydown", buttonFocus, false);


            var helloButton = document.getElementById("left_col_inner");
            helloButton.addEventListener("keyup", buttonClickHandler, false);

            //helloButton.addEventListener("keydown", buttonClickHandler, false);

            //var helloButton = document.getElementById("convert");
            //helloButton.addEventListener("click", buttonClickHandler, false);
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    function buttonFocus(eventInfo) {
        $("#left_col_inner").focus();
    }

    var ulist = false;
   
    function textFormat(text) {
        while (text.indexOf("*") >= 0) {
            // deal with bold
            text = text.replace("*", "<strong>");

            if (text.indexOf("*") < 0) {
                text += "</strong>";
            } else {
                text = text.replace("*", "</strong>");
            }
        }
        while (text.indexOf("_") >= 0) {
            // deal with italics
            text = text.replace("_", "<em>");

            if (text.indexOf("_") < 0) {
                text += "</em>";
            } else {
                text = text.replace("_", "</em>");
            }
        }
        while (text.indexOf("`") >= 0) {
            // deal with italics
            text = text.replace("`", "<code>");

            if (text.indexOf("`") < 0) {
                text += "</code>";
            } else {
                text = text.replace("`", "</code>");
            }
        }
        return text;
    }

    function buttonClickHandler(eventInfo) {
        // Currently Supported
        // Headings
        // Regular Text
        // Unordered List
        // Bold => *bold*
        // Italics => _italics_

        //var userName = document.getElementById("nameInput").value;
        //var userName = $("#nameInput").text();
        //var greetingString = "Hello, " + userName + "!";
        //document.getElementById("greetingOutput").innerText = greetingString;
        //$("#greetingOutput").text(greetingString);
        //$("#right_col_inner").text($("#left_col_inner").text());

        $("#right_col_inner").text("");

        var inner = $("#left_col_inner").html();
        //var inner = 'This is a test! What will happen!';

        inner = inner.replace(/(&nbsp;)*/g, "");

        inner = inner.replace(/\<div\>/g, '');
        inner = inner.replace(/\<\/div\>/g, '<div>');
        inner = inner.replace(/<br>/g, '');
        inner = inner.replace(/<br\/>/g, '');
        
        var n = inner.split("<div>");

        for (var i = 0; i < n.length; i++) {
            var j = n[i];
            var index = 0;

            // This is for headers
            if ((j.charAt(index) == "#") == true) {
                if (ulist == true) {
                    $("#right_col_inner").append("</ul>");
                    ulist = false;
                }

                while ((j.charAt(index) == "#") == true) {
                    index += 1;
                }

                var p;

                // remove #
                //j = j.replace(/#/g, '');

                while ((j.charAt(0) == "#") == true) {
                    j = j.substring(1);
                }

                j = textFormat(j);

                // add specific header
                switch (index) {
                    case 1:
                        p = $("<h1>").html(j);
                        p.append("</h1>");
                        break;
                    case 2:
                        p = $("<h2>").html(j);
                        p.append("</h2>");
                        break;
                    case 3:
                        p = $("<h3>").html(j);
                        p.append("</h3>");
                        break;
                    case 4:
                        p = $("<h4>").html(j);
                        p.append("</h4>");
                        break;
                    case 5:
                        p = $("<h5>").html(j);
                        p.append("</h5>");
                        break;
                    case 6:
                        p = $("<h6>").html(j);
                        p.append("</h6>");
                        break;
                    default:
                        break;
                }
                $("#right_col_inner").append(p);
            } else if ((j.charAt(index) == "+" || j.charAt(index) == "-") == true) {
                // We have an unordered list

                j = j.replace(/\+/g, '');
                j = j.replace(/-/g, '');

                if (ulist == false) {
                    $("#right_col_inner").append("<ul>");
                    ulist = true;
                }

                var p = $("<li>").html(textFormat(j));
                p.append("</li>");
                $("#right_col_inner").append(p);

            } else {
                if (ulist == true) {
                    $("#right_col_inner").append("</ul>");
                    ulist = false;
                }

                // This is for regular text
                var p = $("<p>");

                //var words = j.split(" ");
                /*var w = j;

                while (w.indexOf("*") >= 0) {
                    // deal with bold
                    w = w.replace("*", "<strong>");

                    if (w.indexOf("*") < 0) {
                        w += "</strong>";
                    } else {
                        w = w.replace("*", "</strong>");
                    }
                }
                while (w.indexOf("_") >= 0) {
                    // deal with italics
                    w = w.replace("_", "<em>");

                    if (w.indexOf("_") < 0) {
                        w += "</em>";
                    } else {
                        w = w.replace("_", "</em>");
                    }
                }*/

                p.append(textFormat(j));
                p.append("</p>");


                $("#right_col_inner").append(p);
            }
        }
    }

    app.start();
})();
