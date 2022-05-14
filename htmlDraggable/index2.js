let dragged;
let margins;
let helperProportions;
let axis = null;
let placeholder;

function getOffset(element) {
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


function _cache() {
    margins = {
        left: ( parseInt( $( placeholder ).css( "marginLeft" ), 10 ) || 0 ),
        top: ( parseInt( $( placeholder ).css( "marginTop" ), 10 ) || 0 )
    };

    helperProportions = {
        width: $( dragged ).outerWidth(),
        height: $( dragged ).outerHeight()
    };
}

function getParentContainment() {
    const ce = dragged.parentElement;

    const co = $( ce ).offset();
    const over = ( $( ce ).css( "overflow" ) !== "hidden" );

    var containment = [
        co.left + ( parseInt( $( ce ).css( "borderLeftWidth" ), 10 ) || 0 ) +
            ( parseInt( $( ce ).css( "paddingLeft" ), 10 ) || 0 ) - margins.left,

        co.top + ( parseInt( $( ce ).css( "borderTopWidth" ), 10 ) || 0 ) +
            ( parseInt( $( ce ).css( "paddingTop" ), 10 ) || 0 ) - margins.top,

        co.left + ( over ? Math.max( ce.scrollWidth, ce.offsetWidth ) : ce.offsetWidth ) -
            ( parseInt( $( ce ).css( "borderLeftWidth" ), 10 ) || 0 ) -
            ( parseInt( $( ce ).css( "paddingRight" ), 10 ) || 0 ) -
            helperProportions.width - margins.left,
            
        co.top + ( over ? Math.max( ce.scrollHeight, ce.offsetHeight ) : ce.offsetHeight ) -
            ( parseInt( $( ce ).css( "borderTopWidth" ), 10 ) || 0 ) -
            ( parseInt( $( ce ).css( "paddingBottom" ), 10 ) || 0 ) -
            helperProportions.height - margins.top
    ];

    return containment;
}

function getParentContainment2() {
    const ce = dragged.parentElement;
    
    const co = $( ce ).offset();
    const isUserScrollable = /(scroll|auto)/.test( $( ce ).css( "overflow" ) );

    containment = [
        ( parseInt( $( ce ).css( "borderLeftWidth" ), 10 ) || 0 ) +
            ( parseInt( $( ce ).css( "paddingLeft" ), 10 ) || 0 ),
        ( parseInt( $( ce ).css( "borderTopWidth" ), 10 ) || 0 ) +
            ( parseInt( $( ce ).css( "paddingTop" ), 10 ) || 0 ),
        ( isUserScrollable ? Math.max( ce.scrollWidth, ce.offsetWidth ) : ce.offsetWidth ) -
            ( parseInt( $( ce ).css( "borderRightWidth" ), 10 ) || 0 ) -
            ( parseInt( $( ce ).css( "paddingRight" ), 10 ) || 0 ) -
            helperProportions.width -
            margins.left -
            margins.right,
        ( isUserScrollable ? Math.max( ce.scrollHeight, ce.offsetHeight ) : ce.offsetHeight ) -
            ( parseInt( $( ce ).css( "borderBottomWidth" ), 10 ) || 0 ) -
            ( parseInt( $( ce ).css( "paddingBottom" ), 10 ) || 0 ) -
            helperProportions.height -
            margins.top -
            margins.bottom
    ];

    containment = [
        containment[ 0 ] + co.left,
        containment[ 1 ] + co.top,
        containment[ 2 ] + co.left,
        containment[ 3 ] + co.top
    ];

    return containment;
}

var makePlaceholder = (function (sortableElement, placeholder, placeholderClass) {
    var _a;
    if (placeholderClass === void 0) { placeholderClass = 'sortable-placeholder'; }
    if (!(sortableElement instanceof HTMLElement)) {
        throw new Error('You must provide a valid element as a sortable.');
    }
    // if placeholder is not an element
    if (!(placeholder instanceof HTMLElement) && placeholder !== undefined) {
        throw new Error('You must provide a valid element as a placeholder or set ot to undefined.');
    }
    // if no placeholder element is given
    if (placeholder === undefined) {
        if (['UL', 'OL'].includes(sortableElement.tagName)) {
            placeholder = document.createElement('li');
        }
        else if (['TABLE', 'TBODY'].includes(sortableElement.tagName)) {
            placeholder = document.createElement('tr');
            // set colspan to always all rows, otherwise the item can only be dropped in first column
            placeholder.innerHTML = '<td colspan="100"></td>';
        }
        else {
            placeholder = document.createElement('div');
        }
    }
    // add classes to placeholder
    if (typeof placeholderClass === 'string') {
        (_a = placeholder.classList).add.apply(_a, placeholderClass.split(' '));
    }
    return placeholder;
});

document.addEventListener("mouseup", e => {
    if (placeholder) {
        placeholder.remove();
    }
    placeholder = null;
    dragged = null;
});

document.addEventListener("mousedown", e => {
  if (e.target.classList.contains("draggable")) {
    dragged = e.target;

    if (dragged.classList.contains("draggable-child")) {
        _cache();
        c = getParentContainment(dragged);
        console.log(`c  ${c[0]}, ${c[1]}, ${c[2]}, ${c[3]}`);
        c = getParentContainment2(dragged);
        console.log(`c2 ${c[0]}, ${c[1]}, ${c[2]}, ${c[3]}`);
    }

    const x = +(dragged.style.left.match(/-?\d+/g) || 0);
    const y = +(dragged.style.top.match(/-?\d+/g) || 0);
    const w = dragged.getBoundingClientRect().width;
    const h = dragged.getBoundingClientRect().height;
    var p;
    p = makePlaceholder(dragged, p, 'draggable ghost');
    // Set dimension
    p.style.height = `${h}px`;
    p.style.width = `${w}px`;
    // Position
    p.style.top = `${y}px`;
    p.style.left = `${x}px`;

    dragged.parentElement.appendChild(p);
    placeholder = p;
  }
});

document.addEventListener("mousemove", e => {    
  if (dragged) {
    e.preventDefault();
    const x = +(dragged.style.left.match(/-?\d+/g) || 0) + e.movementX;
    const y = +(dragged.style.top.match(/-?\d+/g) || 0) + e.movementY;
    const rect = dragged.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    console.log(`x: ${x}px, y: ${y}px, w: ${w}px, h: ${h}px`);
    console.log(`rect x: ${rect.left}px, y: ${rect.top}px, w: ${w}px, h: ${h}px`);

    if (dragged.classList.contains("draggable-child")) {
      const r = dragged.parentElement.getBoundingClientRect();
      const pw = r.width;
      const ph = r.height;

      if (x < 0 || y < 0 || x + w >= pw || y + h >= ph) {
        return;
      }
    }

    if (!axis || axis !== 'x') {
        dragged.style.top = `${y}px`;
    }
    if (!axis || axis !== 'y') {
        dragged.style.left = `${x}px`;
    }
  }
});