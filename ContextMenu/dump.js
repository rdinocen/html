/*
if (document.addEventListener) {
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        const cell = e.target.closest('td');
        if (!cell) {return;} // Quit, not clicked on a cell
        const row = cell.parentElement;
        console.log(cell.innerHTML, row.rowIndex, cell.cellIndex);
    }, false);
  } else {
    document.attachEvent('oncontextmenu', function() {
      //alert("You've tried to open context menu");
      window.event.returnValue = false;
    });
  }
*/
function mouseX(event) {
    if (event.pageX) {
        return event.pageX;
    } else if (event.clientX) {
        return event.clientX + (document.documentElement.scrollLeft ?
          document.documentElement.scrollLeft :
          document.body.scrollLeft);
    } else {
        return 0;
    }
}

function mouseY(event) {
  if (event.pageY) {
      return event.pageY;
  } else if (event.clientY) {
      return event.clientY + (docuemnt.documentElement.scrollTop ?
      document.documentElement.scrollTop :
      document.body.scrollTop);
  } else {
      return 0;
  }
}

function printMousePos(event) {
document.getElementById('test').innerHTML =
  "X: " + mouseX(event) +
  "Y: " + mouseY(event);// +
  //"tar " + e.target;
}



const hideContextMenu = function(e) {
  const isClickedOutside = !menu.contains(e.target);
  if (isClickedOutside) {
      // Hide the menu
      menu.classList.add('hidden');
      // Remove the event handler
      document.removeEventListener('click', hideContextMenu);
  }
}

document.addEventListener("click", printMousePos);

document.addEventListener('DOMContentLoaded', function () {
  const tbody = document.querySelector('#position tbody');
  document.addEventListener('contextmenu', function(e) {
      console.log('contextmenu')
      //console.log(e.target.parentElement.textContent);
      e.preventDefault();
      const cell = e.target.closest('td');
      console.log(cell)
      if (!cell) {return;} // Quit, not clicked on a cell
      const row = cell.parentElement;
      console.log(cell.innerHTML, row.rowIndex, cell.cellIndex);
  });
});

$(function() {

    var $contextMenu = $("#contextMenu");
  
    $("body").on("contextmenu", "table tr", function(e) {
      $contextMenu.css({
        display: "block",
        left: e.pageX,
        top: e.pageY
      });
      console.log($(e.target).text());
      const cell = e.target.closest('td');
      console.log(cell)
      if (!cell) {return;} // Quit, not clicked on a cell
      const row = cell.parentElement;
     console.log(cell.innerHTML, row.rowIndex, cell.cellIndex);
      return false;
    });
  
    $contextMenu.on("click", "a", function() {
       $contextMenu.hide();
    });
  
  });

  
  const tbody = document.querySelector('#position tbody');
  document.addEventListener('contextmenu', function(e) {
      var $contextMenu = $("#contextMenu");

      $("body").on("contextmenu", "table tr", function(e) {
        $contextMenu.css({
          display: "block",
          left: e.pageX,
          top: e.pageY
        });
        console.log($(e.target).text());
        const cell = e.target.closest('td');
        console.log(cell)
        if (!cell) {return;} // Quit, not clicked on a cell
        const row = cell.parentElement;
       console.log(cell.innerHTML, row.rowIndex, cell.cellIndex);
        return false;
      });
    
      $contextMenu.on("click", "a", function() {
         $contextMenu.hide();
      });
    
  });
