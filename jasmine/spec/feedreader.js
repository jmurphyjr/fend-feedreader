/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        describe('allfeeds', function() {

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

          it('url attribute exists and is not empty', function() {
            allFeeds.forEach(function(f) {
              expect(f.url).toBeDefined();
              expect(f.url.length).not.toBe(0);
            });
          });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
          it('name attribute exists and is not empty', function() {
            allFeeds.forEach(function(f) {
              expect(f.name).toBeDefined();
              expect(f.name.length).not.toBe(0);
            });
          });
        });
    });


    /* TODO: Write a new test suite named "The menu" */

    describe('The menu', function() {
        var body;
        beforeEach(function() {
            body = document.getElementsByTagName('body')[0];
        });

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('should be hidden by default', function() {
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('should display when menu hamburger is clicked', function() {
            // First verify menu is visible when clicked.
            $('.menu-icon-link').click();
            expect(body.classList.contains('menu-hidden')).toBe(false);

            // Now test the menu is hidden when clicked.
            $('.menu-icon-link').click();
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

    });

    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
    describe('Initial Entries', function() {

        beforeEach(function(done) {

            loadFeed(0,function() {
                done();
            });
        });

        describe('feed container', function() {
            var feedContainer;
            beforeEach(function() {
                feedContainer = document.getElementsByClassName('feed')[0];
            });

            it('should have at least one element', function() {
                var entries = feedContainer.getElementsByClassName('entry');
                expect(entries.length > 0).toBe(true);
            })

        });
    });

    /* TODO: Write a new test suite named "New Feed Selection"

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
    describe('New Feed Selection', function() {

        var beforeLoadEntries;
        var elements;

        beforeEach(function(done) {
            // Load Feed 3
            loadFeed(3, function() {
                elements = document.getElementsByClassName('entry-link');
                beforeLoadEntries = [].map.call(elements, function(v) {
                    return [v.getAttribute('href'), v.getElementsByTagName('h2')[0].innerText];
                });
                done();
            });
        });

        // Reload the default feed after all tests are complete
        afterEach(function(done) {
            loadFeed(0, done);
        });

        it('Feed 3 has elements before new feed loaded', function() {
            expect(beforeLoadEntries.length > 0).toBe(true);
        });

        describe('content changes', function() {

            var afterReloadEntries;

            beforeEach(function(done) {

                loadFeed(1, function() {
                    elements = document.getElementsByClassName('entry-link');
                    afterReloadEntries = [].map.call(elements, function(v) {
                        return [v.getAttribute('href'), v.getElementsByTagName('h2')[0].innerText];
                    });
                    done();
                })
            });

            it('when new feed selected', function() {
                expect(beforeLoadEntries).not.toEqual(afterReloadEntries);

            })
        });
    });

    describe('Feed Count in Header', function() {
        var feedCount;
        beforeEach(function() {
            feedCount = document.getElementsByClassName('feed-count-header');
        });

        it('should exist', function() {

            expect(feedCount).toBeDefined();
        });

        it('should equal number of entries for feed', function() {
            var entries = document.getElementsByClassName('entry');

            expect(Number(feedCount[0].innerText)).toEqual(entries.length);
        })
    })
}());
