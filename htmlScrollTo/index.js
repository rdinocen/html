$(document).ready(function() {
    console.log("ready!");
    
    // create and fill the table
    var row = $('tr');
    var table = $('table');
    for (var i=1;i<10000;i++){
        row.clone().appendTo( table );
    }
    table.find('tr').each(function(idx, elem){
        $(this).find('td:first').text(idx).end().find('td:last').text('This is the line '+(idx)+' of the table');
    });

    // code to scroll
    $('#control button').click(function(){
        var w = $(window);
        var row = table.find('tr')
            .removeClass('active')
            .eq( +$('#line').val());
        var scrollTime = 0;

        if (!row.length) {
            return;
        }
        
        /*
        console.log(row.offset());
        console.log(getOffset(row[0]));

        if (!isInViewport(row[0])) {
            scrollTime = 1000;
            $('html,body').animate({
                scrollTop: row.offset().top - w.height()/2
            }, scrollTime);
        }

        setTimeout(function() {
            row.addClass('attention');
        }, scrollTime);

        row.one("animationend", function() {
            console.log(this);
            $(this).removeClass('attention');
        });
        */

        //scrollToElement(row[0]);
        //scrollToTop(1000);
        scrollToY(row.offset().top - w.height()/2, 1000);
    });
});
 
function scrollToY (y, duration = 0, element = document.scrollingElement) {
    // cancel if already on target position
    if (element.scrollTop === y) return;
  
    const cosParameter = (element.scrollTop - y) / 2;
    let scrollCount = 0, oldTimestamp = null;
  
    function step (newTimestamp) {
      if (oldTimestamp !== null) {
        // if duration is 0 scrollCount will be Infinity
        scrollCount += Math.PI * (newTimestamp - oldTimestamp) / duration;
        if (scrollCount >= Math.PI) return element.scrollTop = y;
        element.scrollTop = cosParameter + y + cosParameter * Math.cos(scrollCount);
      }
      oldTimestamp = newTimestamp;
      window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
  }

function scrollToTop (duration) {
    // cancel if already on top
    if (document.scrollingElement.scrollTop === 0) return;

    const totalScrollDistance = document.scrollingElement.scrollTop;
    let scrollY = totalScrollDistance, oldTimestamp = null;

    function step (newTimestamp) {
        if (oldTimestamp !== null) {
            // if duration is 0 scrollY will be -Infinity
            scrollY -= totalScrollDistance * (newTimestamp - oldTimestamp) / duration;
            if (scrollY <= 0) return document.scrollingElement.scrollTop = 0;
            document.scrollingElement.scrollTop = scrollY;
        }
        oldTimestamp = newTimestamp;
        window.requestAnimationFrame(step);
    }
    window.requestAnimationFrame(step);
}

function scrollToElement(element) {
    var scrollTime = 0;
    
    if (!isInViewport(element)) {
        scrollTime = 1000;
        $('html,body').animate({
            scrollTop: getOffset(element).top - ((window.innerHeight || document.documentElement.clientHeight))/2
        }, scrollTime);
    }

    const handleHighlight = function(event) {
        // remove this handler
        event.target.removeEventListener('animationend', handleHighlight);
        event.target.classList.remove('attention');
    }

    setTimeout(function() {
        element.classList.add('attention');
    }, scrollTime);

    element.addEventListener('animationend', handleHighlight);
}

function getOffset(element)
{
    if (!element.getClientRects().length)
    {
        return (
        {
            top: 0,
            left: 0 
        });
    }

    const rect = element.getBoundingClientRect();
    const window = element.ownerDocument.defaultView;
    return (
    {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset
    });   
}

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const window = element.ownerDocument.defaultView;
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}