"use strict";

var report = require("../support/report-runs");
var config = require("../config");
var lodash = require("lodash");

var assert = require("assert");

lodash.each(config.reports, function verifyReport(reportPath) {
  lodash.each(config.auctions, function (orgId) {
    describe(reportPath + " for " + orgId + ", logged in as " + config.reporterUsername + "|" + orgId,
      function reportForm() {
        it("should run without error", function runReport() {
          return report.reportRuns(config.reportRoot + reportPath + "?j_username=" + config.reporterUsername + "%7C" + orgId + "&j_password=" + config.reporterPassword
                + "&selected_start_date=" + config.startDate + "&selected_end_date=" + config.endDate).then(
    	    function verify(result) {
              assert.strictEqual(result, true, "The " + reportPath + " for " + orgId + " returned the error: " + result);
            });
        });
      });
  });
});
