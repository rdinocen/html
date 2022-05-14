document.addEventListener("DOMContentLoaded", function(event) {
	console.log('Hello World!');
	//const table = createTable(5, 100);
	//document.getElementById('blank').appendChild(table);

	const rows = document.querySelector('table.data').rows;
	const source = document.getElementById('change');
	const button = source.getElementsByTagName('button')[0];

	var columnN = 1;
	var rowN = 1;
	var cell = null;
	var foundCell = null;

	console.log(rows.length);

	const inputHandler = function(event) {
		const target = event.target;

		if (target.value < 1) {
			target.classList.add("invalid");
		} else if (target.classList.contains("invalid")) {
			target.classList.remove("invalid");
		}

		if (source.getElementsByClassName("invalid").length > 0) {
			return false;
		} 

		if (foundCell) {
			foundCell.classList.remove("highlight-found")
		}

		if (target.classList.contains('row')) {
			// update row
			rowN = Number(target.value);
		}
		else if (target.classList.contains('col')) {
			//update col
			columnN = Number(target.value)-1;
		}

		highlightCell();
	}

	function highlightCell() {
		const prevCell = cell;

		console.log('( row ' + rowN + ', col ' + columnN + ')');
		cell = rows[rowN].cells[columnN];

		if (prevCell){
			prevCell.classList.remove("highlight");
		}
		cell.classList.add("highlight");
		console.log(cell);
	}

	const onCellClickHandler = function(event) {
		const [x, y] = [
			event.target.cellIndex, 
			event.target.parentElement.rowIndex
		  ];
		if (x === undefined || y === undefined) {
		// Clicked on space between cells
		return;
		}

		rowInput = source.getElementsByClassName('row')[0];
		colInput = source.getElementsByClassName('col')[0];

		rowInput.value = Number(y);
		colInput.value = Number(x) + 1;
			
		rowN = Number(y);
		columnN = Number(x);

		highlightCell();
	}
	
	const onChangeHandler = function(event) {
		const prevFoundCell = foundCell;

		/*
		if (prevFoundCell) {
			prevFoundCell.classList.remove("highlight-found")
		}
		*/

		// For row in the table starting at rowN
		for (var i=rowN, iLen=rows.length; i<iLen; i++) {
			var currentCell = rows[i].cells[columnN];
			// Compare with the text in the cell immediately below (if there is one)
			if (i < iLen-1) {
				var nextCell = rows[i+1].cells[columnN];
				// if cell text is different in next row
				if (currentCell.innerHTML != nextCell.innerHTML) {
					// if next cell is blank
					if (nextCell.innerHTML.length == 0) {
						continue;
					}
					foundCell = nextCell;
					console.log(foundCell);
					break;
				}
			}
		}

		if (prevFoundCell != foundCell) {
			scrollToElement(foundCell);
		}
	}

	function createTable(numOfCols, numOfRows) {
		const table = document.createElement('table');
		const fragment = new DocumentFragment();

		// Create thead
		const thead = document.createElement('thead');
		for (var j=1; j<numOfCols+1; j++) {
			// Create col header
			const td = document.createElement('td');
			const text = 'Column #' + j;
			const textNode = document.createTextNode(text);
			td.appendChild(textNode);
			// Append
			fragment.appendChild(td);
		}
		const tr = document.createElement('tr');
		tr.appendChild(fragment)
		thead.appendChild(tr);

		// Create tbody
		const tbody = document.createElement('tbody');
		// For each row
		for (var i=1; i<numOfRows+1; i++) {
			// Create new row
			const tr = document.createElement('tr');
			// For each col
			for (var j=1; j<numOfCols+1; j++) {
				// Create cell
				const td = document.createElement('td');
				const text = 'Row #' + i + '-' + j;
				const textNode = document.createTextNode(text);
				td.appendChild(textNode);
				// Append cell to row
				tr.appendChild(td);
			}
			fragment.appendChild(tr);
		}
		tbody.appendChild(fragment);
		
		table.appendChild(thead);
		table.appendChild(tbody);
		
		return table;
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
			event.target.classList.remove('highlight-found');
		}
	
		setTimeout(function() {
			element.classList.add('highlight-found');
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

	source.addEventListener('input', inputHandler);
	button.addEventListener('click', onChangeHandler);
	document.addEventListener('click', onCellClickHandler);

	const $table = $('table.data');

	const reorderHandler = function() {
		if (cell) {
			cell.classList.remove("highlight");
			cell = table.rows[rowN].cells[columnN];
			cell.classList.add("highlight");
		}
	}

	$table.dragableColumns({
		drag: true,
		dragClass: 'drag',
		overClass: 'over',
		movedContainerSelector: '.dnd-moved',
		onReorder: reorderHandler
	 });
	
	$table.floatThead({
		position: 'fixed'
	});
});