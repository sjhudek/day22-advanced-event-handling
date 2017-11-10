
    
    /*
   - Total time spent on page

   - What percentage of the page was viewed
        - If they scroll down, and then back up, record the furthest down they ever scrolled

- Time spent hovering the mouse over each element on the page. 

  - How many vowels were typed into the text area
   - Count all the text that was typed, not just what ends up in the text-area
   - If they left the page by clicking a link, record which link they clicked. 

- When the user leaves the page, console.log all the metrics you’ve collected. (use the unload() event to run a calback function)
*/

$(document).ready(function(event){
    // console.log(event);

    var pageStartTime = Date.now();
    var milliToMinute = 1000 * 60;
    var exitURL = null;
    var vowels = null;
    var keyCount = 0;
    var hover = 0;
    var docHeight = $(document).height();
    var winHeight = $(window).height();

   
   // console.log(pageStartTime);

   $(window).on('beforeunload', function(event){
    console.log(event);

      var leavingTime = event.timeStamp;
      var scrollTopVal = event.target.scrollingElement.scrollTop;
      var leavingTime = event.timeStamp;
      var scrollTopVal = event.target.scrollingElement.scrollTop;
        console.log(scrollTopVal, "scrollvalue");
        console.log((leavingTime / milliToMinute).toFixed(2), 'Minutes on Page');
        console.log(`They scrolled ${scrollTopVal} pixels down the page`);
      var scrollPerc = (100 * (scrollTopVal / (docHeight - winHeight)));
        console.log('Scroll Percentage: ', scrollPerc + '%');

        // How many vowels were typed into the text area
        if (vowels > 0) {
            console.log(vowels, ': Vowel(s) key were pushed and ' + keyCount + ' keys were pushed in total');
        } else {
            console.log('No vowel keys were pushed and ' + keyCount + ' keys were pushed in total');
        };

        // Time hovering
        if (!isNaN(hover)) {
            console.log('Total time spent hovering: ', hover.toFixed(2) + ' seconds');
        } else {
            console.log('Hovering Time was not a number.')
        }

        // exit URL
        if (exitURL) {
            console.log('They went to: ', exitURL);
        } else {
            console.log('Waiting for them to leave.')
        };
    // console.log(scrollTopVal);
   });

   // Attach function to class .hoverTimer
   $('.hoverTimer').hover(
        function () {
            $(this).data('inTime', new Date().getTime());
        },
        function () {
            var leaving = new Date().getTime();
            if (leaving > 0) {
                hover += (leaving - $(this).data('inTime')) / 1000;
            } else {
                hover = 0;
            }

       }
    );

   // Vowel key counter
   $(window).keyup(function (event) {
    // console.log('keyup');
        var vowelArr = ['a', 'e', 'i', 'o', 'u'];
        if (vowelArr.includes(event.key)) {
            vowels++;
        }
        keyCount++;

   });

   // Attach exitURL to .leavingMe class
   $('.leavingMe').click(function () {
        exitURL = $(this).attr('href');
    });
});
