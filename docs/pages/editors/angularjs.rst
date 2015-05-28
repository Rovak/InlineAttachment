AngularJS
=========

Inline Attachment can be used in combination with AngularJS

Make sure you have Angular-JS included before including inline-attachment.js

.. code-block:: html

    <!DOCTYPE html>
    <html>
        <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <title>AngularJS InlineAttachment Demo</title>

            <script src="http://ajax.googleapis.com/ajax/libs/jquery/x.x.x/jquery.min.js"></script>
            <script src="https://ajax.googleapis.com/ajax/libs/angularjs/x.x.x/angular.min.js"></script>

            <script src="../src/inline-attachment.js"></script>
            <script src="../src/angularjs.inline-attachment.js"></script>
            <script type="text/javascript">
                function textAreaCtrl($scope) {
                    $scope.receivedFile = function(file) {
                        console.log('received file!', file);
                    }
                }
            </script>
        </head>
        <body ng-app="inlineattachment">
            <div ng-controller="textAreaCtrl">
                <textarea rows="10" cols="50"
                    inlineattachment
                    inlineattachment-progress-text="Sending..."
                    inlineattachment-on-received-file="receivedFile"></textarea>
                <textarea rows="10" cols="50" inlineattachment></textarea>
                <textarea rows="10" cols="50" inlineattachment></textarea>
            </div>
        </body>
    </html>
