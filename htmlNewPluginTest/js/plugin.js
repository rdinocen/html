(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], () => factory(root));
    } else if (typeof exports === 'object') {
        module.exports = factory(root);
    } else {
        root.ResizableTableColumns = factory(root);
    }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, (window) => {
    'use strict';

    const defaults = {
        // Attributes
        resizeMode: 'fit',
        gripInnerHtml: '',
        store: null,
        liveDrag: true,
        minWidth: 40,
        maxWidth: null,
        resizeFromBody: true,
        doubleClickDelay: 500,
        disabledColumns: [],

        // Custom Events
        emitEvents: true
    };

    const constants = {
        dataPropertyName: 'validide_rtc_data_object',
        classes: {
            table: 'rtc-table',
            wrapper: 'rtc-wrapper',
            handleContainer: 'rtc-handle-container',
            handle: 'rtc-handle',
            tableResizing: 'rtc-table-resizing',
            columnResizing: 'rtc-column-resizing',
        },
        attributes: {
            dataResizable: 'data-rtc-resizable',
            dataResizableTable: 'data-rtc-resizable-table'
        },
        data: {
            resizable: 'rtcResizable',
            resizableTable: 'rtcResizableTable'
        },
        events: {
            pointerDown: ['mousedown', 'touchstart'],
            pointerMove: ['mousemove', 'touchmove'],
            pointerUp: ['mouseup', 'touchend'],
            windowResize: ['resize'],
            eventResizeStart: 'eventResizeStart.rtc',
            eventResize: 'eventResize.rtc',
            eventResizeStop: 'eventResizeStop.rtc'
        }
    };

    function PointerData () {
        this.x = null;
        this.isDoubleClick = null;
    }

    /**
     * Merge defaults with user options
     * @param {Object} defaults Default settings
     * @param {Object} options User options
     */
    var extend = function (options) {
        var prop, extended = {};
        for (prop in defaults) {
            if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
                extended[prop] = defaults[prop];
            }
        }
        for (prop in options) {
            if (Object.prototype.hasOwnProperty.call(options, prop)) {
                extended[prop] = options[prop];
            }
        }
        return extended;
    };

    /**
	 * Emit a custom event
	 * @param  {String} type    The event type
	 * @param  {Object} options The settings object
	 * @param  {Node}   anchor  The anchor element
	 * @param  {Node}   toggle  The toggle element
	 */
	var emitEvent = function (elem, type, details) {
		if (typeof window.CustomEvent !== 'function') return;
		var event = new CustomEvent(type, {
			bubbles: true,
			detail: details || {}
		});
		elem.dispatchEvent(event);
	};


    /**
     * Helper Functions
     @private
     */
    var privateFunction = function (prefix) {
        // Helper function, not directly acessible by instance object
        console.log(prefix);
        console.log(this.options);
    };

    ResizableTableColumns.prototype = {
        init: function () {
            // find all matching DOM elements.
            // makes `.selectors` object available to instance.
            this.selectors = document.querySelectorAll(this.options.selector);
            for (var i = 0; i < this.selectors.length; i++) {
                var selector = this.selectors[i];
                // Do something w/ each matched selector node.
                selector.classList.add(this.options.classToAdd);
                // do something
            }
        },
    
        destroy: function () {
            // Remove any event listeners and undo any "init" actions here...
        },
    
        doSomething: function (someData) {
            console.log(this.table)
            console.log(someData);
        },
    
        doSomething2: function () {
            privateFunction.call(this, ">>");
        }
    }

    function ResizableTableColumns (table, options) {
        this.table = table;
        this.options = extend(defaults, options);
        
        this.options.fixed = true;
        this.options.overflow = false;
        switch(options.resizeMode) {
            case 'flex': options.fixed = false; break;
            case 'overflow': options.overflow = true; break;
        }

        this.init();
    }

    return ResizableTableColumns;
});