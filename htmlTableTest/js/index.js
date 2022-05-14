document.addEventListener("DOMContentLoaded", function(event) {
	(function (window, ResizableTableColumns, undefined) {
		var store = window.store && window.store.enabled
			? window.store
			: null;

		var els = document.querySelectorAll('table.data');
		for (var index = 0; index < els.length; index++) {
			var table = els[index];
			if (table['rtc_data_object']) {
				continue;
			}

			var options = {
				store: store,
				maxInitialWidth: 100
			};
			if (table.querySelectorAll('thead > tr').length > 1) {
				options.resizeFromBody = false;
			}

			//new ResizableTableColumns(els[index], options);
		}

	})(window, window.validide_resizableTableColumns.ResizableTableColumns, void (0));
	/*
	$('table.data').dragableColumns({
	   drag: true,
	   dragClass: 'drag',
	   overClass: 'over',
	   movedContainerSelector: '.dnd-moved'
	});
	*/
	const colIndex = 2;
	const table = document.querySelector("table");  
	for (const row of table.rows) {
		cell = row.cells[colIndex]
		console.log(cell.innerHTML);
	}
	
	var row, rows = table.rows;
	var cell, cells;
	var rowText;

	// For each row in the table
	for (var i=1, iLen=rows.length; i<iLen; i++) {
		row = rows[i];
		cells = row.cells;
		
		cell = cells[colIndex];
		console.log(cell)
		// Compare with the text in the cell immediately below (if there is one)
		if (i < iLen-1) {
			cellPrev = rows[i+1].cells[colIndex];
			console.log(cellPrev)
			if (cell.innerHTML != cellPrev.innerHTML) {
				// cell text is different in next row
				console.log('row ' + i + ' cell ' + colIndex + ' text different in row ' + (i+1));
			}
		}
		//if (i < iLen-2 && cell.innerHTML == rows[i+1].cells[colIndex].innerHTML) {
		// cell text is repeated in next row
		//console.log('row ' + i + ' cell ' + j + ' text repeated in row ' + (i+1));
    }

	var $demo1 = $('table.data');
	/*
	$demo1.floatThead({
		scrollContainer: function($table){
			return $table.closest('.wrapper');
		}
	});
	*/

	var y = 1;
	var xReorder = function() {
		$demo1.floatThead("reflow");
		y++;
	}

	$demo1.dragableColumns({
		drag: true,
		dragClass: 'drag',
		overClass: 'over',
		movedContainerSelector: '.dnd-moved',
		onReorder: xReorder
	 });
	
	$demo1.floatThead({
		position: 'fixed'
	});
	
	/*
    var gridViewScroll = new GridViewScroll({
        elementID : "table1",
        onscroll: function (scrollTop, scrollLeft) {
            console.log("scrollTop: " + scrollTop + ", scrollLeft: " + scrollLeft);
        }
    });
    gridViewScroll.enhance();
	*/

	//$('.wrapper').freezeTable({});
	/*
	$(".wrapper").freezeTable({
		'scrollable': true,
	});
	*/
});