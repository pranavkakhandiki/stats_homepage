runHistoryTestFns([
    
    function getVisits() {
      // getVisits callback.
      function getVisitsTestVerification() {
        removeItemVisitedListener();
        // Verify that we received the url.
        var query = { 'text': '' };
        console.log("THIS IS A TEST");
        chrome.history.search(query, function(results) {
          assertEq(1, results.length);
          assertEq(GOOGLE_URL, results[0].url);
          var id = results[0].id;
          console.log("THIS IS THE ID:",id)
          chrome.history.getVisits({ 'url': GOOGLE_URL }, function(results) {
            assertEq(1, results.length);
            assertEq(id, results[0].id);
            // The test has succeeded.
            chrome.test.succeed();
          });
        });
      };
      // getVisits entry point.
      chrome.history.deleteAll(function() {
        setItemVisitedListener(getVisitsTestVerification);
        populateHistory([GOOGLE_URL], function() { });
      });
    }
  ]);