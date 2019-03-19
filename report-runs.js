"use strict";

var request = require("request");
var Promise  = require("promise");
var config = require("../config");

var exports = module.exports = {};

/*
* Verifies that report runs.
* Jasper will return an XML object error if it does not run.
*
* Params
*
* uri - a string representing the Jasper uri.
*
* Returns
*
* true if the report ran and the Jasper error XML if it does not.
*/
exports.reportRuns = function reportRuns(uri) {
  return new Promise(
    function promiseReportRuns(fulfill, reject) {
      var body = "";
      var errorCodeFound = 0;

      var currentReportRequest = request(uri);

      currentReportRequest.on("data",
        function writeChunk(chunk) {
          body += chunk;
        });

      currentReportRequest.on("error",
        function error(err) {
          reject(err);
        });

       currentReportRequest.on("end",
         function end() {
           if (body.indexOf("errorCode") > errorCodeFound) {
             fulfill(body);
           } else {
             fulfill(true);
           }
         });
     });
 };
